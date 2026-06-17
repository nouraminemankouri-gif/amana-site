"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "p" | "h1" | "h2" | "h3" | "blockquote" | "li" | "ul" | "figure";
  delay?: number;
  className?: string;
  threshold?: number;
};

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={`amana-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}
