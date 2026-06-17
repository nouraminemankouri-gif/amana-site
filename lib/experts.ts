import { getDb, schema } from "./db";
import { findSeedExpert, SEED_EXPERTS, type SeedExpert } from "./seed-data";
import type { AvailabilityRules, ServiceItem } from "./schema";
import { eq, asc } from "drizzle-orm";

export type PublicExpert = {
  id?: string;
  slug: string;
  nom: string;
  intent: string | null;
  role: string | null;
  univers: string;
  universLabel: string;
  format: string | null;
  bio: string | null;
  photoUrl: string | null;
  timezone: string;
  status: string;
  availabilityRules: AvailabilityRules;
  services: ServiceItem[] | null;
  pageBody?: SeedExpert["pageBody"];
  isSeed: boolean;
  bookingEnabled: boolean;
};

const UNIVERS_LABEL: Record<string, string> = {
  khayr: "KHAYR",
  ilm: "'ILM",
  afiyah: "'AFIYAH",
};

export async function getExpertBySlug(slug: string): Promise<PublicExpert | null> {
  const db = getDb();
  if (db) {
    try {
      const row = await db.query.experts.findFirst({
        where: eq(schema.experts.slug, slug),
      });
      if (row) {
        const seed = findSeedExpert(slug);
        return {
          id: row.id,
          slug: row.slug,
          nom: row.nom,
          intent: row.intent,
          role: row.role,
          univers: row.univers,
          universLabel: UNIVERS_LABEL[row.univers] ?? row.univers,
          format: row.format,
          bio: row.bio,
          photoUrl: row.photoUrl,
          timezone: row.timezone,
          status: row.status,
          availabilityRules: row.availabilityRules,
          services: row.services,
          pageBody: seed?.pageBody,
          isSeed: false,
          bookingEnabled: Boolean(row.googleRefreshTokenEnc) && row.status === "active",
        };
      }
    } catch (e) {
      console.error("[experts.getBySlug] db error, falling back", e);
    }
  }
  const seed = findSeedExpert(slug);
  if (!seed) return null;
  return {
    slug: seed.slug,
    nom: seed.nom,
    intent: seed.intent,
    role: seed.role,
    univers: seed.univers,
    universLabel: seed.universLabel,
    format: seed.format,
    bio: seed.bio,
    photoUrl: null,
    timezone: seed.timezone,
    status: seed.status,
    availabilityRules: seed.availabilityRules,
    services: seed.services,
    pageBody: seed.pageBody,
    isSeed: true,
    bookingEnabled: false,
  };
}

export async function listActiveExperts(): Promise<PublicExpert[]> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.query.experts.findMany({
        where: eq(schema.experts.status, "active"),
        orderBy: asc(schema.experts.nom),
      });
      if (rows.length) {
        return rows.map((row) => ({
          id: row.id,
          slug: row.slug,
          nom: row.nom,
          intent: row.intent,
          role: row.role,
          univers: row.univers,
          universLabel: UNIVERS_LABEL[row.univers] ?? row.univers,
          format: row.format,
          bio: row.bio,
          photoUrl: row.photoUrl,
          timezone: row.timezone,
          status: row.status,
          availabilityRules: row.availabilityRules,
          services: row.services,
          isSeed: false,
          bookingEnabled: Boolean(row.googleRefreshTokenEnc),
        }));
      }
    } catch (e) {
      console.error("[experts.listActive] db error, falling back", e);
    }
  }
  return SEED_EXPERTS.map((seed) => ({
    slug: seed.slug,
    nom: seed.nom,
    intent: seed.intent,
    role: seed.role,
    univers: seed.univers,
    universLabel: seed.universLabel,
    format: seed.format,
    bio: seed.bio,
    photoUrl: null,
    timezone: seed.timezone,
    status: seed.status,
    availabilityRules: seed.availabilityRules,
    services: seed.services,
    pageBody: seed.pageBody,
    isSeed: true,
    bookingEnabled: false,
  }));
}
