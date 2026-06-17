import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Un frère. Une sœur.",
  description:
    "Personne n'est fait pour avancer seul. AMĀNA propose Un frère. Une sœur., un lien discret et présent pour soutenir, encourager dans le bien et se rappeler الله avec douceur.",
  alternates: { canonical: "/un-frere-une-soeur" },
};

export default function UnFrereUneSoeurPage() {
  return (
    <>
      <PageHeading
        eyebrow="Un frère. Une sœur."
        title="Avec qui avancer maintenant ?"
      />

      <section className="mx-auto max-w-[800px] px-6 md:px-10 pb-24 prose-amana">
        <Reveal as="p" className="font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.4]">
          <>Se convertir, c&apos;est parfois être entouré… puis se retrouver seul.</>
        </Reveal>

        <Reveal delay={120} as="p" className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
          <>
            C&apos;est trouver <span className="ar">الله</span>, mais perdre certains repères, certaines présences.
          </>
        </Reveal>

        <Reveal delay={180} as="p" className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
          <>C&apos;est un chemin sincère, profond… mais qui peut laisser un vide humain.</>
        </Reveal>

        <Reveal delay={240} as="p" className="mt-12 font-display italic text-xl md:text-2xl text-[var(--sauge)] leading-[1.4]">
          <>Et dans ce vide, une question demeure : avec qui avancer maintenant ?</>
        </Reveal>

        <Reveal delay={320} as="p" className="mt-12 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
          <>
            Parce que personne n&apos;est fait pour avancer seul, AMĀNA propose : Un frère. Une sœur.
          </>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">L&apos;intention</p>
          </Reveal>
          <Reveal delay={120} as="div" className="md:col-span-8 prose-amana">
            <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              Revenir à <span className="ar">الله</span>, apprendre, tenir dans le temps peut être difficile sans présence autour de soi.
            </p>
            <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">Alors nous proposons simplement cela :</p>
            <ul className="mt-6 space-y-3 text-lg text-[var(--ink)]">
              <li>ne pas rester seul</li>
              <li>avancer accompagné</li>
              <li>s&apos;encourager dans le bien, avec pudeur</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Une inspiration</p>
          </Reveal>
          <Reveal delay={120} as="div" className="md:col-span-8 prose-amana">
            <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              Lorsque les Muhajirun sont arrivés à Médine, les Ansars les ont accueillis, soutenus, accompagnés. Ils ont partagé, donné, entouré. Ils ont été présents.
            </p>
            <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              C&apos;est cet esprit que l&apos;on souhaite retrouver ici, à notre échelle, aujourd&apos;hui.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Le principe</p>
          </Reveal>
          <Reveal delay={120} as="div" className="md:col-span-8 prose-amana">
            <p className="font-display italic text-xl md:text-2xl text-[var(--ink)] leading-[1.4]">
              Un frère avec un frère. Une sœur avec une sœur.
            </p>
            <p className="mt-4 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">Deux personnes. Pour un temps donné.</p>
            <p className="mt-4 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">Pas pour se juger. Pas pour se corriger.</p>
            <p className="mt-4 font-display italic text-xl md:text-2xl text-[var(--sauge)]">
              Mais pour être là.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Ce que ce lien permet</p>
          </Reveal>
          <Reveal delay={120} as="div" className="md:col-span-8 prose-amana">
            <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              Tisser une relation sincère &ndash; Se soutenir dans les moments difficiles &ndash; Se rappeler <span className="ar">الله</span> avec douceur
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Le cadre</p>
          </Reveal>
          <Reveal delay={120} as="div" className="md:col-span-8 prose-amana">
            <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              Respect de la non- mixité et des limites de chacun &ndash; Liberté de s&apos;arrêter à tout moment
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal as="div" className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Pour qui ?</p>
          </Reveal>
          <Reveal delay={120} as="div" className="md:col-span-8 prose-amana">
            <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              Pour celui ou celle qui se sent seul, a besoin d&apos;un soutien, souhaite avancer accompagné.
            </p>
            <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              Et pour celui ou celle qui veut être une présence pour quelqu&apos;un, avec sincérité et sans prétention.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-6 md:px-10 py-24 md:py-32 text-center">
        <Reveal>
          <p className="font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.4]">
            On est là pour accompagner.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            Pour créer un lien discret, mais présent, dans les moments visibles comme invisibles, tout au long de l&apos;année.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-12 font-display italic text-xl md:text-2xl text-[var(--sauge)]">
            Si tu en ressens le besoin, nous sommes tout proches.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p className="mt-6 font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.4]">
            Trouve ton frère, trouve ta sœur.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <Link
            href="/contact"
            className="mt-12 inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
          >
            Tu peux nous écrire via la rubrique contact
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
