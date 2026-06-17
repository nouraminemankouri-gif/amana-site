import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Notre vision",
  description: "AMĀNA, un écosystème où le temps est honoré, la parole a du poids et chaque interaction porte une forme de baraka.",
};

export default function VisionPage() {
  return (
    <>
      <PageHeading
        eyebrow="Notre vision"
        title="Revenir à l'essentiel."
      />

      <section className="mx-auto max-w-[760px] px-6 md:px-10 pb-32 md:pb-40 prose-amana">
        <Reveal as="p" className="font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.4]">
          <>Chez AMĀNA, nous croyons que chaque service porte une responsabilité.</>
        </Reveal>

        <Reveal delay={120} as="ul" className="mt-10 space-y-3 text-lg text-[var(--encre-soft)]">
          <>
            <li>Une responsabilité envers soi.</li>
            <li>Une responsabilité envers les autres.</li>
            <li>Une responsabilité devant <span className="ar">الله</span>.</li>
          </>
        </Reveal>

        <Reveal delay={200} as="p" className="mt-12 text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
          <>
            Dans un monde où tout va vite, où l&apos;offre est abondante mais souvent déconnectée du sens, AMĀNA naît d&apos;un besoin simple : revenir à l&apos;essentiel.
          </>
        </Reveal>

        <Reveal delay={280} as="p" className="mt-6 text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
          <>
            Créer un espace où les professionnels ne sont pas seulement compétents, mais <strong>alignés, sincères et engagés dans l&apos;excellence</strong>.
          </>
        </Reveal>
        <Reveal delay={340} as="p" className="mt-6 text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
          <>
            Créer un espace où les utilisateurs ne consomment plus au hasard, mais <strong>avancent avec intention</strong>.
          </>
        </Reveal>

        <Reveal delay={420} as="p" className="mt-14 font-display italic text-2xl md:text-3xl text-[var(--ink)] leading-[1.4]">
          <>AMĀNA n&apos;est pas une simple plateforme.</>
        </Reveal>
        <Reveal delay={500} as="p" className="mt-6 text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
          <>C&apos;est un écosystème où :</>
        </Reveal>
        <Reveal delay={560} as="ul" className="mt-4 space-y-3 text-lg text-[var(--ink)]">
          <>
            <li>le temps est honoré,</li>
            <li>la parole a du poids,</li>
            <li>chaque interaction porte une forme de baraka.</li>
          </>
        </Reveal>

        <Reveal delay={640} as="p" className="mt-14 text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
          <>
            Nous croyons en une approche où la qualité prime sur la quantité, où la confiance se construit, et où chaque service devient une expérience juste, utile et profondément humaine.
          </>
        </Reveal>

        <Reveal delay={720} as="p" className="mt-14 font-display italic text-3xl md:text-4xl text-[var(--ink)] leading-[1.3]">
          <>AMĀNA, c&apos;est une invitation.</>
        </Reveal>
        <Reveal delay={780} as="ul" className="mt-6 space-y-2 text-lg text-[var(--ink)]">
          <>
            <li>À choisir avec conscience.</li>
            <li>À proposer avec intégrité.</li>
            <li>À construire avec ihsan.</li>
          </>
        </Reveal>

        <Reveal delay={860} as="p" className="mt-14 text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
          <>
            Inspirés par <span className="ar">الله</span> et guidés par notre foi, nous croyons qu&apos;en travaillant avec sincérité et éthique, nous participons à une véritable adoration et contribuons à la baraka dans nos vies et dans celles des autres.
          </>
        </Reveal>
      </section>
    </>
  );
}
