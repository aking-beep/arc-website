// ---------------------------------------------------------------------------
// Site-level values the redesigned routes share.
//
// Reconstructs the Magic Patterns `data/site` module, which the upload omitted.
// Contact details, links and the domain come from `site` in lib/content.ts so
// there is still one place to change them.
// ---------------------------------------------------------------------------

import { site } from "@/lib/content";

export const arcSite = {
  ...site,
  /**
   * The one-paragraph answer to "what is this company". Used in the footer,
   * the About hero and the Organization JSON-LD.
   */
  positioning:
    "ARC builds the controls that let AI agents act on production systems safely, modernizes the infrastructure they depend on, and turns emerging technology into products people actually use.",
  /** Shorter form, for metadata and social cards. */
  metaDescription:
    "ARC builds practical AI systems and reliable infrastructure: agent authorization and auditable execution, free developer tools, and senior-led delivery.",
};

export type ArcNavItem = { href: string; label: string };

/**
 * Primary navigation. The brief's recommended structure mapped onto routes
 * that already exist and rank. Home is the wordmark; Contact is the CTA and
 * also appears in the mobile panel and the footer.
 */
export const arcNav: ArcNavItem[] = [
  { href: "/services", label: "Solutions" },
  { href: "/control", label: "ARC Control" },
  { href: "/labs", label: "ARC Labs" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

/**
 * Footer columns. These deliberately carry the routes the header no longer
 * links, so no existing page loses its internal link path in the redesign.
 */
export const arcFooterColumns: { heading: string; links: ArcNavItem[] }[] = [
  {
    heading: "Divisions",
    links: [
      { href: "/control", label: "ARC Control" },
      { href: "/labs", label: "ARC Labs" },
      { href: "/platform", label: "Agent infrastructure" },
      { href: "/developers", label: "For developers" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { href: "/services", label: "All solutions" },
      { href: "/advisory", label: "Engagements" },
      { href: "/agent-readiness", label: "Agent Readiness" },
      { href: "/ai-fit", label: "AI Fit" },
      { href: "/academy", label: "Workshops" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About ARC" },
      { href: "/research", label: "Research and insights" },
      { href: "/work", label: "Selected work" },
      { href: "/playbook", label: "Playbooks" },
      { href: "/contact", label: "Talk to ARC" },
    ],
  },
];

export const arcLegalLinks: ArcNavItem[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
