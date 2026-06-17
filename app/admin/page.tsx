import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Link } from "next-view-transitions";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const db = getDb()!;
  const pending = await db.query.experts.findMany({ where: eq(schema.experts.status, "pending") });
  const active = await db.query.experts.findMany({ where: eq(schema.experts.status, "active") });
  return (
    <>
      <PageHeading
        eyebrow="Administration"
        title="Tableau de bord AMĀNA"
        intro={`${pending.length} candidature${pending.length > 1 ? "s" : ""} en attente · ${active.length} expert${active.length > 1 ? "s" : ""} actif${active.length > 1 ? "s" : ""}`}
      />
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32 space-y-6">
        <Reveal>
          <ul className="space-y-4">
            <li>
              <Link href="/admin/experts" className="link-underline text-[var(--ink)]">Tous les experts</Link>
            </li>
            <li>
              <Link href="/admin/bookings" className="link-underline text-[var(--ink)]">Toutes les réservations</Link>
            </li>
            <li>
              <Link href="/admin/audit" className="link-underline text-[var(--ink)]">Journal d&apos;audit</Link>
            </li>
          </ul>
        </Reveal>
      </section>
    </>
  );
}
