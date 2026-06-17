import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Quote } from "@/components/Quote";

export const metadata: Metadata = {
  title: "'ILM — le pôle du savoir",
  description: "Le savoir est une amāna. Il se transmet en recherchant l'agrément d'الله.",
};

const ENSEIGNEMENTS = [
  "Langue arabe",
  "Méthode Nouraniya",
  "Cours de Qur'an",
  "Cours de Tajwid",
  "Cours de aqida",
  "Cours de fiqh",
  "Formation au lavage mortuaire",
];

export default function IlmPage() {
  return (
    <>
      <PageHeading
        eyebrow="'ILM"
        title="( العلم ) la connaissance"
      />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-24">
        <Reveal as="div">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Notre approche</p>
          <p className="mt-8 max-w-[68ch] text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
            Ces enseignements sont transmis avec sérieux, clarté et responsabilité, dans le respect des textes et de la méthodologie traditionnelle, avec la conscience que le savoir est une <em>amāna</em> et qu&apos;il se transmet en recherchant l&apos;agrément d&apos;<span className="ar">الله</span> &apos;azzawajal.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 py-16 md:py-24 border-t border-[rgba(31,42,42,0.08)]">
        <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
          <>Les enseignements proposés</>
        </Reveal>
        <ul className="mt-10 grid gap-x-12 gap-y-5 md:grid-cols-2">
          {ENSEIGNEMENTS.map((a, i) => (
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
              accéder aux enseignements
              <span aria-hidden>→</span>
            </Link>
          </>
        </Reveal>
      </section>

      <Quote
        text="Qu'Allah fasse resplendir de beauté celui qui aura entendu quelque chose venant de nous et qui l'aura transmis tel qu'il l'a entendu. Il se peut que celui à qui parviendront [mes propos] soit plus attentif que celui qui les a entendus."
        source="Tirmidhi, riyad as-salihin n°1389, authentifié par sheikh al Albani"
      />
    </>
  );
}
