// ---------------------------------------------------------------------------
// What ARC actually ships today, with the prices it actually charges.
//
// WHY THIS EXISTS
//
// On 5 November 2026 the marketing site was roughly two months behind the
// build (docs/WEDGE-AND-PRODUCTS-2026-11.md). Fit Teams had shipped on
// 2 November with workspaces and a billing portal, and the site still sent
// buyers to a contact form for "a three-to-four week assessment run by ARC".
// Work that is already done was earning nothing.
//
// EVERY FACT BELOW IS CHECKED, NOT WRITTEN FROM MEMORY
//
//   Plans      aifit-engine, apps/teams/src/design/config.ts (generated from
//              packages/design). These are the live plan objects every pricing
//              surface in that app reads.
//   Domains    Vercel project domains, verified, production target.
//   Access     passwordProtection and ssoProtection both disabled on the
//              projects, so these URLs are reachable without a Vercel login.
//
// One check could NOT be run from the build sandbox: an anonymous HTTPS fetch
// of each URL. The agent proxy denies those hosts (HTTP 000 / CONNECT 403),
// and the Vercel fetch tool deliberately bypasses deployment protection, so a
// 200 from it would not prove public access. Protection being disabled is
// strong evidence, not a live check. Open one in a private window before a
// campaign points spend at it.
//
// A NAMING COLLISION, DELIBERATELY NOT RESOLVED HERE
//
// `lib/ark.ts` already describes products called "AI Fit" and "AI Fit Teams",
// and they are NOT the products below:
//
//   Site "AI Fit"        an architecture decision tool
//   Repo "Fit"           a five-minute personal quiz about how you use AI
//   Site "AI Fit Teams"  an organisational readiness assessment
//   Repo "Fit Teams"     a single-workload estimator with a cost model
//
// Same names, different products. Rewriting one to match the other would have
// published a false description of whichever lost. The collision is named in
// the audit doc and is a decision for ARC, so this module uses the repository's
// own public naming ("Fit") and leaves lib/ark.ts alone.
// ---------------------------------------------------------------------------

export type ShippedPlan = {
  name: string;
  /** Formatted for display. Source of truth is the app's own config. */
  price: string;
  cadence: "month" | "one-time";
  tagline: string;
  features: string[];
  limits?: string;
};

export type ShippedProduct = {
  slug: string;
  name: string;
  tagline: string;
  /** What it does, in the buyer's terms. */
  summary: string;
  url: string;
  plans: ShippedPlan[];
  /** Said plainly, because the site's credibility rests on it. */
  note?: string;
};

export const shippedProducts: ShippedProduct[] = [
  {
    slug: "fit-teams",
    name: "Fit Teams",
    tagline: "A defensible verdict on one workload, including 'do not use AI'.",
    summary:
      "Describe one workload and get a verdict after the first section, then the architecture, the controls, an evaluation plan, a cost model and a roadmap. Every figure is labelled with where it came from, and the engine is allowed to answer that the workload is not an AI problem.",
    url: "https://ark-ai-fit-teams.vercel.app",
    plans: [
      {
        name: "Assessment",
        price: "$149",
        cadence: "one-time",
        tagline: "A defensible verdict for one workload.",
        features: [
          "Cost model and ROI for one workload",
          "Risk register you can edit",
          "Security and governance requirements",
          "Printable report",
        ],
      },
      {
        name: "Blueprint",
        price: "$399",
        cadence: "one-time",
        tagline: "From verdict to an implementation-ready plan.",
        features: [
          "Everything in Assessment",
          "Architecture, models and infrastructure",
          "Evaluation plan and roadmap",
          "Technical blueprint (Markdown, JSON)",
        ],
      },
      {
        name: "Workspace",
        price: "$199",
        cadence: "month",
        tagline: "Your whole AI portfolio, continuously assessed.",
        features: [
          "Blueprint level for every workload",
          "Unlimited workloads and versions",
          "Team roles and audit log",
          "Governance export for ARC Control",
        ],
        limits: "Up to 25 members",
      },
    ],
  },
  {
    slug: "fit",
    name: "Fit",
    tagline: "A five-minute quiz that tells you how you work with AI.",
    summary:
      "For a person rather than a company. It scores what you ask, how you steer and how much evidence you demand, then names the tools that suit that and writes the setup files for them. A model never picks the winner; the ranking is dated registries and weights.",
    url: "https://ark-ai-fit.vercel.app",
    plans: [
      {
        name: "Free",
        price: "$0",
        cadence: "month",
        tagline: "Find your fit and set up one tool.",
        features: [
          "Five-minute assessment",
          "3 tool recommendations",
          "1 configuration package",
          "Assessment history (30 days)",
        ],
      },
      {
        name: "Pro",
        price: "$12",
        cadence: "month",
        tagline: "Every recommendation, every config, kept current.",
        features: [
          "Unlimited recommendations and comparisons",
          "Unlimited configuration packages",
          "Workflow builder",
          "Re-assess when tools change",
          "Full history and exports",
        ],
      },
    ],
    note: "Fit is a separate product with its own audience. It does not feed Fit Teams, and nothing in Fit Teams links to it.",
  },
];

export function getShippedProduct(slug: string): ShippedProduct | undefined {
  return shippedProducts.find((p) => p.slug === slug);
}
