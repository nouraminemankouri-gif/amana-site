import type { MetadataRoute } from "next";
import { listActiveExperts } from "@/lib/experts";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const staticRoutes = [
    "",
    "/notre-vision",
    "/univers",
    "/univers/khayr",
    "/univers/ilm",
    "/univers/afiyah",
    "/annuaire",
    "/un-frere-une-soeur",
    "/la-revivification-du-coeur",
    "/amana-lightness",
    "/charte-ethique",
    "/contact",
  ];
  const experts = await listActiveExperts().catch(() => []);
  const proRoutes = experts.map((e) => `/pro/${e.slug}`);
  const all = [...staticRoutes, ...proRoutes];
  return all.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
