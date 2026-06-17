import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema, hasDatabase } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { bookingsLimiter, ipFromHeaders } from "@/lib/ratelimit";
import { logAudit } from "@/lib/audit";
import { createCalendarEvent } from "@/lib/google";
import { addMinutes } from "date-fns";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  expertSlug: z.string().min(1).max(80),
  slotStart: z.string().datetime(),
  serviceId: z.string().min(1).max(80).optional(),
  clientName: z.string().min(2).max(120),
  clientEmail: z.string().email().max(180),
  clientPhone: z.string().min(0).max(40).optional().nullable(),
  clientMessage: z.string().max(4000).optional().nullable(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  const ip = ipFromHeaders(req.headers);
  const ua = req.headers.get("user-agent") ?? "";

  const rl = await bookingsLimiter.limit(ip);
  if (!rl.success) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  if (!hasDatabase()) {
    return NextResponse.json(
      {
        error: "service_unavailable",
        message:
          "Le système de réservation en ligne sera ouvert très bientôt. Vous pouvez écrire à communauteamana@hotmail.com pour entrer en relation.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ ok: true, bookingId: "noop" });
  }

  const db = getDb()!;
  const expert = await db.query.experts.findFirst({
    where: eq(schema.experts.slug, data.expertSlug),
  });
  if (!expert) return NextResponse.json({ error: "expert_not_found" }, { status: 404 });
  if (expert.status !== "active") {
    return NextResponse.json({ error: "expert_not_active" }, { status: 400 });
  }

  const start = new Date(data.slotStart);
  if (isNaN(start.getTime())) return NextResponse.json({ error: "invalid_slot" }, { status: 400 });

  const service = (expert.services ?? []).find((s) => s.id === data.serviceId) ?? expert.services?.[0] ?? null;
  const duration = service?.duration_minutes ?? expert.availabilityRules.slot_duration_minutes;
  const end = addMinutes(start, duration);

  // Re-check : pas déjà un booking confirmé sur ce slot
  const existing = await db
    .select()
    .from(schema.bookings)
    .where(
      and(
        eq(schema.bookings.expertId, expert.id),
        eq(schema.bookings.slotStart, start),
        eq(schema.bookings.status, "confirmed"),
      ),
    );
  if (existing.length) {
    return NextResponse.json({ error: "slot_taken" }, { status: 409 });
  }

  const cancelToken = randomBytes(24).toString("base64url");

  const inserted = await db
    .insert(schema.bookings)
    .values({
      expertId: expert.id,
      serviceId: data.serviceId ?? null,
      slotStart: start,
      slotEnd: end,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone ?? null,
      clientMessage: data.clientMessage ?? null,
      status: "confirmed",
      cancelToken,
    })
    .returning();
  const booking = inserted[0]!;

  // Crée l'event Google
  let googleEventId: string | null = null;
  try {
    googleEventId = await createCalendarEvent({
      expert,
      serviceTitle: service?.title ?? "Séance",
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      message: data.clientMessage,
    });
    if (googleEventId) {
      await db
        .update(schema.bookings)
        .set({ googleEventId, updatedAt: new Date() })
        .where(eq(schema.bookings.id, booking.id));
    }
  } catch (e) {
    console.error("[bookings] google event creation failed", e);
    // event ID nul, mais le booking reste en DB. On notifiera l'admin via audit.
  }

  await logAudit({
    expertId: expert.id,
    action: "booking.create",
    payload: {
      bookingId: booking.id,
      slotStart: start.toISOString(),
      googleEventId,
      hasGoogle: Boolean(googleEventId),
    },
    ip,
    ua,
  });

  return NextResponse.json({
    ok: true,
    bookingId: booking.id,
    slotStart: start.toISOString(),
    slotEnd: end.toISOString(),
    expertName: expert.nom,
    serviceTitle: service?.title ?? null,
    googleSynced: Boolean(googleEventId),
  });
}
