import { auth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Link } from "next-view-transitions";

export default async function ComptePage() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const db = getDb();
  const expert = db
    ? await db.query.experts.findFirst({ where: eq(schema.experts.email, email.toLowerCase()) })
    : null;

  return (
    <>
      <PageHeading
        eyebrow={`Bienvenue ${session?.user?.name ?? ""}`}
        title="Votre espace AMĀNA"
        intro={
          expert
            ? `Statut : ${expert.status}. Slug public : /pro/${expert.slug}`
            : "Votre profil sera créé après la première connexion à votre agenda Google."
        }
      />
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32 space-y-12">
        <Reveal>
          <ul className="space-y-6">
            <li>
              <Link href="/compte/bookings" className="link-underline text-[var(--ink)]">
                Mes réservations
              </Link>
            </li>
            <li>
              <Link href="/compte/disponibilites" className="link-underline text-[var(--ink)]">
                Mes disponibilités
              </Link>
            </li>
            <li>
              <Link href="/compte/profil" className="link-underline text-[var(--ink)]">
                Mon profil public
              </Link>
            </li>
            <li>
              <Link href="/compte/donnees" className="link-underline text-[var(--ink)]">
                Mes données et la révocation
              </Link>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <form action="/compte/deconnexion" method="post">
            <button
              type="submit"
              className="text-[0.78rem] uppercase tracking-[0.32em] text-[var(--encre-soft)] hover:text-[var(--sauge)] transition-colors"
            >
              Se déconnecter
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
