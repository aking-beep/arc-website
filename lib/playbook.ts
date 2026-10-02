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
  price: "$39",
  priceAmount: 39,
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
  title: "You built it with AI. Now make it real.",
  lead: "From idea to shipped product without guessing what comes next.",
  ctaLabel: "Get the Playbook",
  secondaryCtaLabel: "See what's inside",
};

export const playbookProblem = {
  kicker: "The gap",
  title: "Shipping code is not the same as shipping a product.",
  lead: "AI closed the distance between an idea and a working interface. It did not answer any of the questions that decide whether the thing survives contact with a real user.",
  openers: [
    "AI can generate an interface. It can write code. It can connect APIs. It can deploy an application.",
    "None of those things automatically make what you built a product.",
  ],
  questions: [
    "Who is this for?",
    "What problem are you solving?",
    "Will anyone pay for it?",
    "What belongs in the MVP?",
    "How should it be architected?",
    "What data does it need?",
    "What can go wrong?",
    "How will you evaluate the AI?",
    "How will you secure it?",
    "What should you measure?",
    "How do you launch it?",
  ],
  takeaway:
    "The Playbook is the sequence for answering those in an order that does not waste the work you already did.",
};

// ---------------------------------------------------------------------------
// The five-step ARC system. Each step owns a group of modules, so the system
// and the table of contents cannot drift apart.
// ---------------------------------------------------------------------------
export const playbookSystem = [
  {
    step: "01",
    name: "Validate",
    question: "Is this worth building at all?",
    text: "Turn the idea into a hypothesis with a named customer, a named problem and the evidence that would change your mind.",
    modules: ["Idea", "Validation"],
  },
  {
    step: "02",
    name: "Define",
    question: "What exactly are we building, and what are we not?",
    text: "Value proposition, the one workflow that matters, the requirements, and an explicit list of what the MVP excludes.",
    modules: ["Product"],
  },
  {
    step: "03",
    name: "Architect",
    question: "How will this hold up once it is real?",
    text: "Application shape, AI components, data, integrations, infrastructure and the build sequence that follows from them.",
    modules: ["Architecture", "Build"],
  },
  {
    step: "04",
    name: "Harden",
    question: "How do we know it works, and what happens when it does not?",
    text: "Evaluation criteria for the AI itself, then security, privacy, monitoring and the operational load you are taking on.",
    modules: ["Evaluation", "Production readiness"],
  },
  {
    step: "05",
    name: "Launch",
    question: "How does anyone find it, and how do we know it worked?",
    text: "Distribution, pricing, the measures that matter, and how you iterate once real users arrive.",
    modules: ["Launch"],
  },
];

export const playbookSystemChain = playbookSystem.map((s) => s.name);

// ---------------------------------------------------------------------------
// The eight modules. `outputs` is what the reader finishes the module holding,
// which is what the worksheets in the ZIP produce.
// ---------------------------------------------------------------------------
export const playbookModules = [
  {
    number: "01",
    name: "Idea",
    step: "Validate",
    text: "Turn a concept into a clear product hypothesis you can test rather than defend.",
    outputs: [
      "A one-sentence product hypothesis",
      "The riskiest assumption, written down",
      "The cheapest test that would disprove it",
    ],
  },
  {
    number: "02",
    name: "Validation",
    step: "Validate",
    text: "Define the customer, the problem, the alternatives, and the evidence you need before building.",
    outputs: [
      "A named customer and the job they are trying to do",
      "What they do today instead, and what it costs them",
      "A go / no-go threshold set before you look at the results",
    ],
  },
  {
    number: "03",
    name: "Product",
    step: "Define",
    text: "Define the value proposition, the workflow, the requirements, and what the MVP excludes.",
    outputs: [
      "The one workflow the MVP has to do well",
      "A requirements list separated into must, should and not yet",
      "An explicit exclusions list you can point at later",
    ],
  },
  {
    number: "04",
    name: "Architecture",
    step: "Architect",
    text: "Map the application, the AI components, data, integrations, infrastructure and security.",
    outputs: [
      "A component diagram with the AI boundary marked",
      "The data the product needs, and where it comes from",
      "Decisions recorded with the trade-off you accepted",
    ],
  },
  {
    number: "05",
    name: "Build",
    step: "Architect",
    text: "Turn the architecture into a deliberate build sequence instead of whatever the model suggests next.",
    outputs: [
      "A build order with a demonstrable result at each step",
      "The parts you will not let the model decide",
      "A definition of done per slice",
    ],
  },
  {
    number: "06",
    name: "Evaluation",
    step: "Harden",
    text: "Define quality, reliability, failure modes and acceptance criteria for the AI itself.",
    outputs: [
      "An evaluation set built from real inputs",
      "Pass thresholds agreed before you measure",
      "The failure modes you have accepted, and the ones you have not",
    ],
  },
  {
    number: "07",
    name: "Production readiness",
    step: "Harden",
    text: "Work through security, privacy, analytics, monitoring and the operational load you are taking on.",
    outputs: [
      "A security and privacy pass against a written checklist",
      "The signals you will watch, and the alert that actually pages someone",
      "An honest estimate of the operating cost per user",
    ],
  },
  {
    number: "08",
    name: "Launch",
    step: "Launch",
    text: "Define distribution, pricing, measurement and how you will iterate once real users arrive.",
    outputs: [
      "One distribution channel you will actually work",
      "A price, and the reasoning behind it",
      "The two numbers that decide whether to continue",
    ],
  },
];

// ---------------------------------------------------------------------------
// What is in the bundle.
//
// The three libraries below are ARC's own open-source catalogs. They are MIT
// licensed and the page says so, because claiming they are exclusive would be
// false. What the Playbook adds is curation: each one is cut down, ordered to
// the five-step system, and tied to the module it belongs to.
// ---------------------------------------------------------------------------
export type BundleItem = {
  id: string;
  name: string;
  count?: string;
  format: string;
  text: string;
  /** Set where the item is also published openly, so the page can say so. */
  openSource?: { license: string; repo: string };
};

export const playbookBundle: BundleItem[] = [
  {
    id: "playbook",
    name: "The ARC AI Product Playbook",
    count: "8 modules",
    format: "PDF",
    text: "The full method, with the decision named at every step and the output you should be holding at the end of each module.",
  },
  {
    id: "worksheets",
    name: "Worksheets and frameworks",
    count: "11 worksheets",
    format: "PDF + editable Markdown",
    text: "The hypothesis sheet, validation plan, MVP scope, architecture checklist, evaluation plan, production-readiness checklist and launch plan, as fillable pages.",
  },
  {
    id: "skills",
    name: "ARC Skills library",
    count: "20 agent skills",
    format: "SKILL.md packages",
    text: "Production-ready agent skills with triggers, steps and guardrails, for operator work like due diligence, incident timelines, PR review and prompt ship review. Drop them into Cursor or Claude.",
    openSource: {
      license: "MIT",
      repo: "https://github.com/aking-beep/arc-skills",
    },
  },
  {
    id: "architectures",
    name: "Reference Architectures",
    count: "20 blueprints",
    format: "Markdown + diagrams",
    text: "System shapes from ARC delivery work, each naming the problem, the component shape, the key decisions, the failure modes, when not to use it, and the scaling path.",
    openSource: {
      license: "MIT",
      repo: "https://github.com/aking-beep/reference-architectures",
    },
  },
  {
    id: "templates",
    name: "AI Workflow Templates",
    count: "16 templates",
    format: "Markdown + prompt skeletons",
    text: "End-to-end workflows with the prompt, the tools it calls, the input schema and the human-in-the-loop gate already in place.",
    openSource: {
      license: "MIT",
      repo: "https://github.com/aking-beep/ai-workflow-templates",
    },
  },
];

/** Short list used on cards and in the fulfillment email. */
export const playbookIncludes = [
  "The complete ARC AI Product Playbook, 8 modules",
  "11 worksheets and frameworks, fillable",
  "ARC Skills library, 20 agent skills",
  "Reference Architectures, 20 blueprints",
  "AI Workflow Templates, 16 workflows",
  "Editable Markdown for everything, so you can adapt it",
  "Free updates to this edition",
];

// ---------------------------------------------------------------------------
// Preview cards — what a buyer sees before paying.
// ---------------------------------------------------------------------------
export const playbookPreview = [
  {
    label: "From module 02 · Validation",
    title: "Set the go / no-go threshold before you look",
    body: "Write the number that means stop before you run the test. A threshold chosen afterwards is a description of what you already wanted to do.",
  },
  {
    label: "From module 04 · Architecture",
    title: "Mark the AI boundary on the diagram",
    body: "Everything inside the boundary can be wrong in ways you cannot fully prevent. Everything outside it is expected to be deterministic. Teams that skip this line end up defending model output as if it were a database read.",
  },
  {
    label: "From module 06 · Evaluation",
    title: "An eval set made of real inputs, not clean ones",
    body: "Build it from the messiest twenty inputs you can find. If you cannot find twenty real inputs, you have a validation problem rather than an evaluation problem.",
  },
  {
    label: "From module 07 · Production readiness",
    title: "The alert that actually pages someone",
    body: "List every signal you plan to watch, then cross out the ones nobody would get out of bed for. What remains is your monitoring. The rest is a dashboard.",
  },
];

// ---------------------------------------------------------------------------
// Audience and FAQ.
// ---------------------------------------------------------------------------
export const playbookAudience = {
  forYou: [
    "AI builders shipping their first real product",
    "Solo and technical founders",
    "Product managers working without a research team",
    "People who started by vibe coding and now need it to hold up",
    "Small product teams without a product organisation behind them",
    "Operators turning an internal workflow into software",
  ],
  notForYou: [
    "Teams who already have a product organisation and a research function",
    "Anyone looking for code they can paste without making decisions",
    "Readers who want a course with videos and a certificate",
  ],
};

export const playbookFaqs = [
  {
    q: "What exactly do I get, and in what format?",
    a: "A PDF of the Playbook plus a ZIP of editable Markdown: the worksheets, the 20 ARC Skills, the 20 reference architectures and the 16 workflow templates. No login, no application to learn, no subscription.",
  },
  {
    q: "Is this a course?",
    a: "No. There are no videos and no certificate. It is a working document you fill in while you build, which is why the worksheets ship as editable Markdown as well as print pages.",
  },
  {
    q: "The three libraries are open source. Why are they in a paid bundle?",
    a: "Because they are, and we say so on this page. The ARC Skills, reference architectures and workflow templates are MIT licensed and free on GitHub. What you are paying for is the Playbook and the curation: each library is cut down, ordered to the five-step system, and attached to the module where you would actually reach for it. If you only want the raw catalogs, take them from GitHub.",
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
    a: "Email us within 30 days and we refund it. We would rather return $39 than have a product with a reputation for wasting people's time.",
  },
  {
    q: "Do you also do this work for people?",
    a: "Yes. The Playbook is the method; ARC Advisory is the method applied to your specific product by the people who wrote it.",
  },
];

export const playbookClosing = {
  title: "Stop guessing what comes next.",
  lead: "The Playbook is the sequence we run on paid product work, written down so you can run it yourself.",
};
