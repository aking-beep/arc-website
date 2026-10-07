// ============================================================================
// ARC Playbooks — three separate products.
//
// Define, Build, and Ship are slices of the same product system, sold on
// their own. Buying one does not include the others. This file describes the
// products. Price identifiers for the payment provider come from the
// environment (see lib/commerce/config.ts). Nothing here is a Paddle ID.
// ============================================================================

export const playbookSlugs = ["define", "build", "ship"] as const;

export type PlaybookSlug = (typeof playbookSlugs)[number];

/** Env var names. The values are never in this file. */
export const playbookPriceEnv: Record<PlaybookSlug, string> = {
  define: "PLAYBOOK_DEFINE_PADDLE_PRICE_ID",
  build: "PLAYBOOK_BUILD_PADDLE_PRICE_ID",
  ship: "PLAYBOOK_SHIP_PADDLE_PRICE_ID",
};

export const playbookPdfEnv: Record<PlaybookSlug, string> = {
  define: "PLAYBOOK_DEFINE_PDF_OBJECT",
  build: "PLAYBOOK_BUILD_PDF_OBJECT",
  ship: "PLAYBOOK_SHIP_PDF_OBJECT",
};

export const playbookZipEnv: Record<PlaybookSlug, string> = {
  define: "PLAYBOOK_DEFINE_ZIP_OBJECT",
  build: "PLAYBOOK_BUILD_ZIP_OBJECT",
  ship: "PLAYBOOK_SHIP_ZIP_OBJECT",
};

export const playbookPublisher = "ARC Transformation Group";

export type PlaybookTier = {
  slug: PlaybookSlug;
  /** Short name used as the product title. */
  name: string;
  /** Name on the receipt, the email, and the schema. */
  productName: string;
  subtitle: string;
  price: string;
  priceAmount: number;
  currency: "USD";
  priceNote: string;
  format: string;
  /** Where this sits in the book. */
  part: string;
  summary: string;
  /** What the buyer can point at after they finish it. */
  outcome: string;
  includes: readonly string[];
  chapters: readonly { name: string; text: string }[];
  pdfBlurb: string;
  zipBlurb: string;
};

export const playbookTiers: readonly PlaybookTier[] = [
  {
    slug: "define",
    name: "Define",
    productName: "ARC Playbook: Define",
    subtitle: "Should this product exist?",
    price: "$5",
    priceAmount: 5,
    currency: "USD",
    priceNote: "one-off, no subscription",
    format: "PDF + editable worksheets",
    part: "Part I · chapters 01–04",
    summary:
      "Who has the problem, what would count as success, the smallest version that can finish the job, and the one workflow that version has to complete.",
    outcome:
      "A product brief, a validation record, an MVP boundary, and a workflow someone else could follow.",
    includes: [
      "Chapter 01, the five-line product brief",
      "Chapter 02, the evidence ladder and five validation questions",
      "Chapter 03, the MVP boundary",
      "Chapter 04, the user workflow",
      "Editable brief, validation notes, and MVP worksheet",
      "Updates to this edition",
    ],
    chapters: [
      {
        name: "01 · Outcome",
        text: "User, situation, pain, outcome, and the evidence that would prove the product worked.",
      },
      {
        name: "02 · Validation",
        text: "What people do today, how often it hurts, and what they already spend to avoid it.",
      },
      {
        name: "03 · Product and MVP",
        text: "The smallest version that finishes the job and produces evidence. A demo is not that.",
      },
      {
        name: "04 · Workflow",
        text: "The one path a user walks, from the trigger to a result someone can check.",
      },
    ],
    pdfBlurb:
      "Part I, print-ready: the outcome, the validation, the MVP boundary, and the workflow.",
    zipBlurb: "The product brief, the validation notes, and the MVP worksheet as editable Markdown.",
  },
  {
    slug: "build",
    name: "Build",
    productName: "ARC Playbook: Build",
    subtitle: "How should the system be built?",
    price: "$10",
    priceAmount: 10,
    currency: "USD",
    priceNote: "one-off, no subscription",
    format: "PDF + editable checklists",
    part: "Part II · chapters 05–08",
    summary:
      "Where a model earns its place, the shape of the system, the data it is allowed to see, and the controls that stop a bad run.",
    outcome:
      "An architecture you can defend, a context boundary, and a security checklist filled in before the build.",
    includes: [
      "Chapter 05, choosing the AI pattern",
      "Chapter 06, the architecture and its failure boundary",
      "Chapter 07, the data and context layer",
      "Chapter 08, security, privacy, and governance",
      "Architecture decision framework",
      "Security checklist, as an editable file",
      "Updates to this edition",
    ],
    chapters: [
      {
        name: "05 · AI pattern",
        text: "Where a model earns its place, and where ordinary software is clearer, cheaper, or safer.",
      },
      {
        name: "06 · Architecture",
        text: "The shape of the system, with the boundary around anything a model can get wrong.",
      },
      {
        name: "07 · Data and context",
        text: "The data the product needs, where it comes from, and what it is allowed to see.",
      },
      {
        name: "08 · Security",
        text: "What must not leak, who can act, and how a bad run gets stopped.",
      },
    ],
    pdfBlurb:
      "Part II, print-ready: the AI pattern, the architecture, the context layer, and the security chapter.",
    zipBlurb: "The architecture decision framework and the security checklist as editable Markdown.",
  },
  {
    slug: "ship",
    name: "Ship",
    productName: "ARC Playbook: Ship",
    subtitle: "Does it work well enough to launch?",
    price: "$20",
    priceAmount: 20,
    currency: "USD",
    priceNote: "one-off, no subscription",
    format: "PDF + skills, architectures, workflows, and worksheets",
    part: "Parts III–V · chapters 09–16",
    summary:
      "How you grade it, how it reaches people, what you change after they use it, and the files you build with: 20 skills, 20 architectures, 16 workflows, and a 30-day sprint.",
    outcome:
      "An evaluation suite, a launch gate, and the implementation files in the tools you already use.",
    includes: [
      "Chapter 09, evaluations and quality",
      "Chapter 10, launch and instrumentation",
      "Chapter 11, operate and improve",
      "20 ARC Skills",
      "20 reference architectures",
      "16 AI workflow templates",
      "30-day build sprint",
      "Evaluation, launch, and operating worksheets",
      "Updates to this edition",
    ],
    chapters: [
      {
        name: "09 · Evaluation",
        text: "The cases you will grade, the pass line, and the failures you have not accepted.",
      },
      {
        name: "10 · Launch",
        text: "How it reaches people, what you measure, and the gate that says it is ready.",
      },
      {
        name: "11 · Operate",
        text: "What changes after real use: cost, quality, the workflow, and what you stop doing.",
      },
      {
        name: "12–16 · Files",
        text: "Skills, reference architectures, workflow templates, worksheets, and the 30-day sprint.",
      },
    ],
    pdfBlurb:
      "Parts III–V, print-ready: evaluation, launch, operations, and the skills, architectures, and workflow libraries.",
    zipBlurb:
      "20 skills, 20 architectures, 16 workflow templates, and the evaluation, launch, and operating worksheets as editable files.",
  },
];

export function getPlaybookTier(slug: string): PlaybookTier | undefined {
  return playbookTiers.find((tier) => tier.slug === slug);
}

export function playbookTierHref(slug: PlaybookSlug): string {
  return `/playbook/${slug}`;
}

export const playbookLanding = {
  kicker: "Playbooks",
  title: "Three playbooks. Buy the part of the work you are in.",
  lead: "Define is the decision of whether the product should exist. Build is the system around it. Ship is how you prove it, launch it, and the files you fill in. Each one is its own PDF and its own download.",
  rule: "Do not use AI where deterministic software is clearer, cheaper, faster, or safer.",
};

export const playbookAudience = {
  forYou: [
    "Founders deciding whether a first AI product should exist",
    "Product leads moving a prototype toward something a customer can rely on",
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
    q: "Are these three parts of one purchase?",
    a: "No. Define is $5, Build is $10, and Ship is $20. Each is a separate PDF and a separate set of files. Buying one does not include the others. All three together are $35, paid as three checkouts.",
  },
  {
    q: "Which one should I buy?",
    a: "Define, if you have not yet written who the product is for and what would count as success. Build, if that is settled and you are choosing the system. Ship, if you are grading, launching, or you want the skills, architectures, and workflow files.",
  },
  {
    q: "What format do I get?",
    a: "A PDF of that playbook and a ZIP of the editable files that belong to it. No login and no subscription. The email names the playbook you bought.",
  },
  {
    q: "Is this a course?",
    a: "No. There are no videos and no certificate. Each playbook is a working document you fill in while you build, which is why the worksheets ship as editable Markdown as well as print pages.",
  },
  {
    q: "Where are the skills, architectures, and workflows?",
    a: "In Ship. That download has all 20 skills, all 20 reference architectures, and all 16 workflow templates, printed in the PDF and again as editable files. Define and Build do not include them.",
  },
  {
    q: "Can I read some of it first?",
    a: "Yes. The free preview is the opening of Define: the cover, how the set is used, the contents, and the first chapters. Build and Ship are not in that preview.",
  },
  {
    q: "Will it be out of date in six months?",
    a: "The model names will be. The sequence will not. The playbooks avoid naming specific models and vendors in the method itself, and you get updates to the edition you bought through the same private link.",
  },
  {
    q: "Do I need an account?",
    a: "No. You buy a playbook, we email you a private download link, and the link works on more than one device. There is nothing to log into.",
  },
  {
    q: "Can I use this with my team?",
    a: "Yes, for one team. If you want a playbook as internal training material across a larger organisation, email us and we will sort out a licence rather than have you buy twelve copies.",
  },
  {
    q: "What if it is not useful?",
    a: "Email us within 30 days and we refund the playbook you bought.",
  },
  {
    q: "Do you also do this work for people?",
    a: "Yes. The playbooks are the method written down. ARC Advisory is the same method applied to your product by the people who wrote it.",
  },
];

export const playbookPreviewPdf = "/playbook/preview.pdf";

export const playbookShots = [
  {
    src: "/playbook/cover.png",
    alt: "Cover of the ARC product playbooks, titled From Idea to Shipped Product",
    caption: "The cover of the set",
  },
  {
    src: "/playbook/preview-images/how-to-use.png",
    alt: "A page titled How to use this playbook, with passes from Define through Learn",
    caption: "How you work through it",
  },
  {
    src: "/playbook/preview-images/contents.png",
    alt: "Table of contents: Part I Define, Part II Build the system, Parts III to V prove, ship, and the files",
    caption: "Where the three playbooks split",
  },
  {
    src: "/playbook/preview-images/product-brief.png",
    alt: "Chapter one of Define, a five-line product brief with fields for user, situation, pain, outcome, and evidence",
    caption: "The five-line brief, in Define",
  },
] as const;
