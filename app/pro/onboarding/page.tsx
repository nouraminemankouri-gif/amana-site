import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { GoogleConnectButton } from "@/components/expert/GoogleConnectButton";
import { hasDatabase } from "@/lib/db";
import { hasGoogleCreds } from "@/lib/google";
import { Link } from "next-view-transitions";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Rejoindre la sélection",
  description: "Onboarding des experts AMĀNA : connexion de l'agenda, profil, charte éthique.",
};

export default async function OnboardingPage() {
  const ready = hasDatabase() && hasGoogleCreds();
  const session = ready ? await auth().catch(() => null) : null;

  if (!ready) {
    return (
      <>
        <PageHeading
          eyebrow="Rejoindre AMĀNA"
          title="L'inscription des experts ouvre très bientôt"
          intro="Le parcours d'inscription en ligne sera bientôt disponible. En attendant, écrivez-nous pour entrer en relation."
        />
        <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32">
          <Reveal>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
            >
              Écrire à AMĀNA
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </section>
      </>
    );
  }

  if (session?.user?.email) {
    return (
      <>
        <PageHeading
          eyebrow="Rejoindre AMĀNA"
          title="Vous êtes déjà connecté"
          intro="Continuez votre parcours dans votre espace expert."
        />
        <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32">
          <Reveal>
            <Link
              href="/compte"
              className="inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.32em] text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:text-[var(--sauge)] hover:border-[var(--sauge)] transition-colors duration-500"
            >
              Aller à mon espace
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeading
        eyebrow="Rejoindre AMĀNA"
        title="Connecter votre agenda, en quatre temps."
        intro="Cette plateforme respecte votre intention. Aucune information n'est partagée sans votre accord."
      />
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pb-32 space-y-16">
        <Reveal>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--or)] ornament-line">
              <span>Étape 1</span>
            </p>
            <p className="mt-6 font-display text-2xl md:text-3xl text-[var(--ink)] max-w-[36ch]">
              Connectez votre agenda Google.
            </p>
            <p className="mt-4 text-[0.95rem] text-[var(--encre-soft)] leading-[1.8] max-w-[60ch]">
              Vos créneaux libres seront lus depuis votre calendrier, en temps réel. Aucune autre information n&apos;est consultée. Vous pouvez révoquer cet accès à tout moment.
            </p>
            <div className="mt-8">
              <GoogleConnectButton />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="opacity-60">
            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--encre-soft)]">
              Étape 2 — Profil
            </p>
            <p className="mt-6 font-display text-2xl text-[var(--ink)]">Présentation, intention, univers, photo.</p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div className="opacity-60">
            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--encre-soft)]">
              Étape 3 — Disponibilités
            </p>
            <p className="mt-6 font-display text-2xl text-[var(--ink)]">Vos plages horaires, durées, délais.</p>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="opacity-60">
            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[var(--encre-soft)]">
              Étape 4 — Charte éthique
            </p>
            <p className="mt-6 font-display text-2xl text-[var(--ink)]">Lecture, signature, mise en ligne après validation.</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
