import { NextResponse } from "next/server";
import { getExpertBySlug } from "@/lib/experts";
import { computeAvailableSlots, generateDemoSlots } from "@/lib/availability";
import { availabilityLimiter, ipFromHeaders } from "@/lib/ratelimit";
import { getDb, schema } from "@/lib/db";
import { getFreeBusy } from "@/lib/google";
import { eq } from "drizzle-orm";
import { addDays } from "date-fns";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const ip = ipFromHeaders(req.headers);
  const rl = await availabilityLimiter.limit(`${ip}:${slug}`);
  if (!rl.success) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const expert = await getExpertBySlug(slug);
  if (!expert) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const url = new URL(req.url);
  const fromParam = url.searchParams.get("from");
  const toParam = url.searchParams.get("to");
  const now = new Date();
  const from = fromParam ? new Date(fromParam) : now;
  const to = toParam ? new Date(toParam) : addDays(now, 30);
  if (isNaN(from.getTime()) || isNaN(to.getTime()) || to <= from) {
    return NextResponse.json({ error: "invalid_range" }, { status: 400 });
  }
  // cap range
  const maxTo = addDays(from, 60);
  const safeTo = to > maxTo ? maxTo : to;

  // Real path: DB + Google
  if (!expert.isSeed && expert.bookingEnabled) {
    const db = getDb();
    if (db) {
      try {
        const expertRow = await db.query.experts.findFirst({
          where: eq(schema.experts.slug, slug),
        });
        if (!expertRow || expertRow.status !== "active" || !expertRow.googleRefreshTokenEnc) {
          // not bookable yet
          return NextResponse.json({
            slots: [],
            timezone: expert.timezone,
            slot_duration_minutes: expert.availabilityRules.slot_duration_minutes,
            mode: "inactive",
          });
        }
        const busy = await getFreeBusy(expertRow, from.toISOString(), safeTo.toISOString());
        const slots = computeAvailableSlots({
          rules: expertRow.availabilityRules,
          busy,
          from,
          to: safeTo,
          timezone: expertRow.timezone,
        });
        const res = NextResponse.json({
          slots,
          timezone: expertRow.timezone,
          slot_duration_minutes: expertRow.availabilityRules.slot_duration_minutes,
          mode: "live",
        });
        res.headers.set("Cache-Control", "private, max-age=30");
        return res;
      } catch (e) {
        console.error("[availability] live failed, falling back to demo", e);
      }
    }
  }

  // Fallback / demo
  const slots = generateDemoSlots({
    rules: expert.availabilityRules,
    from,
    to: safeTo,
    timezone: expert.timezone,
  });
  return NextResponse.json({
    slots,
    timezone: expert.timezone,
    slot_duration_minutes: expert.availabilityRules.slot_duration_minutes,
    mode: "demo",
  });
}
