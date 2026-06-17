"use client";
import { Reveal } from "./Reveal";
import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  source: string;
  intro?: string;
};

export function Quote({ text, source, intro = "Le prophète ﷺ a dit" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Render arabic ﷺ glyph in arabic font
  const renderIntro = (s: string) => {
    return s.split(/(ﷺ)/g).map((chunk, i) =>
      chunk === "ﷺ" ? (
        <span key={i} className="ar">{chunk}</span>
      ) : (
        <span key={i}>{chunk}</span>
      ),
    );
  };

  return (
    <section className="mx-auto max-w-[1280px] px-6 md:px-10 py-24 md:py-32">
      <div ref={ref} className={`quote-rule ${visible ? "is-visible" : ""} max-w-[68ch]`}>
        <Reveal as="p" className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--sauge)]">
          <>{renderIntro(intro)}</>
        </Reveal>
        <Reveal delay={120} as="blockquote" className="mt-6 font-display italic text-2xl md:text-4xl text-[var(--ink)] leading-[1.3]">
          <>« {text} »</>
        </Reveal>
        <Reveal delay={220} as="p" className="mt-6 text-[0.78rem] tracking-[0.18em] text-[var(--encre-soft)]">
          <>— {source}</>
        </Reveal>
      </div>
    </section>
  );
}
