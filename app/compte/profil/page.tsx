import { auth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Link } from "next-view-transitions";

export const dynamic = "force-dynamic";

export default async function ProfilPage() {
  const session = await auth();
  const email = (session?.user?.email ?? "").toLowerCase();
  const db = getDb()!;
  const expert = await db.query.experts.findFirst({ where: eq(schema.experts.email, email) });

  return (
    <>
      <PageHeading eyebrow="Espace expert" title="Mon profil" />
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32 space-y-8">
        <Reveal>
          <dl className="space-y-4 text-[0.95rem] text-[var(--encre-soft)]">
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--or)]">Nom</dt>
              <dd className="mt-1">{expert?.nom ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--or)]">Email</dt>
              <dd className="mt-1">{expert?.email ?? email}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--or)]">Univers</dt>
              <dd className="mt-1">{expert?.univers ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--or)]">Statut</dt>
              <dd className="mt-1">{expert?.status ?? "—"}</dd>
            </div>
            {expert?.slug && (
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--or)]">Page publique</dt>
                <dd className="mt-1">
                  <Link href={`/pro/${expert.slug}`} className="link-underline text-[var(--ink)]">
                    /pro/{expert.slug}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[0.85rem] text-[var(--encre-soft)] italic">
            L&apos;édition complète du profil arrive bientôt. Écrivez à AMĀNA pour toute modification.
          </p>
        </Reveal>
      </section>
    </>
  );
}
