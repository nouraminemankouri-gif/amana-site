import { PageHeading } from "@/components/PageHeading";
import { getDb, schema } from "@/lib/db";
import { desc } from "drizzle-orm";
import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function AdminBookings() {
  const db = getDb()!;
  const list = await db.select().from(schema.bookings).orderBy(desc(schema.bookings.slotStart)).limit(200);
  return (
    <>
      <PageHeading eyebrow="Administration" title="Réservations" />
      <section className="mx-auto max-w-[1280px] px-6 md:px-10 pb-32">
        <ul className="space-y-6">
          {list.map((b) => (
            <li key={b.id} className="border border-[rgba(31,42,42,0.12)] p-6">
              <p className="font-display text-xl text-[var(--ink)]">
                {formatInTimeZone(new Date(b.slotStart), "Europe/Paris", "EEEE d MMMM, HH:mm", { locale: fr })}
              </p>
              <p className="mt-2 text-[0.85rem] text-[var(--encre-soft)]">
                {b.clientName} · {b.clientEmail} · statut : {b.status}
                {b.googleEventId ? " · synchronisé Google" : ""}
              </p>
            </li>
          ))}
          {list.length === 0 && (
            <li className="text-[0.95rem] text-[var(--encre-soft)]">Aucune réservation pour l&apos;instant.</li>
          )}
        </ul>
      </section>
    </>
  );
}
