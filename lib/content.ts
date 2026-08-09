// ============================================================================
// ARC ecosystem — single source of truth.
// Add a product/service/article here and it shows up across the site.
// ============================================================================

export const site = {
  name: "ARC Transformation Group",
  short: "ARC",
  tagline: "Ready for the digital change.",
  description:
    "ARC helps individuals, companies, nonprofits, and communities keep pace with an ever-changing digital ecosystem: digital transformation, cybersecurity, data, cloud, and AI when it actually helps. Free tools, advisory, research, and workshops at a realistic price.",
  email: "aking@arctransformationgroup.com",
  calendly: "https://calendly.com/aking-arctransformationgroup/30min",
  github: "https://github.com/aking-beep",
  // Prefer an org account long-term (e.g. github.com/arctransformationgroup).
  linkedin: "https://www.linkedin.com/in/andrew-k-a676aa178/",
  // Choose ONE canonical domain and redirect the other.
  domain: "https://arctransformationgroup.com",
  founder: {
    name: "Andrew King",
    role: "Founder",
    bio: "Andrew King has spent about twenty years working with technology across Fortune 100 and Fortune 500 companies. That includes large-scale entertainment, cybersecurity, brands like LEGO and the NFL, major artists and entertainment platforms, and some of the earliest customer data platforms built at real scale, including Ticketmaster-sized CDP work for tens of millions of users. He started ARC to help companies big and small, nonprofits, individuals, and communities expand with their digital ecosystem without getting left behind. Fixed rates or hourly work, scoped to what you need, whether the work is digital transformation, cybersecurity, data and platforms, or AI.",
    highlights: [
      "About 20 years in technology across Fortune 100 and Fortune 500 companies",
      "Entertainment at scale: platforms, artists, and live events",
      "Cybersecurity and compliance work with global security brands",
      "Brand and consumer work with companies like LEGO and the NFL",
      "Early CDP and data-platform builds, including Ticketmaster-scale delivery",
      "Digital transformation across process, data, cloud, security, and AI when it fits",
      "Works with companies, nonprofits, people, and communities at rates that stay realistic",
    ],
  },
};

/** What digital transformation means in practice for ARC. */
export const digitalTransformation = [
  {
    name: "Technology and infrastructure",
    text: "Cloud, applications, platforms, and the systems that keep daily work running as the stack changes.",
  },
  {
    name: "Data and insight",
    text: "Treating data as something you can trust: quality, access, reporting, and decisions that hold up.",
  },
  {
    name: "Process and operations",
    text: "Redesigning workflows so digital tools change how work actually gets done, not just which logo is on the login screen.",
  },
  {
    name: "Cybersecurity and risk",
    text: "Security, privacy, and compliance built into the change, so growth does not open the door to avoidable risk.",
  },
  {
    name: "People and readiness",
    text: "Skills, ownership, and a shared vocabulary so teams, nonprofits, and communities are not left behind by the shift.",
  },
  {
    name: "AI and automation when it helps",
    text: "One part of the mix, not the whole story. Used where it moves a real outcome, with human review where it matters.",
  },
];

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
      "Technical due diligence, architecture reviews, cybersecurity and data readiness, digital transformation roadmaps, and fractional leadership. Strategy that aligns, work delivered in honest stages.",
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
      "Operating dashboards, governance, and reporting that turn one-off diagnostics into a system your team lives in across digital, security, and delivery work.",
    status: "building",
  },
  {
    id: "research",
    name: "ARC Research",
    href: "/research",
    icon: "LineChart",
    kicker: "Benchmarks & reports",
    summary: "Public benchmarks and honest industry reports.",
    detail:
      "We publish what we learn — benchmarks, teardowns, and reports written in plain language with real numbers, not vendor gloss.",
    status: "live",
  },
  {
    id: "academy",
    name: "ARC Academy",
    href: "/academy",
    icon: "GraduationCap",
    kicker: "Workshops",
    summary: "Hands-on workshops that make the method stick.",
    detail:
      "Live workshops run against your real systems and backlog — so the team keeps the skills after we leave.",
    status: "live",
  },
];

// ---------------------------------------------------------------------------
// ARC Labs — free tools.
// ---------------------------------------------------------------------------
export type ProductVisual =
  | "conformance"
  | "prompt"
  | "skills"
  | "connectivity"
  | "spend";

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
      github: "https://github.com/aking-beep",
    },
    roadmap: [
      { label: "Core conformance suite", done: true },
      { label: "Shareable report links", done: true },
      { label: "CI GitHub Action", done: false },
      { label: "Historical diffing", done: false },
    ],
  },
  {
    slug: "tokenloop",
    name: "TokenLoop",
    tagline: "Stop AI coding-agent spend before the invoice.",
    description:
      "Free spend control for Claude Code and Cursor: per-developer burn, minutes-scale kill switch, and client chargeback — without rebuilding traffic through a gateway. Sign up free, connect read-only admin keys (encrypted at rest), use every feature.",
    status: "live",
    badge: "Free product",
    visual: "spend",
    audience:
      "Engineering and agency leads running Claude Code and Cursor who find out about runaway spend on the invoice — and need detect-and-cut plus client bill-back without a proxy.",
    howItWorks: [
      "Create a free account (email + password).",
      "Paste Anthropic and/or Cursor admin keys — we AES-256-GCM encrypt them before storage.",
      "Sync spend, set a daily cap / spike multiplier, and optionally tag clients for chargeback.",
      "Kill switch detects spikes ~every 10 minutes and can throttle or revoke via admin APIs.",
    ],
    features: [
      "Per-developer Claude Code + Cursor spend in one pane",
      "Kill switch: detect, alert, throttle, or revoke (admin APIs)",
      "Agency chargeback with markup and CSV export",
      "Keys encrypted at rest — never returned to the browser",
      "Honest scope: minutes-scale cut, not true per-request blocking",
    ],
    links: {
      demo: "https://tokenloop.vercel.app",
      github: "https://github.com/aking-beep/TokenLoop",
      docs: "https://tokenloop.vercel.app/privacy",
    },
    roadmap: [
      { label: "Spend dashboard + sync", done: true },
      { label: "Kill switch + chargeback", done: true },
      { label: "Free signup · all features", done: true },
      { label: "Codex / OpenAI ingestion", done: false },
    ],
  },
  {
    slug: "prompt-reviewer",
    name: "Prompt Reviewer",
    tagline: "A second set of eyes on your system prompts.",
    description:
      "Paste a prompt and get structured feedback on clarity, injection surface, ambiguity, and failure modes — the review a senior engineer would give, minus the wait. Static, reproducible, no model call.",
    status: "live",
    visual: "prompt",
    audience:
      "Builders writing system prompts for agents and copilots who want failure modes named before users find them.",
    howItWorks: [
      "Paste the system prompt (and optional tool list).",
      "We score clarity, structure, ambiguity, and injection surface against a fixed rubric.",
      "You get concrete rewrites and a failure-mode list to put in the PR.",
      "Gate in CI with the CLI --min-grade flag when you’re ready.",
    ],
    features: [
      "Clarity, structure, and ambiguity scoring",
      "Prompt-injection surface analysis (OWASP LLM01-aligned)",
      "Failure-mode enumeration with covered / gap status",
      "Concrete rewrite suggestions + Markdown / JSON export",
    ],
    links: {
      github: "https://github.com/aking-beep/prompt-reviewer",
      docs: "https://github.com/aking-beep/prompt-reviewer#readme",
    },
    roadmap: [
      { label: "Static review engine + UI + CLI", done: true },
      { label: "Rewrite suggestions + Markdown export", done: true },
      { label: "Shareable report links", done: false },
      { label: "Live attack-battery mode", done: false },
    ],
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
    links: { github: "https://github.com/aking-beep" },
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
    text: "What does winning look like, and how do we scope fixed or hourly work to match what you need?",
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
    text: "\"Digital transformation\" and \"AI-powered\" mean nothing on their own. \"Cut claim-triage time by 38% with a clearer workflow, better data, and human review on the hard cases\" means something. We write the second kind.",
  },
  {
    number: "07",
    title: "Build for the world you're actually in.",
    text: "Tight budgets. Stretched teams. Uneven technical depth. Results that have to show up soon enough for people to trust them. That is the world we design for, including nonprofits and communities.",
  },
  {
    number: "08",
    title: "Build for the next version, too.",
    text: "If a system falls over when a teammate leaves or a vendor changes an API, it's a liability, not a system. We build so version two is cheaper than version one.",
  },
];

export const bestFit = [
  "Companies, nonprofits, and communities that feel the gap between digital change and real readiness.",
  "Individuals and teams who want practical help at fixed or hourly rates they can live with.",
  "Operators who want a working system, not a slide deck.",
  "Groups ready to put real data, real users, and real effort behind the work.",
  "Leaders who want one honest partner across strategy, build, and scale, not a pile of vendors to manage.",
];

// ---------------------------------------------------------------------------
// ARC Platform — productized capabilities.
// ---------------------------------------------------------------------------
export const platformCapabilities = [
  {
    name: "Operating intelligence",
    text: "A live read on how your digital systems are actually performing: the diagnostic, running continuously instead of once.",
  },
  {
    name: "Dashboards",
    text: "The metrics that matter, in one place, in plain language. No reverse-engineering someone else's spreadsheet.",
  },
  {
    name: "Governance",
    text: "Guardrails, approvals, and audit trails so digital change scales without becoming a liability.",
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
// ARC Research — benchmarks & reports.
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
    status: "live",
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
          "As the sample grows and historical diffing lands, we will publish grade distributions and a short list of the highest-impact fixes for implementers. This first cut is already actionable.",
        ],
      },
    ],
  },
  {
    slug: "ai-readiness-mid-market",
    title: "The Mid-Market AI Readiness Report",
    kind: "Report",
    date: "2026-04-15",
    status: "live",
    summary:
      "A field report on what actually separates the 10–500 person companies getting real value from AI from the ones stuck in pilot purgatory.",
    readingTime: "14 min",
    sections: [
      {
        heading: "Method",
        paragraphs: [
          "This report synthesizes ARC Studio engagements and anonymized diagnostic scores across architecture, data, infrastructure, security, operations, and AI opportunity. We score every recommendation on business value, risk, feasibility, and adoption — the four axes — or we do not publish it.",
          "Constraints: mid-market only (roughly 10–500 people), US and English-language operators first, and no vendor-sponsored placements. Unknowns we call out: selection bias toward companies already talking to ARC, and uneven willingness to share quantitative outcomes.",
        ],
      },
      {
        heading: "What we found",
        paragraphs: [
          "The pattern in the field: successful teams name the stage they are in, pick one boring system that moves a real KPI, and put a human review loop on the failure modes. Stuck teams confuse strategy decks with deliverables and run three competing pilots with no shared owner.",
          "Readiness is less about model access and more about data trust, owner clarity, and a sequenced 30/60/90 that survives contact with a stretched team.",
        ],
      },
      {
        heading: "What it means",
        paragraphs: [
          "If you are in pilot purgatory, start with an Integrated Transformation Diagnostic or a narrower AI readiness assessment. The goal is a sequenced plan with named owners — not another slide that says “AI-powered.”",
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// ARC Academy — workshops.
// Each workshop has a slug and a light curriculum so the card opens a
// preview page (/academy/[slug]) with objectives, curriculum, and outcomes.
// ---------------------------------------------------------------------------
export type Workshop = {
  slug: string;
  name: string;
  text: string; // short line used on the card
  detail: string; // format line used on the card
  status: Status;
  whoFor: string;
  objectives: string[];
  curriculum: string[];
  outcomes: string[];
};

export const academy: Workshop[] = [
  {
    slug: "digital-readiness-workshop",
    name: "Digital Readiness Workshop",
    text: "Build a shared vocabulary for digital change, score where you actually stand, and scope what is worth doing first.",
    detail:
      "Half-day. Leadership and operators in one room. Leave with clear language, a readiness snapshot, and a scoped shortlist, not another idea pile.",
    status: "live",
    whoFor:
      "Companies, nonprofits, communities, and teams that feel digital change moving faster than they are. Especially useful when executives, operators, and technical people are talking past each other about cloud, data, security, process, or AI.",
    objectives: [
      "Give the room a plain-language vocabulary for the digital ecosystem: platforms and cloud, data trust, cybersecurity basics, process change, automation, and AI when it is relevant.",
      "Run an honest readiness check across awareness, use cases, data and tools, security and guardrails, ownership, and how you will measure success.",
      "Scope a short list of opportunities people can explain the same way, then leave with a 30-day action plan and named owners.",
    ],
    curriculum: [
      "Open and align. Why this session exists, what \"ready\" means here, and what you will leave with. No trends lecture.",
      "Shared vocabulary. Walk the terms teams mix up: digitization vs. digital transformation, pilot vs. production, cloud vs. \"someone else's computer,\" data trust vs. a pretty dashboard, automation vs. judgment, AI when it helps vs. AI theater. Agree on language you will use after the room empties.",
      "Readiness snapshot. Score the current state together: awareness, use-case clarity, workflow integration, data and approved tools, security and basic guardrails, leadership alignment, and measurement. Surface the gaps out loud.",
      "Opportunity scoping. Map real workflows (not abstract ideas). For each candidate, name the problem, who uses it, how often it happens, what systems and data it needs, and what risk or review it requires.",
      "Prioritize and scope. Sort into quick wins, strategic bets, and \"not yet.\" Pick three to five scoped bets with owners, success measures, and a 30-day review date. Sketch light guardrails so people can move without guessing.",
    ],
    outcomes: [
      "A shared digital vocabulary the team can reuse in planning and vendor conversations.",
      "A scored readiness snapshot with the main gaps named.",
      "A scoped shortlist (usually three to five bets) with owners and a 30-day action plan.",
    ],
  },
  {
    slug: "operator-working-session",
    name: "Operator Working Session",
    text: "A technical working session against your real systems, using ARC's stages, four axes, and delivery principles.",
    detail:
      "One or two days. We work in your tools and constraints. Leave with a run plan your team can execute without us in the room.",
    status: "live",
    whoFor:
      "Technical and operating leads who need the plan built across architecture, data, infra, security, delivery, and the human loops that keep it stable. Best when you have a real stack and a real backlog to put on the table.",
    objectives: [
      "Apply ARC's operating method in your environment: name the stage (Discover, Align, Deliver, Measure, Sustain), keep strategy separate from what ships next, and score work on the four axes.",
      "Pressure-test the technical path in your actual systems: data trust, connectors, permissions, failure modes, and what breaks when someone is out.",
      "Leave with an operator-ready run plan: owners, sequence, KPIs, and human review where it matters.",
    ],
    curriculum: [
      "Systems walk-through. Get into the real stack: data sources, pipelines, apps, connectors, access, and the workflow you want to change. No whiteboard fantasy version.",
      "Name the stage. Place each candidate in Discover, Align, Deliver, Measure, or Sustain. Call out where strategy is being sold as a deliverable.",
      "Four-axes scoring, applied. Score each opportunity on business value, risk, feasibility, and adoption with your constraints in the room. Drop anything that fails the axes.",
      "Technical design of the boring next step. Map one workflow end to end: inputs, systems, integrations, checks, and where a human stays in the loop. Call assumptions, dependencies, and unknowns.",
      "Operator run plan. Owners, sequence, dependencies, KPIs, review cadence, and the checks that keep version two cheaper than version one. Written so the team can run it after we leave.",
    ],
    outcomes: [
      "Candidates staged and scored on ARC's four axes with constraints visible.",
      "One designed next step with technical path, human review, and named assumptions.",
      "A run plan with owners, sequence, KPIs, and a review cadence your team can execute.",
    ],
  },
  {
    slug: "custom-team-workshop",
    name: "Custom Team Workshop",
    text: "You set the problem. We design the day around it, with the same ARC standard for clarity, owners, and next steps.",
    detail:
      "Scoped after a short intake. Half-day or multi-day. Topic is yours: cloud, data, cybersecurity, CDP, governance, delivery, nonprofit programs, AI, or something else entirely.",
    status: "live",
    whoFor:
      "Teams with a specific problem where a fixed agenda would waste the day. Bring the topic. We build the session around your stack, constraints, and the decision you need to make.",
    objectives: [
      "Use a short intake to define the real question, audience, and success criteria before anyone books the room.",
      "Run a tailored working session that still holds ARC's bar: plain language, named stage, scored options, and no strategy sold as a shippable deliverable.",
      "Leave with owners and a next step specific enough to start, whether the topic was technical, operational, or mission-driven.",
    ],
    curriculum: [
      "Intake (before the day). Scoping call: problem statement, who must be in the room, constraints, materials to bring, and what \"done\" looks like. We send a draft agenda for your sign-off.",
      "Open on your terms. Confirm the decision or artifact the day must produce. Align on vocabulary for this topic so the room is not arguing past each other.",
      "Deep work on your agenda. Facilitated time on the problem you brought. Examples of past custom days include cloud and data modernization, cybersecurity posture, MCP or agent work, CDP migration, governance and risk, delivery structuring, and nonprofit program enablement. Yours may be different.",
      "Decision and owners. Capture what is in, what is out, who holds what, and the honest first step. Same quality bar as our other workshops: assumptions labeled, next step specific enough for Monday.",
      "Follow-through pack. Agenda notes, decisions, owners, and open questions in a form your team can reuse. Optional follow-up hour if you want a check-in after the first week of work.",
    ],
    outcomes: [
      "A signed agenda and materials built for your problem, not a reused template.",
      "A worked plan or decision log for the topic you brought.",
      "Clear owners and a next step ready to start after the session.",
    ],
  },
];

export const academyOutcomes = [
  "A shared vocabulary so strategy, operators, and delivery stop talking past each other.",
  "Scoped work with owners: readiness shortlists, technical run plans, or custom decisions.",
  "A team that can keep moving after the workshop ends, at a pace and price that stays realistic.",
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
    client: "Mid-market B2B SaaS (anonymized)",
    title: "From pilot purgatory to a sequenced 12-month roadmap",
    status: "building",
    industry: "B2B SaaS · ~120 employees",
    summary:
      "Three competing AI bets, no shared debt map, and a board asking which one to fund. Five weeks later: one sequenced roadmap with named owners.",
    challenge:
      "Leadership had three competing AI initiatives, no shared view of technical debt, and no way to say which bet to fund first. Vendors were filling the vacuum with demos.",
    approach: [
      "Ran the Integrated Transformation Diagnostic across architecture, data, infra, security, ops, and AI.",
      "Scored every opportunity on business value, risk, feasibility, and adoption.",
      "Delivered a phased roadmap with named owners and sequenced spend — written for the board, not the team Slack.",
    ],
    outcomes: [
      { metric: "5 wks", label: "From kickoff to board-ready roadmap" },
      { metric: "3 → 1", label: "Competing initiatives, resequenced into one plan" },
      { metric: "100%", label: "Recommendations landed on all four axes" },
    ],
  },
  {
    slug: "mcp-readiness-for-ops",
    client: "Platform team (anonymized)",
    title: "Making MCP servers safe enough to put in the critical path",
    status: "building",
    industry: "Developer tools · platform eng",
    summary:
      "Agents were calling half-finished MCP servers. We used the Conformance Scanner plus Studio review to turn flaky connectors into gated, CI-checked surfaces.",
    challenge:
      "Agent workflows depended on community MCP servers with no conformance gate. Failures showed up as “the agent is weird,” not as schema or handshake bugs.",
    approach: [
      "Ran the MCP Conformance Scanner against every production-bound server.",
      "Prioritized findings for operators — capability negotiation and schema breaks first.",
      "Wired a pass/fail gate into the release checklist and a Studio review for the highest-risk connectors.",
    ],
    outcomes: [
      { metric: "12", label: "Servers scored before they hit prod agents" },
      { metric: "B− → A−", label: "Median grade after the first remediation pass" },
      { metric: "1 gate", label: "Shared conformance check for every new server" },
    ],
  },
];

// ---------------------------------------------------------------------------
// FAQ — shared across About and Studio.
// ---------------------------------------------------------------------------
export const faqs = [
  {
    q: "Do you only work on AI projects?",
    a: "No. ARC is a digital transformation practice. AI is one part of an ever-changing digital ecosystem that also includes data, cloud, cybersecurity, process change, and delivery. If AI isn't the highest-ROI move, we'll say so.",
  },
  {
    q: "How do most engagements start?",
    a: "Usually with a fixed-rate diagnostic, about three to seven weeks, that ends in a clear summary and a phased roadmap. After that we can keep going on fixed rates or hourly, depending on what you need.",
  },
  {
    q: "Are the Labs tools really free?",
    a: "Yes. Open source, no signup wall, no sales gate. They're how most people meet ARC. Studio is optional if you want a human read on what the tools surface.",
  },
  {
    q: "What's the difference between Studio and Platform?",
    a: "Studio is hands-on advisory and delivery. Platform productizes the recurring diagnostic work so your team can run it continuously after (or instead of) an engagement.",
  },
  {
    q: "What is ARC Academy?",
    a: "Workshops only — live sessions against your real systems and backlog. Digital readiness and vocabulary, technical operator sessions, or a custom day built around your problem. No course catalog and no certification product right now.",
  },
  {
    q: "Will you just build whatever we ask for?",
    a: "Not if it would be malpractice. Selling a build before the problem is named is how projects burn money. We'll push back, and we'll usually be grateful later that we did.",
  },
  {
    q: "Where are you based?",
    a: "Remote-first, US-friendly hours. Discovery calls and delivery work happen over video; workshops can be remote or on-site by arrangement.",
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
