import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { LIGHTNESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AMANA × Lightness",
  description:
    "Agir avec responsabilité aujourd'hui. Transmettre avec clarté demain. AMĀNA accompagne les responsabilités que l'on porte dans la vie présente, LightNess prolonge cette démarche.",
  alternates: { canonical: "/amana-lightness" },
};

export default function AmanaLightnessPage() {
  return (
    <article className="pb-24">
      <header className="mx-auto max-w-[1100px] px-6 md:px-10 pt-40 md:pt-52">
        <Reveal>
          <p className="ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
            <span>AMANA × Lightness</span>
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-10 font-display text-[2.4rem] md:text-[4rem] leading-[1.04] text-[var(--ink)] max-w-[22ch]">
            Agir avec responsabilité aujourd&apos;hui. Transmettre avec clarté demain.
          </h1>
        </Reveal>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 mt-20 md:mt-28 grid gap-16 md:grid-cols-12">
        <Reveal as="div" className="md:col-span-7 prose-amana max-w-[64ch]">
          <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            LightNess est une application qui permet de rédiger et d&apos;organiser ses
            dernières volontés, afin de laisser un cadre clair et apaisé à ceux qui restent.
          </p>
          <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            Pensée pour accompagner chacun dans cette démarche avec justesse, elle offre un
            espace simple et structuré pour anticiper ce qui doit l&apos;être.
          </p>
          <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            Cette démarche repose sur des principes essentiels : agir avec responsabilité,
            aller à l&apos;essentiel avec simplicité.
          </p>
          <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            Au-delà des biens, transmettre ce qui compte réellement et respecter les volontés
            des défunts.
          </p>
          <p className="mt-6 font-display italic text-xl md:text-2xl text-[var(--ink)] leading-[1.5]">
            Anticiper et préparer son départ est aussi une forme d&apos;amour pour ceux qui
            restent.
          </p>
        </Reveal>

        <Reveal delay={150} as="div" className="md:col-span-5 md:col-start-8">
          <div className="sticky top-32 border border-[rgba(31,42,42,0.12)] p-8 md:p-10 bg-[rgba(255,255,255,0.4)] backdrop-blur-[2px]">
            <div className="flex items-center gap-4">
              <Image
                src={LIGHTNESS.icon}
                alt=""
                width={48}
                height={48}
                className="opacity-90"
              />
              <div>
                <p className="font-display text-2xl text-[var(--ink)]">{LIGHTNESS.name}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)] mt-1">
                  Application gratuite
                </p>
              </div>
            </div>
            <a
              href={LIGHTNESS.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
            >
              Découvrir LightNess
              <span aria-hidden>→</span>
            </a>
            <p className="mt-8 text-[0.85rem] text-[var(--encre-soft)] leading-relaxed">
              lightness.world
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 mt-24 md:mt-32">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--sauge)]">
            Démystifier le sujet tabou
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)] max-w-[64ch]">
            LightNess permet de poser des actions concrètes, afin démystifier le sujet tabou
            qu&apos;est la mort:
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          <Reveal as="li" delay={50}>
            <div className="border-t border-[var(--sauge)] pt-6 h-full">
              <p className="font-display text-xl md:text-2xl leading-[1.35] text-[var(--ink)]">
                Rédiger ses dernières volontés avec clarté, en les adressant aux personnes
                concernées
              </p>
            </div>
          </Reveal>
          <Reveal as="li" delay={150}>
            <div className="border-t border-[var(--sauge)] pt-6 h-full">
              <p className="font-display text-xl md:text-2xl leading-[1.35] text-[var(--ink)]">
                Documenter ses dettes — religieuses, financières, matérielles ou personnelles
              </p>
            </div>
          </Reveal>
          <Reveal as="li" delay={250}>
            <div className="border-t border-[var(--sauge)] pt-6 h-full">
              <p className="font-display text-xl md:text-2xl leading-[1.35] text-[var(--ink)]">
                Localiser des services funéraires musulmans adaptés aux besoins religieux,
                pour soi ou pour ses proches.
              </p>
            </div>
          </Reveal>
        </ul>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 mt-24 md:mt-32">
        <div className="grid gap-12 md:grid-cols-12 items-start">
          <Reveal as="div" className="md:col-span-6 prose-amana">
            <p className="text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              AMĀNA accompagne les responsabilités que l&apos;on porte dans la vie présente,
              à travers des services pensés pour guider, soutenir et élever.
            </p>
            <p className="mt-6 text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
              LightNess prolonge naturellement cette démarche en permettant de préparer ce
              qui sera transmis, avec la même exigence de justesse et de responsabilité.
            </p>
          </Reveal>
          <Reveal delay={150} as="div" className="md:col-span-5 md:col-start-8">
            <p className="font-display italic text-xl md:text-2xl leading-[1.5] text-[var(--ink)]">
              Deux approches complémentaires, réunies par une même intention : agir avec
              conscience, pour soi comme pour ceux que l&apos;on aime.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 md:px-10 mt-24 md:mt-32 text-center">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
            Accessible à tous
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 font-display text-3xl md:text-5xl leading-[1.15] text-[var(--ink)]">
            LightNess est accessible à tous puisqu&apos;elle est{" "}
            <span className="italic text-[var(--sauge)]">gratuite</span>.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-10 max-w-[60ch] mx-auto text-base md:text-lg leading-[1.85] text-[var(--encre-soft)]">
            Lorsque cela est possible, soutenir cette initiative par un don permet de
            développer de nouveaux outils dans l&apos;application..
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 md:px-10 mt-24 md:mt-40 text-center">
        <Reveal>
          <p className="ar text-5xl md:text-6xl text-[var(--sauge)]">سَدَقَة جَارِيَة</p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-12 font-display italic text-xl md:text-3xl leading-[1.45] text-[var(--ink)] max-w-[42ch] mx-auto">
            Qu&apos;Allah récompense son fondateur, l&apos;ensemble des personnes qui contribuent
            à ce projet, ainsi que tous ceux et celles qui le soutiennent, et en fasse pour
            chacun une sadaqa jariya.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 md:px-10 mt-24 md:mt-32">
        <Reveal>
          <a
            href={LIGHTNESS.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden border border-[rgba(31,42,42,0.12)] hover:border-[var(--sauge)] transition-colors duration-700"
          >
            <div className="grid md:grid-cols-12 items-center">
              <div className="md:col-span-7 p-10 md:p-14">
                <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
                  tant qu&apos;il est encore temps
                </p>
                <p className="mt-6 font-display text-3xl md:text-4xl leading-[1.1] text-[var(--ink)] max-w-[18ch]">
                  Découvrir LightNess
                </p>
                <p className="mt-8 inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 group-hover:text-[var(--sauge)] group-hover:border-[var(--sauge)] transition-colors duration-500">
                  lightness.world
                  <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </p>
              </div>
              <div className="md:col-span-5 relative aspect-[1200/630] md:aspect-auto md:h-full md:min-h-[280px] bg-[#F2EDE3]">
                <Image
                  src={LIGHTNESS.ogImage}
                  alt="LightNess"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </a>
        </Reveal>
      </section>
    </article>
  );
}
