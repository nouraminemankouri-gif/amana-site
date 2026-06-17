"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";

const WORDS = ["Intention.", "Intégrité.", "Ihsan."];

export function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // Defer video load until after first paint to protect LCP.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const id = typeof w.requestIdleCallback === "function"
      ? w.requestIdleCallback(() => setVideoReady(true), { timeout: 1500 })
      : (window.setTimeout(() => setVideoReady(true), 800) as unknown as number);
    return () => {
      if (typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden"
      aria-label="Présentation"
      style={{
        minHeight: "min(100svh, 920px)",
      }}
    >
      {/* Static background gradient as LCP-safe layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(90,111,90,0.10), rgba(250,247,242,0) 60%), linear-gradient(180deg, #FAF7F2 0%, #F2EDE3 100%)",
        }}
      />

      {/* Hero loop video, lazy mounted to protect LCP */}
      {videoReady && (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.svg"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60 mix-blend-multiply"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 60%, rgba(31,42,42,0.06) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 pt-[20vh] md:pt-[24vh] pb-32 md:pb-40">
        <p
          className="hero-word ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]"
          style={{ animationDelay: "200ms" }}
        >
          <span>plateforme musulmane vertueuse</span>
        </p>

        <h1 className="mt-10 font-display text-[clamp(2.6rem,8vw,7.2rem)] leading-[1.02] tracking-[-0.01em] text-[var(--ink)] max-w-[14ch]">
          <span className="hero-word" style={{ animationDelay: "600ms" }}>Au service</span>{" "}
          <span className="hero-word italic text-[var(--sauge)]" style={{ animationDelay: "1000ms" }}>de la oumma,</span>{" "}
          <span className="hero-word" style={{ animationDelay: "1400ms" }}>avec </span>
          <span className="hero-word" style={{ animationDelay: "1700ms" }}>intention.</span>
        </h1>

        <div className="mt-14 max-w-[58ch]">
          <p className="hero-word text-base md:text-lg text-[var(--encre-soft)] leading-[1.7]" style={{ animationDelay: "2000ms" }}>
            AMĀNA réunit des professionnel·les engagé·es dans la qualité, la sincérité et l&apos;ihsan.
            Un espace où le temps est honoré, la parole a du poids et chaque interaction porte une forme de baraka.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline gap-x-10 gap-y-4">
          {WORDS.map((w, i) => (
            <span
              key={w}
              className="hero-word font-display italic text-2xl md:text-3xl text-[var(--ink)]"
              style={{ animationDelay: `${2400 + i * 280}ms` }}
            >
              {w}
            </span>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 hero-word" style={{ animationDelay: "3400ms" }}>
          <Link
            href="/univers"
            className="group inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
          >
            <span>Entrer dans les univers</span>
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/notre-vision"
            className="link-underline text-[0.78rem] uppercase tracking-[0.32em] text-[var(--sauge)]"
          >
            Notre vision
          </Link>
        </div>
      </div>

      {/* Bottom decorative tagline */}
      <div className="absolute bottom-8 right-6 md:right-10 hero-word" style={{ animationDelay: "3800ms" }}>
        <p className="text-[0.65rem] uppercase tracking-[0.42em] text-[var(--sauge)]">
          fissabiliLlah · 2026
        </p>
      </div>
    </section>
  );
}
