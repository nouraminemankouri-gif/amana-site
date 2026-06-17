import { addMinutes, isAfter, isBefore, startOfDay, addDays } from "date-fns";
import { fromZonedTime, toZonedTime, formatInTimeZone } from "date-fns-tz";
import type { AvailabilityRules } from "./schema";

export type Slot = { start: string; end: string };
export type BusyRange = { start: string; end: string };

const WEEKDAY_KEY: Array<keyof AvailabilityRules["weekdays"]> = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function parseHHMM(s: string): { h: number; m: number } | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s);
  if (!m) return null;
  const h = Number(m[1]);
  const mi = Number(m[2]);
  if (h < 0 || h > 23 || mi < 0 || mi > 59) return null;
  return { h, m: mi };
}

export function computeAvailableSlots(params: {
  rules: AvailabilityRules;
  busy: BusyRange[];
  from: Date;
  to: Date;
  timezone: string;
  now?: Date;
}): Slot[] {
  const { rules, busy, from, to, timezone } = params;
  const now = params.now ?? new Date();

  const minNoticeMs = (rules.min_notice_hours ?? 0) * 3_600_000;
  const earliest = new Date(now.getTime() + minNoticeMs);
  const maxAdvanceCutoff = addDays(now, rules.max_advance_days ?? 60);

  const slotMin = rules.slot_duration_minutes ?? 60;
  const buffer = rules.buffer_minutes ?? 0;

  const excluded = new Set(rules.excluded_dates ?? []);

  const busyParsed = busy
    .map((b) => ({ start: new Date(b.start), end: new Date(b.end) }))
    .filter((b) => !isNaN(b.start.getTime()) && !isNaN(b.end.getTime()));

  function overlapsBusy(start: Date, end: Date): boolean {
    for (const b of busyParsed) {
      if (start < b.end && end > b.start) return true;
    }
    return false;
  }

  const out: Slot[] = [];

  // iterate by zoned day
  let cursor = startOfDay(toZonedTime(from, timezone));
  const last = startOfDay(toZonedTime(to, timezone));

  while (!isAfter(cursor, last)) {
    const ymd = formatInTimeZone(fromZonedTime(cursor, timezone), timezone, "yyyy-MM-dd");
    if (excluded.has(ymd)) {
      cursor = addDays(cursor, 1);
      continue;
    }
    const dow = cursor.getDay();
    const key = WEEKDAY_KEY[dow]!;
    const ranges = rules.weekdays?.[key] ?? [];

    for (const r of ranges) {
      const startHM = parseHHMM(r.start);
      const endHM = parseHHMM(r.end);
      if (!startHM || !endHM) continue;
      const localDay = formatInTimeZone(fromZonedTime(cursor, timezone), timezone, "yyyy-MM-dd");
      const rangeStart = fromZonedTime(
        `${localDay}T${String(startHM.h).padStart(2, "0")}:${String(startHM.m).padStart(2, "0")}:00`,
        timezone,
      );
      const rangeEnd = fromZonedTime(
        `${localDay}T${String(endHM.h).padStart(2, "0")}:${String(endHM.m).padStart(2, "0")}:00`,
        timezone,
      );

      let slotStart = rangeStart;
      while (true) {
        const slotEnd = addMinutes(slotStart, slotMin);
        if (isAfter(slotEnd, rangeEnd)) break;
        if (isBefore(slotStart, earliest)) {
          slotStart = addMinutes(slotStart, slotMin + buffer);
          continue;
        }
        if (isAfter(slotStart, maxAdvanceCutoff)) break;
        if (isAfter(slotEnd, to) || isBefore(slotEnd, from)) {
          slotStart = addMinutes(slotStart, slotMin + buffer);
          continue;
        }
        if (!overlapsBusy(slotStart, slotEnd)) {
          out.push({ start: slotStart.toISOString(), end: slotEnd.toISOString() });
        }
        slotStart = addMinutes(slotStart, slotMin + buffer);
      }
    }

    cursor = addDays(cursor, 1);
  }

  return out;
}

// Demo slots used when no DB / not connected to Google
export function generateDemoSlots(params: {
  rules: AvailabilityRules;
  from: Date;
  to: Date;
  timezone: string;
}): Slot[] {
  return computeAvailableSlots({
    rules: params.rules,
    busy: [],
    from: params.from,
    to: params.to,
    timezone: params.timezone,
  });
}
