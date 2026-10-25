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
  /** Where this sits in the method. */
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
    part: "Modules 01–03",
    summary:
      "The one-sentence claim, the evidence that would change your mind, and the single workflow the first version has to finish.",
    outcome:
      "A hypothesis, a go-or-stop threshold written before you look, and an exclusions list for the first version.",
    includes: [
      "Module 01, Idea: the hypothesis and the assumption that would kill the product",
      "Module 02, Validation: the threshold, the conversations, and the cost of the alternative",
      "Module 03, Product: one workflow, and what the first version leaves out",
      "Worksheets 1–6, from the product hypothesis through the MVP exclusions",
      "Updates to this edition",
    ],
    chapters: [
      {
        name: "01 · Idea",
        text: "A sentence with a specific person, a specific problem, a specific outcome, and what they do today.",
      },
      {
        name: "02 · Validation",
        text: "A threshold set before the conversations, and evidence you could point at.",
      },
      {
        name: "03 · Product",
        text: "One workflow from trigger to result, and the list of what version one leaves out.",
      },
    ],
    pdfBlurb: "Modules 01 to 03, print-ready: Idea, Validation, and Product, with worksheets 1 to 6.",
    zipBlurb: "Worksheets 1 to 6 as editable Markdown.",
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
    format: "PDF + editable worksheets",
    part: "Modules 04, 05, and 07",
    summary:
      "Where the model sits in the system, the order you build in, and the security, privacy, and cost checks before anyone relies on it.",
    outcome:
      "A one-page diagram with the model boundary marked, a build sequence that starts at the largest unknown, and a production checklist with a yes or a ticket on each line.",
    includes: [
      "Module 04, Architecture: the parts, the model boundary, and the trade-offs you accepted",
      "Module 05, Build: the build order, and the decisions that stay with you",
      "Module 07, Production readiness: security, privacy, monitoring, and cost per user",
      "Worksheets 7, 8, and 10: the architecture record, the build sequence, and the production checklist",
      "Updates to this edition",
    ],
    chapters: [
      {
        name: "04 · Architecture",
        text: "A one-page diagram, with a line around everything whose output is probabilistic.",
      },
      {
        name: "05 · Build",
        text: "One vertical slice through the riskiest part first, then a definition of done for each slice.",
      },
      {
        name: "07 · Production readiness",
        text: "Security, privacy, monitoring, and what a user costs you to run.",
      },
    ],
    pdfBlurb:
      "Modules 04, 05, and 07, print-ready: Architecture, Build, and Production readiness, with worksheets 7, 8, and 10.",
    zipBlurb: "Worksheets 7, 8, and 10 as editable Markdown.",
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
    part: "Modules 06 and 08, plus the libraries",
    summary:
      "The numbers that mean working, the one channel you will keep using, and the skills, architectures, and workflow files you adapt.",
    outcome:
      "An evaluation set with a pass line chosen before you measure, a launch plan with one channel and two numbers, and the library files.",
    includes: [
      "Module 06, Evaluation: the cases, the pass line, and the failures you have accepted",
      "Module 08, Launch: one channel, a price, and the two numbers that decide whether you continue",
      "Worksheets 9 and 11: the evaluation plan and the launch plan",
      "20 ARC Skills, printed and as SKILL.md files",
      "20 reference architectures, with the scenario and diagram files",
      "16 AI workflow templates",
      "Updates to this edition",
    ],
    chapters: [
      {
        name: "06 · Evaluation",
        text: "A set built from real inputs, a way to judge each output, and a pass line chosen before you measure.",
      },
      {
        name: "08 · Launch",
        text: "One channel you can sustain, a price tied to the alternative's cost, and two numbers that decide whether you continue.",
      },
      {
        name: "Libraries",
        text: "20 skills, 20 reference architectures, and 16 workflow templates, printed in full and included again as editable files.",
      },
    ],
    pdfBlurb:
      "Modules 06 and 08, print-ready, plus the skills, architectures, and workflow libraries, with worksheets 9 and 11.",
    zipBlurb:
      "20 skills, 20 architectures, 16 workflow templates, and worksheets 9 and 11 as editable files.",
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
  lead: "Define is modules 01 to 03: whether the product should exist, and what the first version leaves out. Build is the system, the build order, and production readiness. Ship is evaluation, launch, and the skills, architectures, and workflow files. Each one is its own PDF.",
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
    a: "Define, if you have not written the hypothesis and the line that means stop. Build, if that is settled and you are drawing the system and the build order. Ship, if you are grading, launching, or you want the skills, architectures, and workflow files.",
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
    a: "In Ship. That download prints the libraries in full and includes the same files in the ZIP: 20 skills, 20 reference architectures, and 16 workflow templates. Define and Build do not include them.",
  },
  {
    q: "Can I read it before I pay?",
    a: "No. The playbook is a paid file. Payment emails a private download link. There is no public copy.",
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
    a: "Yes, for one team. If you want a playbook as internal training material across a larger organisation, get in touch and we will sort out a licence rather than have you buy twelve copies.",
  },
  {
    q: "What if it is not useful?",
    a: "Ask us within 30 days and we refund the playbook you bought.",
  },
  {
    q: "Do you also do this work for people?",
    a: "Yes. The playbooks are the method written down. ARC Advisory is the same method applied to your product by the people who wrote it.",
  },
];

/** Cover only. The manuscript pages are not published. */
export const playbookCover = {
  src: "/playbook/cover.png",
  alt: "Cover of the Define playbook, titled Should this product exist",
  caption: "The Define cover. The file is a paid download.",
} as const;
