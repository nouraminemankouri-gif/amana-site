import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { Quote } from "@/components/Quote";

export const metadata: Metadata = {
  title: "'AFIYAH — le pôle de la santé",
  description: "La santé est une amana confiée par الله. Conscience, équilibre, modération.",
};

const ACCOMPAGNEMENTS = [
  "Coaching sportif feminin",
  "Nutrition/ diététique",
  "Naturopathie",
  "Médecine prophétique",
  "Thérapie hijama",
  "Conseil bien-être femmes",
];

export default function AfiyahPage() {
  return (
    <>
      <PageHeading
        eyebrow="'AFIYAH"
        title="( العافية ) la santé"
      />

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-24">
        <Reveal as="div">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">Notre approche</p>
          <p className="mt-8 max-w-[68ch] text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
            La santé est une amana confiée par <span className="ar">الله</span> &apos;azzawajal. Prendre soin de son corps et de son hygiène de vie fait partie de la responsabilité du croyant envers lui-même.
          </p>
          <p className="mt-6 max-w-[68ch] text-base md:text-lg leading-[1.8] text-[var(--encre-soft)]">
            Nous privilégions une approche globale : conscience, équilibre, modération et retour à des pratiques saines, notamment issues de la médecine prophétique.
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
              Prendre soin de soi
              <span aria-hidden>→</span>
            </Link>
          </>
        </Reveal>
      </section>

      <Quote
        text="Il y a deux bienfaits dont beaucoup de gens ne profitent pas : la santé et le temps libre."
        source="Rapporté par Al-Bukhari"
      />
    </>
  );
}
