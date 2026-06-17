"use client";
import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_GROUPS: { eyebrow: string; items: { href: string; label: string; arabic?: string }[] }[] = [
  {
    eyebrow: "Le projet",
    items: [
      { href: "/notre-vision", label: "Notre vision" },
      { href: "/charte-ethique", label: "Charte éthique" },
    ],
  },
  {
    eyebrow: "Les univers",
    items: [
      { href: "/univers", label: "Les univers" },
      { href: "/univers/khayr", label: "KHAYR", arabic: "الخير" },
      { href: "/univers/ilm", label: "'ILM", arabic: "العلم" },
      { href: "/univers/afiyah", label: "'AFIYAH", arabic: "العافية" },
      { href: "/annuaire", label: "Sélection d'experts" },
    ],
  },
  {
    eyebrow: "Les initiatives",
    items: [
      { href: "/un-frere-une-soeur", label: "Un frère. Une sœur." },
      { href: "/la-revivification-du-coeur", label: "La revivification du cœur" },
      { href: "/amana-lightness", label: "AMANA × Lightness" },
    ],
  },
  {
    eyebrow: "Écrire",
    items: [
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Header() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || open
            ? "bg-[rgba(250,247,242,0.92)] backdrop-blur-md border-b border-[rgba(31,42,42,0.06)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-[68px] flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group inline-flex items-baseline"
            aria-label="AMĀNA, accueil"
          >
            <span className="font-display text-[1.6rem] tracking-[0.18em] text-[var(--ink)]">
              AMĀNA
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="group inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] hover:text-[var(--sauge)] transition-colors duration-500"
          >
            <span className="hidden sm:inline">{open ? "Fermer" : "Menu"}</span>
            <span className="relative inline-flex flex-col gap-[5px] w-6">
              <span
                className={`block h-[1px] bg-current transition-transform duration-500 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1px] bg-current transition-transform duration-500 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 bg-[var(--bg)]"
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 overflow-y-auto pt-[68px]">
              <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-12 md:py-16 grid gap-12 md:grid-cols-12">
                {NAV_GROUPS.map((group, gi) => (
                  <motion.div
                    key={group.eyebrow}
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08 * gi, ease: EASE }}
                    className={
                      group.eyebrow === "Les univers"
                        ? "md:col-span-5"
                        : group.eyebrow === "Les initiatives"
                        ? "md:col-span-4"
                        : "md:col-span-3"
                    }
                  >
                    <p className="ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
                      <span>{group.eyebrow}</span>
                    </p>
                    <ul className="mt-8 space-y-4">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group inline-flex items-baseline gap-3 font-display text-2xl md:text-3xl text-[var(--ink)] hover:text-[var(--sauge)] transition-colors duration-500"
                          >
                            <span>{item.label}</span>
                            {item.arabic && (
                              <span className="ar text-xl md:text-2xl text-[var(--sauge)] opacity-80">
                                {item.arabic}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="mx-auto max-w-[1400px] px-6 md:px-10 pb-16 mt-8 border-t border-[rgba(31,42,42,0.08)] pt-10 grid gap-8 md:grid-cols-2 items-end"
              >
                <p className="font-display italic text-xl md:text-2xl text-[var(--sauge)] max-w-[36ch] leading-[1.4]">
                  {SITE.tagline}
                </p>
                <div className="flex md:justify-end gap-8 text-[0.85rem]">
                  <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                    {SITE.email}
                  </a>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[var(--ink)]"
                  >
                    @amana.community
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
