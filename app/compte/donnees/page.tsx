import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { auth } from "@/lib/auth";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function DonneesPage() {
  const session = await auth();
  const email = (session?.user?.email ?? "").toLowerCase();
  const db = getDb()!;
  const expert = await db.query.experts.findFirst({ where: eq(schema.experts.email, email) });

  return (
    <>
      <PageHeading
        eyebrow="Mes données"
        title="Vos données vous appartiennent."
        intro="Vous pouvez à tout moment révoquer l'accès à votre agenda et demander la suppression de vos données."
      />
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32 space-y-10">
        <Reveal>
          <p className="font-display text-2xl text-[var(--ink)]">Révoquer l&apos;accès Google</p>
          <p className="mt-3 text-[0.95rem] text-[var(--encre-soft)] max-w-[60ch] leading-[1.8]">
            La révocation déconnecte AMĀNA de votre calendrier. Vos créneaux ne seront plus visibles sur votre fiche.
          </p>
          <form action="/api/account/revoke" method="post" className="mt-6">
            <button
              type="submit"
              className="text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors"
            >
              Révoquer l&apos;accès
            </button>
          </form>
        </Reveal>
        <Reveal delay={120}>
          <p className="font-display text-2xl text-[var(--ink)]">Exporter mes données</p>
          <a
            href={expert ? `/api/account/export` : "#"}
            className="mt-4 inline-flex text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors"
          >
            Télécharger mes données (JSON)
          </a>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-display text-2xl text-[var(--ink)]">Supprimer mon compte</p>
          <p className="mt-3 text-[0.95rem] text-[var(--encre-soft)] max-w-[60ch] leading-[1.8]">
            Cette action est définitive. Pour la déclencher, écrivez à communauteamana@hotmail.com avec votre demande.
          </p>
        </Reveal>
      </section>
    </>
  );
}
