// ---------------------------------------------------------------------------
// ARC Labs products, for the redesigned /labs page.
//
// Reconstructs the Magic Patterns `data/products` module, which the upload
// omitted — but reads from `labs` in lib/content.ts rather than restating the
// catalogue. Names, descriptions, maturities and every URL stay in one place,
// so a tool cannot show one status on /labs and another on /labs/[slug].
//
// The prototype shipped its own `Status` union. We use the repository's
// `Maturity` instead (see docs/MAGIC_PATTERNS_AUDIT.md §4.2): it is the more
// conservative taxonomy and it is already what /labs/[slug] renders.
// ---------------------------------------------------------------------------

import { labs, type Maturity, type Product } from "@/lib/content";

/** Which interactive preview a featured card renders. */
export type PreviewKind = "mcp" | "prompt" | "connectivity" | "aifit";

export type LabCategory = "ai-dev" | "security" | "architecture" | "cost" | "operations";

export const categories: { id: LabCategory; label: string }[] = [
  { id: "ai-dev", label: "AI engineering" },
  { id: "security", label: "Security and infrastructure" },
  { id: "architecture", label: "Architecture and planning" },
  { id: "cost", label: "Cost control" },
  { id: "operations", label: "Operations and journeys" },
];

/** Mirrors `labGroups` in lib/content.ts. */
const categoryBySlug: Record<string, LabCategory> = {
  "mcp-conformance-scanner": "ai-dev",
  "prompt-reviewer": "ai-dev",
  "arc-agent-governance": "ai-dev",
  "connectivity-scanner": "security",
  "arc-ai-security-scanner": "security",
  "arc-stack-advisor": "architecture",
  tokenloop: "cost",
  "arc-journey-scanner": "operations",
  "arc-workflow-scanner": "operations",
};

/**
 * The four tools that get a full card with a working preview. These are the
 * three open-source scanners plus the AI-fit advisor, which is the tool the
 * brief calls "AI Fit" — `arc-stack-advisor` and the AI Fit product page point
 * at the same deployment.
 */
const previewBySlug: Record<string, PreviewKind> = {
  "mcp-conformance-scanner": "mcp",
  "prompt-reviewer": "prompt",
  "connectivity-scanner": "connectivity",
  "arc-stack-advisor": "aifit",
};

export type LabProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  maturity: Maturity;
  category: LabCategory;
  /** Who it is for. Shown on the card so a visitor can self-select out. */
  audience: string;
  preview?: PreviewKind;
  app?: string;
  github?: string;
  docs?: string;
  /** The detail page that already exists in this repository. */
  href: string;
};

function toLabProduct(p: Product): LabProduct {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    maturity: p.maturity,
    category: categoryBySlug[p.slug] ?? "ai-dev",
    audience: p.audience,
    preview: previewBySlug[p.slug],
    app: p.links.app,
    github: p.links.github,
    docs: p.links.docs,
    href: `/labs/${p.slug}`,
  };
}

export const labProducts: LabProduct[] = labs.map(toLabProduct);

/** Cards with a preview, in the order the brief lists them. */
export const featuredLabProducts: LabProduct[] = [
  "mcp-conformance-scanner",
  "prompt-reviewer",
  "connectivity-scanner",
  "arc-stack-advisor",
]
  .map((slug) => labProducts.find((p) => p.slug === slug))
  .filter((p): p is LabProduct => Boolean(p));

/** Everything else, as the "Also in the lab" table. */
export const moreLabProducts: LabProduct[] = labProducts.filter(
  (p) => !featuredLabProducts.some((f) => f.slug === p.slug),
);

/** The four shown in the homepage "From ARC Labs" panel. */
export const homepageLabProducts: LabProduct[] = featuredLabProducts;

export const labCounts = {
  total: labProducts.length,
  openSource: labProducts.filter((p) => p.maturity === "open-source").length,
  earlyStage: labProducts.filter(
    (p) => p.maturity === "alpha" || p.maturity === "experiment",
  ).length,
};

/**
 * Tools that used to live in Labs and now ship inside the Ship playbook.
 * `next.config.mjs` redirects their old Labs URLs here, so saying where they
 * went is more useful than pretending they were never published.
 */
export const retiredIntoPlaybook = {
  href: "/playbook/ship",
  names: ["ARC Skills", "Reference Architectures", "AI Workflow Templates"],
  note: "The skills, reference-architecture and workflow-template libraries are no longer standalone lab tools. They ship inside the Ship playbook.",
};

export function categoryLabel(id: LabCategory): string {
  return categories.find((c) => c.id === id)?.label ?? "ARC Labs";
}
