import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb, schema, hasDatabase } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  if (!hasDatabase()) return NextResponse.json({ error: "no_db" }, { status: 503 });
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const email = session.user.email.toLowerCase();
  const db = getDb()!;
  const expert = await db.query.experts.findFirst({ where: eq(schema.experts.email, email) });
  if (!expert) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const bookings = await db.select().from(schema.bookings).where(eq(schema.bookings.expertId, expert.id));
  const safeExpert = {
    ...expert,
    googleAccessTokenEnc: undefined,
    googleRefreshTokenEnc: undefined,
  };
  return new NextResponse(JSON.stringify({ expert: safeExpert, bookings }, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="amana-export-${expert.slug}.json"`,
    },
  });
}
