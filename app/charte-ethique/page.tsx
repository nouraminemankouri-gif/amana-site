import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Quote } from "@/components/Quote";

export const metadata: Metadata = {
  title: "Charte éthique",
  description: "AMĀNA repose sur trois fondements : Intention, Intégrité, Ihsan.",
};

const ENGAGEMENTS = [
  "Exercer une activité halal.",
  "Respecter les principes islamiques et s'éloigner des pratiques ambiguës (shubuhat) dans leur services.",
  "Faire preuve de transparence, d'honnêteté et de responsabilité.",
  "Rechercher l'ihsan dans leur travail.",
  "Contribuer à la construction d'un écosystème solide au service de la Oumma.",
];

export default function ChartePage() {
  return (
    <>
      <PageHeading
        eyebrow="Charte éthique"
        title="AMĀNA repose sur trois fondements : Intention. Intégrité. Ihsan"
      />

      <Quote
        text="Le commerçant honnête et digne de confiance sera avec les prophètes, les véridiques et les martyrs."
        source="Rapporté par Abou Sa'id al-Khudri (رضي الله عنه), At-Tirmidhi"
      />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24">
        <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
          <>Nos partenaires s'engagent à</>
        </Reveal>
        <ul className="mt-12 space-y-10">
          {ENGAGEMENTS.map((e, i) => (
            <Reveal key={e} delay={i * 80} as="li" className="grid grid-cols-[auto_1fr] gap-6 items-baseline border-b border-[rgba(31,42,42,0.08)] pb-10">
              <>
                <span className="font-display italic text-2xl text-[var(--or)]">0{i + 1}</span>
                <p className="font-display text-2xl md:text-3xl text-[var(--ink)] leading-[1.3] max-w-[60ch]">
                  {e}
                </p>
              </>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32 md:pb-40">
        <Reveal>
          <p className="font-display italic text-3xl md:text-4xl text-[var(--ink)] leading-[1.35] max-w-[40ch]">
            AMĀNA incarne une ambition claire : permettre à la communauté de trouver, en son sein,
            les talents, les compétences et les expertises dont elle a besoin, par la grâce d&apos;<span className="ar">الله</span>.
          </p>
        </Reveal>
      </section>
    </>
  );
}
