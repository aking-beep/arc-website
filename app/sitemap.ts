import type { MetadataRoute } from "next";
import { site, nav, labs, research, caseStudies, academy } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain.replace(/\/$/, "");
  const staticRoutes = [
    "",
    ...nav.map((n) => n.href),
    "/work",
    "/privacy",
    "/terms",
  ].map((href) => ({
    url: `${base}${href}`,
    lastModified: new Date(),
  }));
  const labsRoutes = labs.map((p) => ({
    url: `${base}/labs/${p.slug}`,
    lastModified: new Date(),
  }));
  const researchRoutes = research.map((a) => ({
    url: `${base}/research/${a.slug}`,
    lastModified: new Date(),
  }));
  const academyRoutes = academy.map((w) => ({
    url: `${base}/academy/${w.slug}`,
    lastModified: new Date(),
  }));
  const workRoutes = caseStudies.map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: new Date(),
  }));
  return [
    ...staticRoutes,
    ...labsRoutes,
    ...researchRoutes,
    ...academyRoutes,
    ...workRoutes,
  ];
}
