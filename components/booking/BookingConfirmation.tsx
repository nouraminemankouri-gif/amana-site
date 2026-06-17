"use client";
import { motion } from "motion/react";
import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";

export function BookingConfirmation({
  expertName,
  serviceTitle,
  slotStart,
  timezone,
  googleSynced,
  clientEmail,
}: {
  expertName: string;
  serviceTitle: string | null;
  slotStart: string;
  timezone: string;
  googleSynced: boolean;
  clientEmail: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-8"
    >
      <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
        Réservation confirmée
      </p>
      <p className="mt-8 font-display italic text-2xl md:text-3xl text-[var(--ink)] max-w-[34ch] mx-auto leading-[1.3]">
        {formatInTimeZone(new Date(slotStart), timezone, "EEEE d MMMM, HH:mm", { locale: fr })}
      </p>
      <p className="mt-4 text-[0.95rem] text-[var(--encre-soft)]">
        avec {expertName}
        {serviceTitle ? ` · ${serviceTitle}` : ""}
      </p>
      <p className="mt-10 text-[0.85rem] text-[var(--encre-soft)] max-w-[44ch] mx-auto leading-[1.7]">
        {googleSynced
          ? `Une invitation a été envoyée à ${clientEmail}. Vous la retrouverez dans votre boîte mail et votre agenda.`
          : `Votre réservation est notée. ${expertName} reviendra vers vous au plus vite, bi idhniLlah.`}
      </p>
    </motion.div>
  );
}
