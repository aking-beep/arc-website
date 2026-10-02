import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const base = site.domain.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Tokenised and transaction-scoped URLs. These carry noindex headers
      // too; this stops a crawler fetching them at all, which matters because
      // a fetch is what would burn a download against the buyer's limit.
      disallow: ["/playbook/download/", "/playbook/success", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
