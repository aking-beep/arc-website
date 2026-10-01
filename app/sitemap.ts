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
import { playbooks } from "@/lib/learn";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, "");
  const routes = [
    "",
    ...nav.map((n) => n.href.split("#")[0]),
    ...secondaryRoutes,
    ...arkProducts.map((p) => `/${p.slug}`),
    ...playbooks.map((p) => `/playbooks/${p.slug}`),
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
