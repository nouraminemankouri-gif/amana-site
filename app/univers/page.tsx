import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { UniverseCards } from "@/components/UniverseCards";
import { Quote } from "@/components/Quote";

export const metadata: Metadata = {
  title: "Les univers AMĀNA",
  description: "Trois univers, une même intention : KHAYR le lien, 'ILM le savoir, 'AFIYAH la santé.",
};

export default function UniversPage() {
  return (
    <>
      <PageHeading
        eyebrow="Les univers AMĀNA"
        title="Avancez selon votre intention"
        intro="Choisir un service ici, c'est soutenir une communauté responsable et consciente, toujours par la grâce d'الله."
      />
      <UniverseCards />
      <Quote
        text="Le meilleur des gens est celui qui est le plus utile aux autres."
        source="Rapporté par At-Tabarânî (hasan)"
      />
    </>
  );
}
