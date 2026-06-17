import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb, schema, hasDatabase } from "@/lib/db";
import { eq } from "drizzle-orm";
import { decryptToken } from "@/lib/crypto";
import { revokeRefreshToken } from "@/lib/google";
import { logAudit } from "@/lib/audit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!hasDatabase()) return NextResponse.redirect(new URL("/", req.url));
  const session = await auth();
  if (!session?.user?.email) return NextResponse.redirect(new URL("/", req.url));
  const email = session.user.email.toLowerCase();
  const db = getDb()!;
  const exp = await db.query.experts.findFirst({ where: eq(schema.experts.email, email) });
  if (exp?.googleRefreshTokenEnc) {
    try {
      const refresh = decryptToken(exp.googleRefreshTokenEnc);
      await revokeRefreshToken(refresh);
    } catch {}
  }
  if (exp) {
    await db
      .update(schema.experts)
      .set({
        googleRefreshTokenEnc: null,
        googleAccessTokenEnc: null,
        googleTokenExpiresAt: null,
        status: "paused",
        updatedAt: new Date(),
      })
      .where(eq(schema.experts.id, exp.id));
    await logAudit({ expertId: exp.id, action: "oauth.revoke", payload: { email } });
  }
  return NextResponse.redirect(new URL("/compte/donnees", req.url));
}
