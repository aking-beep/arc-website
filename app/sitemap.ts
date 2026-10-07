import type { MetadataRoute } from "next";
import {
  academy,
  advisoryEngagements,
  caseStudies,
  labs,
  nav,
  research,
  secondaryRoutes,
  site,
} from "@/lib/content";
import { arkProducts } from "@/lib/ark";
import { playbookHref, playbooks } from "@/lib/learn";
import { playbookTierHref, playbookTiers } from "@/lib/playbook";
import { serviceAreas } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, "");
  const routes = [
    "",
    ...nav.flatMap((n) => [
      n.href.split("#")[0],
      ...(n.children ?? []).map((c) => c.href.split("#")[0]),
    ]),
    ...secondaryRoutes,
    ...serviceAreas.map((a) => `/services/${a.slug}`),
    ...arkProducts.map((p) => `/${p.slug}`),
    ...playbooks.map(playbookHref),
    ...playbookTiers.map((tier) => playbookTierHref(tier.slug)),
    ...advisoryEngagements.map((o) => `/advisory/${o.slug}`),
    ...labs.map((p) => `/labs/${p.slug}`),
    ...research.map((a) => `/research/${a.slug}`),
    ...academy.map((w) => `/academy/${w.slug}`),
    ...caseStudies.map((c) => `/work/${c.slug}`),
  ];
  return Array.from(new Set(routes)).map((href) => ({
    url: `${base}${href}`,
    lastModified: new Date(),
  }));
}
