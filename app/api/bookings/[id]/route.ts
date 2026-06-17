import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema, hasDatabase } from "@/lib/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { deleteCalendarEvent } from "@/lib/google";
import { logAudit } from "@/lib/audit";
import { safeEqual } from "@/lib/crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PatchBody = z.object({
  action: z.literal("cancel"),
  token: z.string().optional(),
  reason: z.string().max(500).optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!hasDatabase()) return NextResponse.json({ error: "no_db" }, { status: 503 });
  const { id } = await params;
  const db = getDb()!;
  const b = await db.query.bookings.findFirst({ where: eq(schema.bookings.id, id) });
  if (!b) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({
    id: b.id,
    status: b.status,
    slotStart: b.slotStart,
    slotEnd: b.slotEnd,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!hasDatabase()) return NextResponse.json({ error: "no_db" }, { status: 503 });
  const { id } = await params;
  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = PatchBody.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "invalid_input" }, { status: 400 });

  const db = getDb()!;
  const b = await db.query.bookings.findFirst({ where: eq(schema.bookings.id, id) });
  if (!b) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (b.status === "cancelled") return NextResponse.json({ ok: true, status: "cancelled" });

  // Authorization : owner expert (auth) OR matching cancel_token
  const session = await auth().catch(() => null);
  let allowed = false;
  if (session?.user?.email) {
    const expert = await db.query.experts.findFirst({
      where: eq(schema.experts.id, b.expertId),
    });
    if (expert && expert.email.toLowerCase() === session.user.email.toLowerCase()) {
      allowed = true;
    }
  }
  if (!allowed && parsed.data.token && b.cancelToken && safeEqual(parsed.data.token, b.cancelToken)) {
    allowed = true;
  }
  if (!allowed) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const expert = await db.query.experts.findFirst({ where: eq(schema.experts.id, b.expertId) });
  if (expert && b.googleEventId) {
    try {
      await deleteCalendarEvent(expert, b.googleEventId);
    } catch (e) {
      console.error("[bookings.cancel] google delete failed", e);
    }
  }

  await db
    .update(schema.bookings)
    .set({
      status: "cancelled",
      cancelledAt: new Date(),
      cancellationReason: parsed.data.reason ?? null,
      updatedAt: new Date(),
    })
    .where(eq(schema.bookings.id, b.id));

  await logAudit({
    expertId: b.expertId,
    action: "booking.cancel",
    payload: { bookingId: b.id, reason: parsed.data.reason ?? null },
  });

  return NextResponse.json({ ok: true, status: "cancelled" });
}
