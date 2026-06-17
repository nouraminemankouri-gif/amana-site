// Données seed (mode démo, lecture seule). Ne pas modifier le texte d'Aminah.
import type { AvailabilityRules, ServiceItem } from "./schema";

export type SeedExpert = {
  slug: string;
  nom: string;
  email: string;
  intent: string;
  role: string;
  univers: "khayr" | "ilm" | "afiyah";
  universLabel: string;
  format: string;
  bio: string;
  services: ServiceItem[];
  // Bloc texte fidèle à la fiche actuelle, avec sa mise en forme
  pageBody?: {
    saugeIntro?: string;
    sectionEyebrow?: string;
    items: Array<{
      title: string;
      duration?: string;
      lines?: string[];
      body?: string;
    }>;
  };
  timezone: string;
  availabilityRules: AvailabilityRules;
  status: "active";
};

const defaultRules: AvailabilityRules = {
  weekdays: {
    monday: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
    tuesday: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
    wednesday: [{ start: "09:00", end: "12:00" }],
    thursday: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
    friday: [{ start: "09:00", end: "12:00" }],
  },
  slot_duration_minutes: 60,
  buffer_minutes: 15,
  min_notice_hours: 24,
  max_advance_days: 45,
  excluded_dates: [],
};

export const SEED_EXPERTS: SeedExpert[] = [
  {
    slug: "coach-rachida",
    nom: "COACH Rachida",
    email: "coach.rachida@amana.demo",
    intent: "Révélatrice de guerrières",
    role: "Coaching sportif et alimentaire",
    univers: "afiyah",
    universLabel: "'AFIYAH",
    format: "Distanciel",
    bio: "Je vous accompagne à retrouver un équilibre durable, avec douceur et exigence.",
    timezone: "Europe/Paris",
    availabilityRules: defaultRules,
    status: "active",
    pageBody: {
      saugeIntro: "Révélatrice de guerrières",
      sectionEyebrow: "Je peux vous accompagner pour",
      items: [
        {
          title: "Coaching individuel live (zoom)",
          lines: [
            "la séance d'une heure: 39€",
            "pack transformation 10 séances: 330€",
          ],
        },
        {
          title: "Coaching en groupe live (zoom)",
          lines: ["la séance d'une heure: 39€"],
        },
        {
          title: "Cours collectifs live (zoom lundi et mercredi 19h)",
          lines: [
            "thème: perte de poids et remise en forme",
            "2 séances/semaine: 55€/mois",
          ],
        },
        {
          title: "Programme nutrition VIP (12 semaines)",
          lines: [
            "calcul des macros/ menus & recettes saines/ liste de courses",
            "110€",
          ],
        },
        {
          title: "Programme sportif personnalisé",
          lines: [
            "entraînement autonome: 55€",
            "prise de masse OU perte de poids",
          ],
        },
        {
          title: "Accompagnement & suivi (optionnel)",
          lines: [
            "suivi hebdomadaire 1 bilan/ semaine: 55€/mois",
            "suivi premium journalier: 110€/mois",
          ],
        },
      ],
    },
    services: [
      {
        id: "individuel-1h",
        title: "Coaching individuel live (zoom) — séance 1h",
        duration_minutes: 60,
        price_eur: 39,
      },
      {
        id: "groupe-1h",
        title: "Coaching en groupe live (zoom) — séance 1h",
        duration_minutes: 60,
        price_eur: 39,
      },
    ],
  },
  {
    slug: "dar-balkis",
    nom: "DAR Balkis",
    email: "dar.balkis@amana.demo",
    intent: "Gardienne du savoir féminin",
    role: "Infirmière spécialisée en santé féminine",
    univers: "afiyah",
    universLabel: "'AFIYAH",
    format: "Distanciel",
    bio: "J'accompagne les femmes à mieux se connaître, remettre Allah au juste milieu et se reconnecter à leur fitrah.",
    timezone: "Europe/Paris",
    availabilityRules: defaultRules,
    status: "active",
    pageBody: {
      saugeIntro: "Gardienne du savoir féminin",
      sectionEyebrow: "Les deux ateliers proposés",
      items: [
        {
          title: "À la découverte du cycle féminin",
          duration: "séance de 1h30 : 65€",
          body: "Comprendre les 4 phases du cycle et leurs influences hormonales, émotionnelles et spirituelles . Apprendre à observer son cycle . Comprendre les bienfaits du cycle menstruel mais aussi ses perturbateurs",
        },
        {
          title: "En route vers la puberté (à partir de 9ans)",
          duration: "séance de 1h45 : 55€",
          body: "Définition du cycle menstruel (état hormonal et émotionnel) . Observation des changements liés à la puberté . soutenir l'estime de soi . être attentif à l'hygiène de vie . ancrage spirituel",
        },
      ],
    },
    services: [
      {
        id: "atelier-cycle",
        title: "À la découverte du cycle féminin — 1h30",
        duration_minutes: 90,
        price_eur: 65,
      },
      {
        id: "atelier-puberte",
        title: "En route vers la puberté — 1h45",
        duration_minutes: 105,
        price_eur: 55,
      },
    ],
  },
];

export function findSeedExpert(slug: string): SeedExpert | null {
  return SEED_EXPERTS.find((e) => e.slug === slug) ?? null;
}
