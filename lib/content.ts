// ============================================================================
// ARC ecosystem — single source of truth.
// Add a product/service/article here and it shows up across the site.
// ============================================================================

export const site = {
  name: "ARC Transformation Group",
  short: "ARC",
  tagline: "We build operational intelligence.",
  description:
    "ARC builds free open-source tools, publishes research, consults on hard implementation problems, productizes the recurring work, and teaches teams to adopt AI that actually ships.",
  email: "aking@arctransformationgroup.com",
  calendly: "https://calendly.com/aking-arctransformationgroup/30min",
  github: "https://github.com/arctransformationgroup",
  // Choose ONE canonical domain and redirect the other.
  domain: "https://arctransformationgroup.com",
};

export type Status = "live" | "building" | "planned";

export const statusLabel: Record<Status, string> = {
  live: "Live",
  building: "In progress",
  planned: "Planned",
};

// ---------------------------------------------------------------------------
// The five pillars — the ecosystem map.
// ---------------------------------------------------------------------------
export type Pillar = {
  id: string;
  name: string;
  href: string;
  icon: string; // lucide-react icon name
  kicker: string;
  summary: string;
  detail: string;
  status: Status;
};

export const pillars: Pillar[] = [
  {
    id: "labs",
    name: "ARC Labs",
    href: "/labs",
    icon: "FlaskConical",
    kicker: "Free & open source",
    summary: "Free tools that build trust before we ever send an invoice.",
    detail:
      "Open-source scanners and utilities anyone can run. They make the invisible visible — and they're how most people meet ARC.",
    status: "live",
  },
  {
    id: "studio",
    name: "ARC Studio",
    href: "/studio",
    icon: "Compass",
    kicker: "Advisory & delivery",
    summary: "Hands-on help with the hard implementation problems.",
    detail:
      "Technical due diligence, AI assessments, architecture reviews, and fractional AI leadership. Strategy that aligns, work delivered in honest stages.",
    status: "live",
  },
  {
    id: "platform",
    name: "ARC Platform",
    href: "/platform",
    icon: "LayoutDashboard",
    kicker: "Productized intelligence",
    summary: "The recurring work, turned into software you run yourself.",
    detail:
      "AI operating intelligence: dashboards, governance, and reporting that turn one-off diagnostics into a system your team lives in.",
    status: "building",
  },
  {
    id: "research",
    name: "ARC Intelligence",
    href: "/research",
    icon: "LineChart",
    kicker: "Benchmarks & research",
    summary: "Public benchmarks and honest industry reports.",
    detail:
      "We publish what we learn — benchmarks, teardowns, and reports written in plain language with real numbers, not vendor gloss.",
    status: "building",
  },
  {
    id: "academy",
    name: "ARC Academy",
    href: "/academy",
    icon: "GraduationCap",
    kicker: "Courses & certification",
    summary: "Teaching teams to adopt AI that actually ships.",
    detail:
      "Courses, certifications, and workshops that turn ARC's operating principles into skills your team keeps after we leave.",
    status: "planned",
  },
];

// ---------------------------------------------------------------------------
// ARC Labs — free tools.
// ---------------------------------------------------------------------------
export type ProductVisual =
  | "conformance"
  | "prompt"
  | "skills"
  | "connectivity";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: Status;
  badge?: string;
  visual: ProductVisual;
  audience: string;
  howItWorks: string[];
  features: string[];
  links: { demo?: string; github?: string; docs?: string };
  roadmap?: { label: string; done: boolean }[];
};

export const labs: Product[] = [
  {
    slug: "mcp-conformance-scanner",
    name: "MCP Conformance Scanner",
    tagline: "Check any MCP server against the spec in seconds.",
    description:
      "Point it at a Model Context Protocol server and get a clear-eyed conformance report: what passes, what breaks, and what to fix first. Built on the same Next.js + Vercel stack every ARC product shares.",
    status: "live",
    badge: "Flagship",
    visual: "conformance",
    audience:
      "Teams shipping or consuming MCP servers who need a gate before production — not a vague “looks fine in one client” vibe check.",
    howItWorks: [
      "Paste a server URL or point the CLI at your local process.",
      "We run handshake, capability negotiation, and schema checks.",
      "You get a graded report with prioritized fixes an operator can act on.",
      "Share the link with a teammate or drop it into CI when the Action ships.",
    ],
    features: [
      "Full MCP handshake and capability negotiation checks",
      "Tool, resource, and prompt schema validation",
      "Prioritized findings written for an operator, not a linter",
      "Shareable report links",
    ],
    links: {
      demo: "https://github.com/arctransformationgroup/mcp-conformance-scanner",
      github: "https://github.com/arctransformationgroup/mcp-conformance-scanner",
      docs: "https://github.com/arctransformationgroup/mcp-conformance-scanner#readme",
    },
    roadmap: [
      { label: "Core conformance suite", done: true },
      { label: "Shareable report links", done: true },
      { label: "CI GitHub Action", done: false },
      { label: "Historical diffing", done: false },
    ],
  },
  {
    slug: "prompt-reviewer",
    name: "Prompt Reviewer",
    tagline: "A second set of eyes on your system prompts.",
    description:
      "Paste a prompt and get structured feedback on clarity, injection surface, ambiguity, and failure modes — the review a senior engineer would give, minus the wait.",
    status: "building",
    visual: "prompt",
    audience:
      "Builders writing system prompts for agents and copilots who want failure modes named before users find them.",
    howItWorks: [
      "Paste the system prompt (and optional tool list).",
      "We score clarity, ambiguity, and injection surface.",
      "You get concrete rewrites and a failure-mode list to put in the PR.",
    ],
    features: [
      "Clarity and ambiguity scoring",
      "Prompt-injection surface analysis",
      "Failure-mode enumeration",
      "Concrete rewrite suggestions",
    ],
    links: { github: "https://github.com/arctransformationgroup" },
  },
  {
    slug: "arc-skills",
    name: "ARC Skills",
    tagline: "Reusable, open agent skills.",
    description:
      "A growing open library of packaged agent skills you can drop into your own workflows — the same building blocks ARC uses internally.",
    status: "building",
    visual: "skills",
    audience:
      "Operators and engineers who want copy-pasteable agent skills with documented inputs and guardrails — not a private prompt graveyard.",
    howItWorks: [
      "Browse the skill library by job (research, review, ops).",
      "Drop a package into your agent runtime or skill folder.",
      "Keep the guardrails; customize the inputs for your stack.",
    ],
    features: [
      "Portable skill packages",
      "Documented inputs and guardrails",
      "MIT-licensed and copy-pasteable",
    ],
    links: { github: "https://github.com/arctransformationgroup" },
  },
  {
    slug: "connectivity-scanner",
    name: "Connectivity Scanner",
    tagline: "Map what your agent can actually reach.",
    description:
      "Discover and pressure-test the connectors, endpoints, and permissions an AI system depends on — before they surprise you in production.",
    status: "planned",
    visual: "connectivity",
    audience:
      "Security and platform teams who need a clear map of agent reachability before a connector goes sideways in prod.",
    howItWorks: [
      "Point the scanner at your agent’s configured connectors.",
      "We probe reachability, auth, and permission boundaries.",
      "You get a risk-ranked exposure report with owners attached.",
    ],
    features: [
      "Connector and endpoint discovery",
      "Permission and reachability checks",
      "Risk-ranked exposure report",
    ],
    links: {},
  },
];

// ---------------------------------------------------------------------------
// ARC Studio — the nine services (migrated from the current site).
// ---------------------------------------------------------------------------
export type Service = {
  number: string;
  name: string;
  blurb: string;
  points: string[];
  flagship?: boolean;
};

export const services: Service[] = [
  {
    number: "01",
    name: "Growth & Targeting",
    blurb:
      "Find the right buyers, screen them honestly, and stand up an outreach system that doesn't burn out leads or your team.",
    points: [
      "Target account research and ICP scoring",
      "Digital maturity screening",
      "Buyer mapping and outreach system design",
      "Pipeline setup and ongoing oversight",
    ],
  },
  {
    number: "02",
    name: "Technical Due Diligence",
    blurb:
      "A clear-eyed read on the system you've built, or the one you're about to buy. Honest, prioritized, and written so an operator can act on it.",
    points: [
      "Code and repo review",
      "Architecture assessment",
      "Technical-debt evaluation",
      "Modernization roadmap",
    ],
  },
  {
    number: "03",
    name: "Data Health & Analytics Readiness",
    blurb:
      "Can you actually trust your reporting? We find where the data breaks down, and what it takes to fix it at the speed your business runs.",
    points: [
      "Schema and pipeline audit",
      "Event-tracking assessment",
      "Data quality review",
      "Reporting trust assessment",
    ],
  },
  {
    number: "04",
    name: "Cloud, Infra & DevOps Readiness",
    blurb:
      "How your platform actually behaves under load, change, and pressure, plus a roadmap that fixes what matters first.",
    points: [
      "Cloud current-state assessment",
      "CI/CD and environment audit",
      "Observability assessment",
      "Scalability roadmap",
    ],
  },
  {
    number: "05",
    name: "Security Posture Review",
    blurb:
      "A practical look at where you're exposed, what to fix first, and what growth will demand. Readiness work, not audit theater.",
    points: [
      "Security posture review",
      "Access and secrets review",
      "Risk prioritization",
      "Scale-ready security roadmap",
    ],
  },
  {
    number: "06",
    name: "Delivery & Program Structuring",
    blurb:
      "Turning intent into a release plan that actually ships. Charters, milestones, dependencies, governance — the unglamorous work that decides whether anything launches.",
    points: [
      "Project intake and charter design",
      "Milestone and dependency planning",
      "Release readiness",
      "Delivery governance cadence",
    ],
  },
  {
    number: "07",
    name: "AI Readiness & Automation Opportunity Assessment",
    blurb:
      "Where AI and automation will actually move the needle, and where they won't. We rank the real opportunities against your team's capability and habits.",
    points: [
      "AI readiness audit",
      "Process opportunity map",
      "Integration feasibility",
      "Phased 30/60/90 roadmap",
    ],
  },
  {
    number: "08",
    name: "AI Product & Implementation Design",
    blurb:
      "Taking an opportunity and turning it into something a team can actually build. Workflow design, human-in-the-loop checkpoints, real KPIs, and a rollout plan that survives contact with reality.",
    points: [
      "AI workflow design",
      "MVP scoping and functional requirements",
      "Human-in-the-loop design",
      "KPI framework and rollout plan",
    ],
  },
  {
    number: "09",
    name: "Integrated Transformation Diagnostic",
    flagship: true,
    blurb:
      "The whole picture, in five to seven weeks. Architecture, data, infrastructure, security, operations, and AI together, then a phased 6–12 month roadmap with real owners, sized risks, and sequenced spend.",
    points: [
      "Current-state across architecture, data, infra, security, operations, and AI",
      "Executive summary written for the board, not the team",
      "Phased roadmap from where you are to where you're going",
      "Named owners, sized risks, and a sequence of spend that makes sense",
    ],
  },
];

export const stages = [
  {
    number: "01",
    name: "Discover",
    text: "What is actually happening, and what is the real problem worth solving?",
  },
  {
    number: "02",
    name: "Align",
    text: "What does winning look like, and how does the strategy fit your team and budget?",
  },
  {
    number: "03",
    name: "Deliver",
    text: "What ships, who owns it, and how does it stay stable in your real business?",
  },
  {
    number: "04",
    name: "Measure",
    text: "Is the work producing the outcomes we said it would, against numbers that matter?",
  },
  {
    number: "05",
    name: "Sustain",
    text: "How do we keep the results compounding so next quarter is easier than this one?",
  },
];

export const principles = [
  {
    number: "01",
    title: "Always name the stage.",
    text: "Every recommendation tells you which stage of work it is. If we can't name it, we haven't thought about it hard enough.",
  },
  {
    number: "02",
    title: "Don't confuse strategy with deliverables.",
    text: "A near-term fix is never sold as transformation. A long-term vision is never confused with what we're shipping next month.",
  },
  {
    number: "03",
    title: "Boring beats clever.",
    text: "A spreadsheet running a real operation beats a custom system that only sort of works. Every time.",
  },
  {
    number: "04",
    title: "Four axes, or it's just a slide.",
    text: "Every recommendation has to land on business value, risk, feasibility, and adoption. If it lands on only one, it's a slide, not a plan.",
  },
  {
    number: "05",
    title: "Show your work.",
    text: "Every output names its assumptions, constraints, dependencies, and unknowns. Nobody has time to reverse-engineer how we got there.",
  },
  {
    number: "06",
    title: "Plain language. Real numbers.",
    text: "\"AI-powered\" means nothing. \"Cuts claim-triage time by 38% with an LLM classifier and human review on the bottom quartile\" means something. We write the second kind.",
  },
  {
    number: "07",
    title: "Build for the world you're actually in.",
    text: "Small budgets. Stretched teams. Uneven technical depth. ROI that has to show up fast enough for people to believe it. That's the world we design for.",
  },
  {
    number: "08",
    title: "Build for the next version, too.",
    text: "If a system falls over when a teammate leaves or a vendor changes an API, it's a liability, not a system. We build so version two is cheaper than version one.",
  },
];

export const bestFit = [
  "Small and mid-sized companies (10 to 500 people) feeling the gap between hype and execution.",
  "Operators who want a working system, not a slide deck.",
  "Teams ready to put real data, real users, and real budgets behind the work.",
  "Leaders who want one honest partner across strategy, build, and scale — not a stack of vendors to manage.",
];

// ---------------------------------------------------------------------------
// ARC Platform — productized capabilities.
// ---------------------------------------------------------------------------
export const platformCapabilities = [
  {
    name: "AI Operating Intelligence",
    text: "A live read on how your AI and systems are actually performing — the diagnostic, running continuously instead of once.",
  },
  {
    name: "Dashboards",
    text: "The metrics that matter, in one place, in plain language. No reverse-engineering someone else's spreadsheet.",
  },
  {
    name: "Governance",
    text: "Guardrails, approvals, and audit trails so AI adoption scales without becoming a liability.",
  },
  {
    name: "Reporting",
    text: "Executive-ready reports generated from real signals — written for the board, not the team.",
  },
];

export const platformPrinciples = [
  {
    title: "Continuous, not episodic",
    text: "A diagnostic that ages out in a quarter is a liability. Platform keeps the same axes live so the roadmap stays honest.",
  },
  {
    title: "Operator-readable",
    text: "Every score and alert has a named owner, a plain-language reason, and a next action — not a wall of telemetry.",
  },
  {
    title: "Shared infrastructure",
    text: "Auth, scoring, and reporting match the Labs tools and Studio deliverables, so the ecosystem reads as one system.",
  },
];

export const platformRoadmap = [
  { label: "Design-partner dashboards", done: false },
  { label: "Governance workflows + audit trail", done: false },
  { label: "Board-ready report export", done: false },
  { label: "Self-serve onboarding", done: false },
];

// ---------------------------------------------------------------------------
// ARC Intelligence — research & benchmarks.
// ---------------------------------------------------------------------------
export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  kind: "Benchmark" | "Research" | "Report";
  date: string;
  status: Status;
  summary: string;
  readingTime: string;
  sections: ArticleSection[];
};

export const research: Article[] = [
  {
    slug: "mcp-conformance-in-the-wild",
    title: "MCP Conformance in the Wild: What 100 Servers Told Us",
    kind: "Benchmark",
    date: "2026-06-01",
    status: "building",
    summary:
      "We ran the MCP Conformance Scanner against a broad sample of public servers. Here's where the spec holds, where it quietly breaks, and what that means for anyone building on MCP.",
    readingTime: "9 min",
    sections: [
      {
        heading: "Method",
        paragraphs: [
          "We pointed the MCP Conformance Scanner at a curated set of public Model Context Protocol servers — open-source implementations, vendor demos, and community projects. Each run covered handshake, capability negotiation, and schema validation for tools, resources, and prompts.",
          "Assumptions we are labeling up front: the sample skews toward early adopters and English-language documentation; private enterprise servers are under-represented; and a failing check is not the same as a malicious server — it usually means an incomplete or drifting implementation.",
        ],
      },
      {
        heading: "What we found",
        paragraphs: [
          "Capability negotiation is where most implementations stumble. Servers advertise tools they cannot fully describe, or accept initialize sequences that the spec treats as optional and then break when a client exercises them.",
          "Schema validation failures cluster around optional fields treated as required, and around tool argument shapes that work in one client SDK and quietly fail in another. Operators see this as flaky agents; the root cause is often a half-finished MCP surface.",
        ],
      },
      {
        heading: "What it means",
        paragraphs: [
          "If you are shipping an MCP server, run conformance in CI before you call it production. If you are consuming servers, treat the handshake report as a gate — not a nice-to-have — and prefer servers that publish a shareable conformance link.",
          "This report is still building. As the sample grows and the scanner’s historical diffing lands, we will publish grade distributions and a short list of the highest-impact fixes for implementers.",
        ],
      },
    ],
  },
  {
    slug: "ai-readiness-mid-market",
    title: "The Mid-Market AI Readiness Report",
    kind: "Report",
    date: "2026-04-15",
    status: "planned",
    summary:
      "A field report on what actually separates the 10–500 person companies getting real value from AI from the ones stuck in pilot purgatory.",
    readingTime: "14 min",
    sections: [
      {
        heading: "Method",
        paragraphs: [
          "This report will synthesize ARC Studio engagements and anonymized diagnostic scores across architecture, data, infrastructure, security, operations, and AI opportunity. We score every recommendation on business value, risk, feasibility, and adoption — the four axes — or we do not publish it.",
          "Constraints: mid-market only (roughly 10–500 people), US and English-language operators first, and no vendor-sponsored placements. Unknowns we will call out: selection bias toward companies already talking to ARC, and uneven willingness to share quantitative outcomes.",
        ],
      },
      {
        heading: "What we expect to show",
        paragraphs: [
          "The pattern we see in the field: successful teams name the stage they are in, pick one boring system that moves a real KPI, and put a human review loop on the failure modes. Stuck teams confuse strategy decks with deliverables and run three competing pilots with no shared owner.",
          "We will publish the numbers when the sample is honest enough to stand behind — not before.",
        ],
      },
      {
        heading: "What it means",
        paragraphs: [
          "If you are in pilot purgatory, start with an Integrated Transformation Diagnostic or a narrower AI readiness assessment. The goal is a sequenced 30/60/90 plan with named owners — not another slide that says “AI-powered.”",
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// ARC Academy — education.
// ---------------------------------------------------------------------------
export const academy = [
  {
    name: "Courses",
    text: "Self-paced tracks that turn ARC's operating principles into repeatable practice for your team.",
    detail:
      "First tracks cover naming the stage, scoring on four axes, and shipping a boring MVP that moves a real KPI.",
    status: "planned" as Status,
  },
  {
    name: "Certifications",
    text: "Prove your team can run the ARC method — name the stage, land on four axes, ship the boring thing.",
    detail:
      "Practical exams against sample diagnostics — not multiple-choice theater. Built for operators who have to defend the plan.",
    status: "planned" as Status,
  },
  {
    name: "Workshops",
    text: "Live, hands-on sessions run against your real systems and your real backlog.",
    detail:
      "Half-day and two-day intensives. Bring the messy backlog; leave with sequenced work and named owners.",
    status: "planned" as Status,
  },
];

export const academyOutcomes = [
  "A shared vocabulary so strategy and delivery stop talking past each other.",
  "Repeatable scoring on business value, risk, feasibility, and adoption.",
  "A team that can keep compounding after the engagement ends.",
];

// ---------------------------------------------------------------------------
// Case studies — reusable template content.
// ---------------------------------------------------------------------------
export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  status: Status;
  industry: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-transformation-diagnostic",
    client: "Sample Engagement",
    title: "From pilot purgatory to a sequenced 12-month roadmap",
    status: "planned",
    industry: "B2B SaaS · 120 employees",
    summary:
      "A template case study. Replace this with a real engagement — the structure is ready.",
    challenge:
      "Leadership had three competing AI initiatives, no shared view of technical debt, and no way to say which bet to fund first.",
    approach: [
      "Ran the Integrated Transformation Diagnostic across architecture, data, infra, security, ops, and AI.",
      "Scored every opportunity on business value, risk, feasibility, and adoption.",
      "Delivered a phased roadmap with named owners and sequenced spend.",
    ],
    outcomes: [
      { metric: "5 wks", label: "From kickoff to board-ready roadmap" },
      { metric: "3 → 1", label: "Competing initiatives, resequenced into one plan" },
      { metric: "100%", label: "Recommendations landed on all four axes" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Navigation.
// ---------------------------------------------------------------------------
export const nav = [
  { label: "Labs", href: "/labs" },
  { label: "Studio", href: "/studio" },
  { label: "Platform", href: "/platform" },
  { label: "Research", href: "/research" },
  { label: "Academy", href: "/academy" },
  { label: "About", href: "/about" },
];
