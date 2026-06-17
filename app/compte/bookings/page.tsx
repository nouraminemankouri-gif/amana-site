import { auth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function CompteBookings() {
  const session = await auth();
  const email = (session?.user?.email ?? "").toLowerCase();
  const db = getDb()!;
  const expert = await db.query.experts.findFirst({ where: eq(schema.experts.email, email) });
  const list = expert
    ? await db
        .select()
        .from(schema.bookings)
        .where(eq(schema.bookings.expertId, expert.id))
        .orderBy(desc(schema.bookings.slotStart))
    : [];

  return (
    <>
      <PageHeading eyebrow="Espace expert" title="Mes réservations" />
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32">
        {list.length === 0 ? (
          <Reveal>
            <p className="text-[0.95rem] text-[var(--encre-soft)]">
              Aucune réservation pour l&apos;instant.
            </p>
          </Reveal>
        ) : (
          <ul className="space-y-8">
            {list.map((b) => (
              <Reveal key={b.id} as="li">
                <div className="border border-[rgba(31,42,42,0.12)] p-6 md:p-8">
                  <p className="font-display text-xl text-[var(--ink)]">
                    {formatInTimeZone(new Date(b.slotStart), expert?.timezone ?? "Europe/Paris", "EEEE d MMMM, HH:mm", { locale: fr })}
                  </p>
                  <p className="mt-2 text-[0.85rem] text-[var(--encre-soft)]">
                    {b.clientName} · {b.clientEmail} {b.clientPhone ? `· ${b.clientPhone}` : ""}
                  </p>
                  {b.clientMessage && (
                    <p className="mt-4 text-[0.95rem] text-[var(--encre-soft)] leading-[1.7] max-w-[60ch]">
                      {b.clientMessage}
                    </p>
                  )}
                  <p className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-[var(--or)]">
                    Statut : {b.status}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
