"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Reveal } from "./Reveal";

const UNIVERS = [
  {
    slug: "khayr",
    title: "KHAYR",
    arabic: "الخير",
    subtitle: "Le pôle du lien",
    body: "Soutenir une famille, apaiser un couple, accompagner un parent ou assister une personne fragile.",
    image: "/univers/khayr.png",
  },
  {
    slug: "ilm",
    title: "'ILM",
    arabic: "العلم",
    subtitle: "Le pôle du savoir",
    body: "Ces enseignements sont transmis avec sérieux, clarté et responsabilité, dans le respect des textes et de la méthodologie traditionnelle.",
    image: "/univers/ilm.png",
  },
  {
    slug: "afiyah",
    title: "'AFIYAH",
    arabic: "العافية",
    subtitle: "Le pôle de la santé",
    body: "Conscience, équilibre, modération et retour à des pratiques saines, notamment issues de la médecine prophétique.",
    image: "/univers/afiyah.png",
  },
];

export function UniverseCards() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-40">
      <Reveal>
        <p className="ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
          <span>Trois univers, une même niyyah</span>
        </p>
      </Reveal>

      <div className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8">
        {UNIVERS.map((u, i) => (
          <Reveal key={u.slug} delay={i * 100}>
            <Link
              href={`/univers/${u.slug}`}
              className="amana-card group relative block h-full border border-[rgba(31,42,42,0.12)] bg-[var(--bg)] hover:bg-[rgba(250,247,242,1)] overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-[#F2EDE3] overflow-hidden">
                <Image
                  src={u.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-[1.03]"
                  priority={i === 0}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(31,42,42,0) 55%, rgba(250,247,242,0.55) 100%)",
                  }}
                />
              </div>

              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
                    {u.subtitle}
                  </span>
                  <span className="text-[0.7rem] tracking-[0.2em] text-[var(--or)] opacity-70">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-10 flex items-baseline justify-between">
                  <h3 className="font-display text-3xl md:text-4xl text-[var(--ink)]">{u.title}</h3>
                  <span className="ar ar-breathe text-4xl md:text-5xl text-[var(--sauge)]">
                    {u.arabic}
                  </span>
                </div>

                <p className="mt-8 text-[0.95rem] leading-[1.7] text-[var(--encre-soft)]">
                  {u.body}
                </p>

                <span className="mt-12 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[var(--ink)] group-hover:text-[var(--sauge)] transition-colors duration-500">
                  entrer
                  <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
