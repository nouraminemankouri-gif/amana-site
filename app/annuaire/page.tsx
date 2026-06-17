import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { listActiveExperts } from "@/lib/experts";

export const metadata: Metadata = {
  title: "Sélection d'experts",
  description: "Une sélection d'experts au service de votre cheminement, dans les univers KHAYR, 'ILM et 'AFIYAH.",
};

export default async function AnnuairePage() {
  const experts = await listActiveExperts();

  const byUnivers = {
    afiyah: experts.filter((e) => e.univers === "afiyah"),
    khayr: experts.filter((e) => e.univers === "khayr"),
    ilm: experts.filter((e) => e.univers === "ilm"),
  };

  const showAfiyah = byUnivers.afiyah.length > 0;
  const showKhayr = byUnivers.khayr.length > 0;
  const showIlm = byUnivers.ilm.length > 0;

  return (
    <>
      <PageHeading
        eyebrow="Sélection d'experts"
        title="Des experts au service de votre cheminement"
        intro="Où la qualité prime sur la quantité, où la confiance se construit."
      />

      {showAfiyah && (
        <section className="mx-auto max-w-[1280px] px-6 md:px-10 pb-12">
          <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--sauge)]">
            <>&apos;AFIYAH · les jardins d&apos;Afiyah</>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {byUnivers.afiyah.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link
                  href={`/pro/${p.slug}`}
                  className="amana-card group block p-8 md:p-10 border border-[rgba(31,42,42,0.12)] bg-[var(--bg)]"
                >
                  <span className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
                    {p.universLabel}
                  </span>
                  <p className="mt-12 font-display text-3xl md:text-4xl text-[var(--ink)]">{p.nom}</p>
                  {p.intent && (
                    <p className="mt-4 font-display italic text-xl text-[var(--encre-soft)]">
                      « {p.intent} »
                    </p>
                  )}
                  {p.role && (
                    <p className="mt-6 text-[0.95rem] text-[var(--encre-soft)] leading-[1.7]">{p.role}</p>
                  )}
                  <span className="mt-12 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--ink)] group-hover:text-[var(--sauge)] transition-colors duration-500">
                    retrouver l&apos;équilibre
                    <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {showKhayr && (
        <section className="mx-auto max-w-[1280px] px-6 md:px-10 pb-12">
          <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--sauge)]">
            <>KHAYR · la maison Khayr</>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {byUnivers.khayr.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link
                  href={`/pro/${p.slug}`}
                  className="amana-card group block p-8 md:p-10 border border-[rgba(31,42,42,0.12)] bg-[var(--bg)]"
                >
                  <span className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
                    {p.universLabel}
                  </span>
                  <p className="mt-12 font-display text-3xl md:text-4xl text-[var(--ink)]">{p.nom}</p>
                  {p.intent && (
                    <p className="mt-4 font-display italic text-xl text-[var(--encre-soft)]">« {p.intent} »</p>
                  )}
                  {p.role && (
                    <p className="mt-6 text-[0.95rem] text-[var(--encre-soft)] leading-[1.7]">{p.role}</p>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {showIlm && (
        <section className="mx-auto max-w-[1280px] px-6 md:px-10 pb-12">
          <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--sauge)]">
            <>&apos;ILM · la lumière du &apos;Ilm</>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {byUnivers.ilm.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link
                  href={`/pro/${p.slug}`}
                  className="amana-card group block p-8 md:p-10 border border-[rgba(31,42,42,0.12)] bg-[var(--bg)]"
                >
                  <span className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
                    {p.universLabel}
                  </span>
                  <p className="mt-12 font-display text-3xl md:text-4xl text-[var(--ink)]">{p.nom}</p>
                  {p.intent && (
                    <p className="mt-4 font-display italic text-xl text-[var(--encre-soft)]">« {p.intent} »</p>
                  )}
                  {p.role && (
                    <p className="mt-6 text-[0.95rem] text-[var(--encre-soft)] leading-[1.7]">{p.role}</p>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-20 md:py-28 grid gap-10 md:grid-cols-2">
        {!showKhayr && (
          <EmptyUniverse
            eyebrow="KHAYR · la maison Khayr"
            quote="Vous n'avez pas à vivre cela seul."
          />
        )}
        {!showIlm && (
          <EmptyUniverse
            eyebrow="'ILM · la lumière du 'Ilm"
            quote="La recherche de la science éclaire le cœur."
          />
        )}
      </section>

      <section className="mx-auto max-w-[1280px] px-6 md:px-10 pb-32 text-center">
        <Reveal>
          <p className="font-display italic text-2xl md:text-3xl text-[var(--ink)] max-w-[34ch] mx-auto">
            D&apos;autres experts nous rejoignent bientôt, bi idhniLlah.
          </p>
        </Reveal>
      </section>
    </>
  );
}

function EmptyUniverse({ eyebrow, quote }: { eyebrow: string; quote: string }) {
  return (
    <Reveal>
      <div className="border border-dashed border-[rgba(31,42,42,0.18)] p-10 md:p-12 min-h-[280px] flex flex-col">
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">{eyebrow}</p>
        <p className="mt-10 font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.3] max-w-[26ch]">
          {quote}
        </p>
        <p className="mt-auto pt-12 text-[0.78rem] tracking-[0.18em] text-[var(--encre-soft)]">
          D&apos;autres experts nous rejoignent bientôt, bi idhniLlah.
        </p>
      </div>
    </Reveal>
  );
}
