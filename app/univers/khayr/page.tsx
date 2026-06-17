import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Quote } from "@/components/Quote";

export const metadata: Metadata = {
  title: "KHAYR — le pôle du lien",
  description: "Soutenir une famille, apaiser un couple, accompagner un parent ou assister une personne fragile.",
};

const ACCOMPAGNEMENTS = [
  "Accompagnement au projet de nikah",
  "Accompagnement conjugual",
  "Accompagnement psychologique individuel",
  "Médiation familiale",
  "Soutien parental et monoparental",
  "Soutien aux personnes isolées",
  "Accompagnement funéraire et soutien aux familles",
];

export default function KhayrPage() {
  return (
    <>
      <PageHeading
        eyebrow="KHAYR"
        title="( الخير ) le bien"
      />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-24">
        <Reveal as="div">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Notre approche</p>
          <p className="mt-8 max-w-[68ch] text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
            Chaque accompagnement est proposé dans un cadre éthique clair : respect, pudeur, confidentialité et responsabilité.
          </p>
          <p className="mt-6 max-w-[68ch] text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
            Ici le khayr se vit à travers les liens de vie : Nous croyons que soutenir une famille, apaiser un couple, accompagner un parent ou assister une personne fragile est une forme de <em>&apos;ibadah</em>{" "}lorsqu&apos;elle est accomplie avec une intention sincère.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
          <>Les accompagnements proposés</>
        </Reveal>
        <ul className="mt-10 grid gap-x-12 gap-y-5 md:grid-cols-2">
          {ACCOMPAGNEMENTS.map((a, i) => (
            <Reveal key={a} delay={i * 60} as="li" className="border-b border-[rgba(31,42,42,0.08)] pb-5 flex items-baseline gap-4">
              <>
                <span className="text-[0.7rem] tracking-[0.2em] text-[var(--or)]">0{i + 1}</span>
                <span className="font-display text-xl md:text-2xl text-[var(--ink)]">{a}</span>
              </>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={500} as="div" className="mt-16">
          <>
            <Link
              href="/annuaire"
              className="inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
            >
              créer du lien
              <span aria-hidden>→</span>
            </Link>
          </>
        </Reveal>
      </section>

      <Quote
        text="Quiconque indique un bien a la même récompense que celui qui l'accomplit."
        source="Rapporté par Muslim, Sahîh Muslim 1893"
      />
    </>
  );
}
