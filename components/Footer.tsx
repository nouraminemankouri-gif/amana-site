import { Link } from "next-view-transitions";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(31,42,42,0.08)] mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl md:text-4xl leading-tight text-[var(--ink)]">
            AMĀNA
          </p>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.32em] text-[var(--sauge)]">
            Intention. Intégrité. Ihsan.
          </p>
          <p className="mt-8 max-w-md text-[0.95rem] text-[var(--encre-soft)] leading-relaxed">
            Projet communautaire au service du lien et de l&apos;éthique. Que <span className="ar">الله</span> mette
            la baraka dans chaque intention sincère.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--sauge)] mb-5">Plateforme</p>
          <ul className="space-y-3 text-[0.95rem]">
            <li><Link href="/notre-vision" className="link-underline">Notre vision</Link></li>
            <li><Link href="/univers" className="link-underline">Les univers</Link></li>
            <li><Link href="/annuaire" className="link-underline">Sélection d&apos;experts</Link></li>
            <li><Link href="/un-frere-une-soeur" className="link-underline">Un frère. Une sœur.</Link></li>
            <li><Link href="/la-revivification-du-coeur" className="link-underline">La revivification du cœur</Link></li>
            <li><Link href="/amana-lightness" className="link-underline">AMANA × Lightness</Link></li>
            <li><Link href="/charte-ethique" className="link-underline">Charte éthique</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--sauge)] mb-5">Légal</p>
          <ul className="space-y-3 text-[0.95rem]">
            <li><Link href="/contact" className="link-underline">Contact</Link></li>
            <li><span className="text-[var(--encre-soft)] opacity-60">Mentions légales</span></li>
            <li><span className="text-[var(--encre-soft)] opacity-60">Confidentialité</span></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--sauge)] mb-5">Présent ici</p>
          <ul className="space-y-3 text-[0.95rem]">
            <li>
              <a href={`mailto:${SITE.email}`} className="link-underline">Écrire</a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[rgba(31,42,42,0.06)] pt-8">
        <p className="text-[0.78rem] text-[var(--encre-soft)]">
          © 2026 AMĀNA. Projet communautaire au service du lien et de l&apos;éthique.
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--or)]">
          fissabiliLlah
        </p>
      </div>
    </footer>
  );
}
