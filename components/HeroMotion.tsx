"use client";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroMotion() {
  const reduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section
      className="relative isolate overflow-hidden"
      aria-label="Présentation"
      style={{ minHeight: "min(100svh, 920px)" }}
    >
      {/* LCP-safe gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 28%, rgba(90,111,90,0.10), rgba(250,247,242,0) 60%), linear-gradient(180deg, #FAF7F2 0%, #F2EDE3 100%)",
        }}
      />

      {/* SVG calligraphy stroke that draws in once on load */}
      <svg
        aria-hidden
        viewBox="0 0 1600 900"
        className="absolute inset-0 -z-10 w-full h-full opacity-[0.18]"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 120 540 C 320 380, 540 700, 780 520 S 1240 360, 1480 540"
          fill="none"
          stroke="#5A6F5A"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4.8, delay: 0.4, ease: EASE }}
        />
        <motion.path
          d="M 200 620 C 400 540, 620 700, 880 600 S 1320 500, 1500 620"
          fill="none"
          stroke="#A98C5C"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity={0.6}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5.2, delay: 0.9, ease: EASE }}
        />
      </svg>

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 60%, rgba(31,42,42,0.06) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 pt-[20vh] md:pt-[24vh] pb-32 md:pb-40">
        <motion.p
          {...fade(0.15)}
          className="ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]"
        >
          <span>AMĀNA</span>
        </motion.p>

        <h1 className="mt-10 font-display text-[clamp(2.6rem,8vw,7.2rem)] leading-[1.02] tracking-[-0.01em] text-[var(--ink)] max-w-[16ch]">
          <motion.span {...fade(0.4)} className="block">
            Plateforme
          </motion.span>
          <motion.span {...fade(0.7)} className="block italic text-[var(--sauge)]">
            musulmane vertueuse
          </motion.span>
          <motion.span {...fade(1.0)} className="block">
            au service de la oumma.
          </motion.span>
        </h1>

        <div className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-3">
          {["Intention.", "Intégrité.", "Ihsan."].map((w, i) => (
            <motion.span
              key={w}
              {...fade(1.4 + i * 0.28)}
              className="font-display italic text-2xl md:text-3xl text-[var(--ink)]"
            >
              {w}
            </motion.span>
          ))}
        </div>

        <motion.div
          {...fade(2.4)}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Link
            href="/univers"
            className="group inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
          >
            <span>entrer</span>
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/notre-vision"
            className="link-underline text-[0.78rem] uppercase tracking-[0.32em] text-[var(--sauge)]"
          >
            Notre vision
          </Link>
        </motion.div>
      </div>

      <motion.div
        {...fade(3.0)}
        className="absolute bottom-8 right-6 md:right-10"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.42em] text-[var(--sauge)]">
          fissabiliLlah · 2026
        </p>
      </motion.div>
    </section>
  );
}
