import { Link } from "next-view-transitions";
import { HeroMotion as Hero } from "@/components/HeroMotion";
import { UniverseCards } from "@/components/UniverseCards";
import { Quote } from "@/components/Quote";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />

      <UniverseCards />

      <Quote
        text="Le meilleur des gens est celui qui est le plus utile aux autres."
        source="Rapporté par At-Tabarânî (hasan)"
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-24 md:py-40">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <Reveal as="div" className="md:col-span-5">
            <p className="ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
              <span>Notre vision</span>
            </p>
            <h2 className="mt-10 font-display text-4xl md:text-5xl leading-[1.08] text-[var(--ink)] max-w-[18ch]">
              Revenir à l&apos;essentiel.
            </h2>
          </Reveal>
          <Reveal delay={150} as="div" className="md:col-span-6 md:col-start-7 prose-amana max-w-[64ch]">
            <p className="text-base md:text-lg leading-[1.75] text-[var(--encre-soft)]">
              Chez AMĀNA, nous croyons que chaque service porte une responsabilité.
              Une responsabilité envers soi. Une responsabilité envers les autres.
              Une responsabilité devant <span className="ar">الله</span>.
            </p>
            <p className="mt-6 text-base md:text-lg leading-[1.75] text-[var(--encre-soft)]">
              Créer un espace où les professionnels ne sont pas seulement compétents,
              mais alignés, sincères et engagés dans l&apos;excellence. Créer un espace
              où les utilisateurs ne consomment plus au hasard, mais avancent avec intention.
            </p>
            <p className="mt-10">
              <Link href="/notre-vision" className="link-underline text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)]">
                Lire notre vision
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-24 md:py-32 border-t border-[rgba(31,42,42,0.08)]">
        <div className="grid gap-16 md:grid-cols-12 items-start">
          <Reveal as="div" className="md:col-span-5">
            <p className="ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
              <span>Sélection d&apos;experts</span>
            </p>
          </Reveal>
          <Reveal delay={120} as="div" className="md:col-span-7">
            <ul className="divide-y divide-[rgba(31,42,42,0.08)]">
              <li>
                <Link href="/pro/coach-rachida" className="group flex items-baseline justify-between gap-6 py-6">
                  <div>
                    <p className="font-display text-2xl md:text-3xl text-[var(--ink)] group-hover:text-[var(--sauge)] transition-colors duration-500">
                      Coach Rachida
                    </p>
                    <p className="mt-2 font-display italic text-base md:text-lg text-[var(--encre-soft)]">
                      Révélatrice de guerrières
                    </p>
                  </div>
                  <span aria-hidden className="text-[var(--sauge)] transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </li>
              <li>
                <Link href="/pro/dar-balkis" className="group flex items-baseline justify-between gap-6 py-6">
                  <div>
                    <p className="font-display text-2xl md:text-3xl text-[var(--ink)] group-hover:text-[var(--sauge)] transition-colors duration-500">
                      Dar Balkis
                    </p>
                    <p className="mt-2 font-display italic text-base md:text-lg text-[var(--encre-soft)]">
                      Gardienne du savoir féminin
                    </p>
                  </div>
                  <span aria-hidden className="text-[var(--sauge)] transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </li>
            </ul>
            <Link
              href="/annuaire"
              className="mt-10 inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
            >
              <span>voir la sélection</span>
              <span aria-hidden className="transition-transform duration-500 hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-40 text-center">
        <Reveal>
          <p className="ar text-5xl md:text-6xl text-[var(--sauge)]">بسم الله</p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-10 font-display italic text-2xl md:text-3xl text-[var(--ink)] max-w-[28ch] mx-auto leading-[1.4]">
            Que <span className="ar">الله</span> mette la baraka dans chaque intention sincère.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <Link
            href="/contact"
            className="mt-12 inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
          >
            Nous écrire
          </Link>
        </Reveal>
      </section>
    </>
  );
}
