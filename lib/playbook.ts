// ============================================================================
// ARC AI Product Playbook — the commercial product.
//
// One source of truth for the landing page, the PDF build and the fulfillment
// email, so a price or a module name can never disagree across surfaces.
//
// Rule for this file: it describes the product, never the payment setup. Price
// and product identifiers for the payment provider come from the environment
// (see lib/paddle.ts). Nothing here is a Paddle ID.
// ============================================================================

export const playbookProduct = {
  slug: "ark-ai-product-playbook",
  name: "ARC AI Product Playbook",
  subtitle: "From Idea to Shipped Product",
  /** Display price. The charge itself is defined by the Paddle price ID. */
  price: "$5",
  priceAmount: 5,
  currency: "USD",
  priceNote: "one-off, no subscription",
  format: "PDF + editable implementation assets (ZIP)",
  publisher: "ARC Transformation Group",
  imprint: "ARK Labs",
} as const;

// ---------------------------------------------------------------------------
// Hero and problem framing.
// ---------------------------------------------------------------------------
export const playbookHero = {
  kicker: "ARC AI Product Playbook",
  title: "Go from an AI idea to a product people can actually use.",
  lead: "A practical system for defining, designing, architecting, building, evaluating, and launching AI products.",
  ctaLabel: "Get the Playbook",
  secondaryCtaLabel: "Preview what's inside",
  /** Sits next to the price. The charge is still the Paddle price, not this label. */
  priceLabel: "Launch price",
  microcopy:
    "One-time purchase. Instant digital access. A PDF plus the editable files you build with.",
};

/**
 * Fifteen decisions, in the order that keeps the next one cheap. This is the
 * sequence on the product page. Cards elsewhere use the five passes below,
 * because fifteen pills do not fit on a card.
 */
export const playbookRoadmap = [
  {
    name: "Idea",
    text: "Write the change you want in one sentence, and the assumption that would kill it.",
  },
  {
    name: "Problem",
    text: "Name what people do today, how often it hurts, and what they already spend to avoid it.",
  },
  {
    name: "User",
    text: "One person who has the problem strongly enough to change how they work.",
  },
  {
    name: "Product",
    text: "The smallest version that finishes the job and produces evidence. A demo is not that.",
  },
  {
    name: "AI fit",
    text: "Where a model earns its place, and where ordinary software is clearer, cheaper, or safer.",
  },
  {
    name: "Workflow",
    text: "The one path a user walks, from the trigger to a result someone can check.",
  },
  {
    name: "Architecture",
    text: "The shape of the system, with the boundary around anything a model can get wrong.",
  },
  {
    name: "Context",
    text: "The data the product needs, where it comes from, and what it is allowed to see.",
  },
  {
    name: "Skills",
    text: "The repeated jobs, written once, so the next build does not start from a blank prompt.",
  },
  {
    name: "Agents",
    text: "Where a tool-using agent is warranted, and where a person stays on the action.",
  },
  {
    name: "Security",
    text: "What must not leak, who can act, and how a bad run gets stopped.",
  },
  {
    name: "Evaluation",
    text: "The cases you will grade, the pass line, and the failures you have not accepted.",
  },
  {
    name: "Build",
    text: "An order of work with something you can show at the end of each slice.",
  },
  {
    name: "Launch",
    text: "How it reaches people, what you measure, and the gate that says it is ready.",
  },
  {
    name: "Improve",
    text: "What changes after real use: cost, quality, the workflow, and what you stop doing.",
  },
] as const;

/** The five passes the book is worked in. Short enough for a card. */
export const playbookSystemChain = ["Define", "Design", "Build", "Prove", "Learn"] as const;

// ---------------------------------------------------------------------------
// What is in the bundle.
//
// All of it is content the buyer gets in the download: the three libraries are
// printed in full in the PDF appendices and shipped as editable files in the
// ZIP. Where ARC publishes a catalog elsewhere is a distribution decision and
// not something a buyer of this product has to think about, so the page does
// not raise it.
// ---------------------------------------------------------------------------
export type BundleItem = {
  id: string;
  name: string;
  count?: string;
  format: string;
  text: string;
};

export const playbookBundle: BundleItem[] = [
  {
    id: "skills",
    name: "ARC Skills",
    count: "20 skills",
    format: "PDF + SKILL.md",
    text: "Repeated jobs written as skills: the trigger, the steps, and the guardrails. Drop them into Cursor or Claude instead of re-prompting the same work.",
  },
  {
    id: "architectures",
    name: "Reference Architectures",
    count: "20 blueprints",
    format: "PDF + Markdown",
    text: "System shapes from delivery work. Each one names the problem, the components, the decisions, the failure modes, and when not to use it.",
  },
  {
    id: "workflows",
    name: "AI Workflow Templates",
    count: "16 workflows",
    format: "PDF + Markdown",
    text: "End-to-end workflows with the prompt, the tools, the input schema, and the point where a person stays in the loop.",
  },
  {
    id: "product",
    name: "Product templates",
    count: "Brief, PRD, MVP",
    format: "Fillable Markdown",
    text: "The product brief, the PRD, and the MVP boundary: what must ship, what waits, and the one workflow the first version has to finish.",
  },
  {
    id: "evaluation",
    name: "Evaluation frameworks",
    format: "Fillable Markdown",
    text: "How you grade the system before you launch it: the cases, the pass line, and the failures you have not accepted.",
  },
  {
    id: "security",
    name: "Security checklists",
    format: "Fillable Markdown",
    text: "Privacy, permissions, and what a bad run is allowed to touch. Worked before the build, not after an incident.",
  },
  {
    id: "launch",
    name: "Launch checklists",
    format: "Fillable Markdown",
    text: "The gate between a finished build and a product someone else depends on, including what you will measure on day one.",
  },
  {
    id: "updates",
    name: "Updates to this edition",
    format: "Same download link",
    text: "Buyers of this edition get later 1.x files through the same private link. A new edition would be a separate purchase.",
  },
];

/** Short list used on the product page, the download page, and the email. */
export const playbookIncludes = [
  "The complete AI Product Playbook",
  "20 ARC Skills",
  "20 reference architectures",
  "16 AI workflow templates",
  "AI product brief and PRD",
  "AI fit assessment",
  "Architecture decision framework",
  "Evaluation framework",
  "Security checklist",
  "Production readiness checklist",
  "Launch checklist",
  "Updates to this edition",
];

// ---------------------------------------------------------------------------
// Public preview. The paid PDF and ZIP are not in this repository.
// ---------------------------------------------------------------------------
export const playbookPreviewPdf = "/playbook/preview.pdf";

export const playbookShots = [
  {
    src: "/playbook/cover.png",
    alt: "Cover of the ARC AI Product Playbook, titled From Idea to Shipped Product",
    caption: "The cover",
  },
  {
    src: "/playbook/preview-images/how-to-use.png",
    alt: "A page titled How to use this playbook, with five passes from Define to Learn",
    caption: "How you work through it",
  },
  {
    src: "/playbook/preview-images/contents.png",
    alt: "Table of contents for the ARC product system, from defining the outcome through the 30-day build sprint",
    caption: "The contents",
  },
  {
    src: "/playbook/preview-images/product-brief.png",
    alt: "Chapter one, a five-line product brief with fields for user, situation, pain, outcome, and evidence",
    caption: "The five-line brief",
  },
] as const;

// ---------------------------------------------------------------------------
// Audience and FAQ.
// ---------------------------------------------------------------------------
export const playbookAudience = {
  forYou: [
    "Founders building a first AI product and deciding what should exist",
    "Product and program leads moving a prototype toward something a customer can rely on",
    "Operators automating a workflow and needing to know where a person stays in it",
    "Technical leads choosing an architecture, and where an agent is the wrong shape",
    "Builders in Cursor, Claude Code, or Codex who need the product decisions around the code",
  ],
  notForYou: [
    "Anyone looking for prompts to paste without making the decisions",
    "Readers who want a video course and a certificate",
    "Teams shopping for a model comparison or a vendor shortlist",
  ],
};

export const playbookFaqs = [
  {
    q: "What exactly do I get, and in what format?",
    a: "A PDF of the Playbook plus a ZIP of editable files: 20 ARC Skills, 20 reference architectures, 16 workflow templates, and the product, evaluation, security, and launch worksheets. No login and no subscription.",
  },
  {
    q: "Is this a course?",
    a: "No. There are no videos and no certificate. It is a working document you fill in while you build, which is why the worksheets ship as editable Markdown as well as print pages.",
  },
  {
    q: "Are the three libraries summaries, or the full documents?",
    a: "The full documents. All 56 entries are printed in the PDF and shipped again as editable files: every skill with its trigger, steps and guardrails, every architecture with its decisions and when not to use it, every workflow with its prompt, tools, schema and the point where a person stays in the loop.",
  },
  {
    q: "Will it be out of date in six months?",
    a: "The model names will be. The sequence will not. The Playbook deliberately avoids naming specific models and vendors in the method itself, and you get free updates to this edition.",
  },
  {
    q: "Do I need an account?",
    a: "No. You buy it, we email you a private download link, and the link works on more than one device. There is nothing to log into.",
  },
  {
    q: "Can I use this with my team?",
    a: "Yes, for one team. If you want it as internal training material across a larger organisation, email us and we will sort out a licence rather than have you buy twelve copies.",
  },
  {
    q: "What if it is not useful?",
    a: "Email us within 30 days and we refund it. We would rather return the $5 than have a product with a reputation for wasting people's time.",
  },
  {
    q: "Do you also do this work for people?",
    a: "Yes. The Playbook is the method; ARC Advisory is the method applied to your specific product by the people who wrote it.",
  },
];

export const playbookBuildLine = {
  title: "Don't just read the framework. Build with it.",
  lead: "The PDF is the sequence. The download is the files you fill in and drop into the tools you already use.",
};

export const playbookClosing = {
  title: "Build the system, not just the demo.",
  lead: "A clear workflow, an architecture you can defend, a way to tell whether it works, and a launch plan.",
};
