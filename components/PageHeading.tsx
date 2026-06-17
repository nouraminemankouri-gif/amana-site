import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  arabic?: string;
  intro?: string;
};

export function PageHeading({ eyebrow, title, arabic, intro }: Props) {
  return (
    <header className="mx-auto max-w-[1280px] px-6 md:px-10 pt-[18vh] md:pt-[22vh] pb-12 md:pb-20">
      {eyebrow && (
        <Reveal as="p" className="ornament-line text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)]">
          <span>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={120}>
        <h1 className="mt-10 font-display text-[clamp(2.4rem,7vw,5.6rem)] leading-[1.04] tracking-[-0.01em] text-[var(--ink)] max-w-[16ch]">
          {title}
        </h1>
      </Reveal>
      {arabic && (
        <Reveal delay={220}>
          <p className="mt-6 ar text-3xl md:text-4xl text-[var(--sauge)]">{arabic}</p>
        </Reveal>
      )}
      {intro && (
        <Reveal delay={300}>
          <p className="mt-10 max-w-[64ch] text-base md:text-lg leading-[1.75] text-[var(--encre-soft)]">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
