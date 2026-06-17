"use client";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: any;
    let raf: number;
    let mounted = true;
    (async () => {
      try {
        const mod = await import("lenis");
        const Lenis = mod.default || (mod as any).Lenis;
        if (!mounted) return;
        lenis = new Lenis({
          duration: 1.05,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
          syncTouch: false,
        });
        const tick = (time: number) => {
          lenis?.raf(time);
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch {
        /* lenis not available, fall back to native */
      }
    })();
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      lenis?.destroy?.();
    };
  }, []);
  return null;
}
