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
import { control } from "@/lib/arc/control";

/**
 * Routes that redirect rather than render. A redirecting URL in a sitemap is a
 * soft error in Search Console, so they are filtered out — the redirect in
 * next.config.mjs is what carries their ranking across.
 */
const REDIRECTED = new Set<string>([control.legacyPath]);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, "");
  const routes = [
    "",
    control.path,
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

  return Array.from(new Set(routes))
    .filter((href) => !REDIRECTED.has(href))
    .map((href) => ({
      url: `${base}${href}`,
      lastModified: new Date(),
    }));
}
