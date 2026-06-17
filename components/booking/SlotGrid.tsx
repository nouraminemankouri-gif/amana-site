"use client";
import { motion } from "motion/react";
import { formatInTimeZone } from "date-fns-tz";

type Slot = { start: string; end: string };

export function SlotGrid({
  slots,
  timezone,
  selected,
  onSelect,
}: {
  slots: Slot[];
  timezone: string;
  selected: string | null;
  onSelect: (iso: string) => void;
}) {
  if (!slots.length) {
    return (
      <p className="text-[0.85rem] text-[var(--encre-soft)] italic">
        Aucun créneau disponible ce jour. Choisissez une autre date.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {slots.map((s, i) => {
        const isSel = selected === s.start;
        const label = formatInTimeZone(new Date(s.start), timezone, "HH:mm");
        return (
          <motion.button
            key={s.start}
            type="button"
            onClick={() => onSelect(s.start)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-pressed={isSel}
            className={`px-3 py-3 text-[0.85rem] tracking-[0.06em] border transition-colors duration-300 ${
              isSel
                ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                : "bg-transparent text-[var(--ink)] border-[rgba(31,42,42,0.16)] hover:border-[var(--sauge)] hover:text-[var(--sauge)]"
            }`}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
