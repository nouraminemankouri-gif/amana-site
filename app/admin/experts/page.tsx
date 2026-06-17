import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { getDb, schema } from "@/lib/db";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminExperts() {
  const db = getDb()!;
  const all = await db.select().from(schema.experts).orderBy(asc(schema.experts.nom));
  return (
    <>
      <PageHeading eyebrow="Administration" title="Experts" />
      <section className="mx-auto max-w-[1280px] px-6 md:px-10 pb-32">
        <table className="w-full text-[0.9rem]">
          <thead className="text-[var(--or)] text-[0.7rem] uppercase tracking-[0.28em]">
            <tr>
              <th className="text-left py-3">Nom</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Slug</th>
              <th className="text-left py-3">Univers</th>
              <th className="text-left py-3">Statut</th>
              <th className="text-left py-3">Google</th>
            </tr>
          </thead>
          <tbody>
            {all.map((e) => (
              <Reveal key={e.id} as="div" className="contents">
                <tr className="border-t border-[rgba(31,42,42,0.08)]">
                  <td className="py-3 text-[var(--ink)]">{e.nom}</td>
                  <td className="py-3 text-[var(--encre-soft)]">{e.email}</td>
                  <td className="py-3 text-[var(--encre-soft)]">{e.slug}</td>
                  <td className="py-3 text-[var(--encre-soft)]">{e.univers}</td>
                  <td className="py-3 text-[var(--encre-soft)]">{e.status}</td>
                  <td className="py-3 text-[var(--encre-soft)]">
                    {e.googleRefreshTokenEnc ? "connecté" : "—"}
                  </td>
                </tr>
              </Reveal>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
