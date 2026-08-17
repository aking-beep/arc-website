// ============================================================================
// ARC ecosystem - single source of truth.
// Add a product/service/article here and it shows up across the site.
// ============================================================================

export const site = {
  name: "ARC Transformation Group",
  short: "ARC",
  tagline: "Digital transformation that ships.",
  description:
    "ARC helps companies, nonprofits, teams, and communities keep pace with digital change. Digital transformation, cybersecurity, data platforms, and AI when it helps — as clear work that ships.",
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
    bio: "Andrew King has spent twenty years delivering technology programs inside Fortune 100 and Fortune 500 environments — cybersecurity product lines, live-entertainment platforms, consumer brands, and customer-data architecture. He has coordinated 300+ features on an enterprise cybersecurity release program that improved release value by 25% and contributed $8M+ in annual sales impact; designed CDP and data-platform work at tens of millions of customer profiles, including Ticketmaster-scale live-entertainment delivery; and delivered brand and consumer programs with LEGO and the NFL. He founded ARC so companies, nonprofits, teams, and communities can get that same standard of work: scoped to the problem, sized to what the organization actually needs.",
    highlights: [
      "Twenty years delivering technology programs in Fortune 100 and Fortune 500 environments",
      "Enterprise cybersecurity: 300+ features coordinated, 25% improvement in release value, $8M+ annual sales impact",
      "Customer-data platforms at tens of millions of profiles, including Ticketmaster-scale live-entertainment delivery",
      "Brand and consumer programs with LEGO and the NFL",
      "Transformation across process, data, cloud, and security — AI only where it moves an outcome",
      "Works with companies, nonprofits, teams, and communities — scoped to what they need",
    ],
    scope: [
      { metric: "20 yrs", label: "Fortune 100 / 500 technology delivery" },
      { metric: "300+", label: "Features coordinated in cybersecurity" },
      { metric: "25%", label: "Release-value improvement" },
      { metric: "$8M+", label: "Annual sales impact from that program" },
      { metric: "10M+", label: "Customer profiles at CDP scale" },
      { metric: "LEGO · NFL", label: "Brand and consumer programs" },
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
// The four pillars - the ecosystem map.
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
      "Open-source scanners and utilities anyone can run. Most people meet ARC here, before an invoice ever shows up.",
    status: "live",
  },
  {
    id: "studio",
    name: "ARC Studio",
    href: "/studio",
    icon: "Compass",
    kicker: "Advisory & delivery",
    summary: "Hands-on advisory and delivery for digital transformation.",
    detail:
      "Due diligence, architecture, cybersecurity, data readiness, and roadmaps that can actually ship — for companies, nonprofits, and teams that need a partner, not a slide deck.",
    status: "live",
  },
  {
    id: "research",
    name: "ARC Research",
    href: "/research",
    icon: "LineChart",
    kicker: "Cited research",
    summary: "Grounded briefs with academic and industry sources.",
    detail:
      "Research you can verify — AI, security, operations, cloud, transformation, and product — with citations, limitations labeled, and outcomes operators can use.",
    status: "live",
  },
  {
    id: "academy",
    name: "ARC Academy",
    href: "/academy",
    icon: "GraduationCap",
    kicker: "Workshops",
    summary: "Workshops that leave owners and a next step.",
    detail:
      "Live sessions against your real systems and backlog: digital readiness, operator working sessions, or a custom day built around the decision you need to make.",
    status: "live",
  },
];

// ---------------------------------------------------------------------------
// ARC Labs - free tools.
// ---------------------------------------------------------------------------
export type ProductVisual =
  | "conformance"
  | "prompt"
  | "skills"
  | "connectivity"
  | "spend"
  | "workflows"
  | "architecture"
  | "security"
  | "governance"
  | "process"
  | "journey";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: Status;
  badge?: string;
  featured?: boolean;
  visual: ProductVisual;
  audience: string;
  howItWorks: string[];
  features: string[];
  /** Primary product action — label must match what the destination actually is. */
  ctaLabel?: string;
  links: { app?: string; github?: string; docs?: string };
  roadmap?: { label: string; done: boolean }[];
};

export const labs: Product[] = [
  {
    slug: "mcp-conformance-scanner",
    name: "MCP Conformance Scanner",
    tagline: "Check any MCP server against the spec in seconds.",
    description:
      "Point it at a Model Context Protocol server and get a conformance report: what passes, what breaks, and what to fix first — written for an operator, not a linter.",
    status: "live",
    badge: "Flagship",
    featured: true,
    visual: "conformance",
    ctaLabel: "Open scanner",
    audience:
      "Teams shipping or consuming MCP servers who need a production gate, not a one-client smoke test.",
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
      app: "https://www.arctransformationgrouplab.dev",
      github: "https://github.com/aking-beep/mcp-conformance-scanner",
      docs: "https://github.com/aking-beep/mcp-conformance-scanner#readme",
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
      "Spend control for Claude Code and Cursor: per-developer burn, a minutes-scale kill switch, and client chargeback — without proxying traffic through a gateway. Free signup; keys encrypted at rest.",
    status: "live",
    badge: "Free product",
    featured: true,
    visual: "spend",
    ctaLabel: "Open TokenLoop",
    audience:
      "Engineering and agency leads running Claude Code and Cursor who find out about runaway spend on the invoice. They need detect-and-cut plus client bill-back without a proxy.",
    howItWorks: [
      "Create a free account (email + password).",
      "Paste Anthropic and/or Cursor admin keys. We AES-256-GCM encrypt them before storage.",
      "Sync spend, set a daily cap / spike multiplier, and optionally tag clients for chargeback.",
      "Kill switch detects spikes ~every 10 minutes and can throttle or revoke via admin APIs.",
    ],
    features: [
      "Per-developer Claude Code + Cursor spend in one pane",
      "Kill switch: detect, alert, throttle, or revoke (admin APIs)",
      "Agency chargeback with markup and CSV export",
      "Keys encrypted at rest. Never returned to the browser",
      "Honest scope: minutes-scale cut, not true per-request blocking",
    ],
    links: {
      app: "https://tokenloop.vercel.app",
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
      "Paste a prompt and get structured feedback on clarity, injection surface, ambiguity, and failure modes. The review a senior engineer would give, minus the wait. Static, reproducible, no model call.",
    status: "live",
    visual: "prompt",
    ctaLabel: "Review a prompt",
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
      app: "https://promptreviewer.arctransformationgrouplab.dev",
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
    slug: "ai-workflow-templates",
    name: "AI Workflow Templates",
    tagline: "Ready-to-run AI workflows you can copy, wire up, and ship today.",
    description:
      "A free, open library of end-to-end AI workflow templates. Each one is a documented pipeline with the prompt, the tools it calls, the data it needs, and the guardrails to keep it safe. Daily briefs, SOWs, RAG, and human-in-the-loop automation, the same shapes ARC uses internally.",
    status: "live",
    badge: "Free catalog",
    visual: "workflows",
    ctaLabel: "Browse templates",
    audience:
      "Operators and engineers who need a copy-pasteable pipeline with a human gate, not a prompt graveyard or an auto-send agent.",
    howItWorks: [
      "Browse by job: operations, consulting, retrieval, automation, quality.",
      "Open a template and copy the prompt, tools, and required input schema.",
      "Run a structural dry-run (no model call) to check the payload.",
      "Keep the human-in-the-loop step. Most templates never auto-send or auto-write.",
    ],
    features: [
      "16 templates from ARC operator packages and the Labs blueprint",
      "Prompt skeletons, tool lists, and example input/output",
      "HITL by default on anything that sends, writes, or pays",
      "JSON API, CLI, and Markdown export. MIT licensed",
    ],
    links: {
      app: "https://aiworkflowtemplates.arctransformationgrouplab.dev",
      github: "https://github.com/aking-beep/ai-workflow-templates",
      docs: "https://github.com/aking-beep/ai-workflow-templates#readme",
    },
    roadmap: [
      { label: "Catalog + dry-run + CLI", done: true },
      { label: "Operator, consulting, RAG, and quality templates", done: true },
      { label: "Runnable reference implementations", done: false },
      { label: "Eval harness per template", done: false },
    ],
  },
  {
    slug: "arc-skills",
    name: "ARC Skills",
    tagline: "Open, copy-pasteable agent skills for real operator work.",
    description:
      "A free, open library of production-ready Agent Skills — each a SKILL.md package with triggers, steps, and guardrails. Copy them into Claude, Cursor, or any Agent Skills runtime. No account, no lock-in.",
    status: "live",
    visual: "skills",
    ctaLabel: "Browse skills",
    audience:
      "Operators and engineers who want copy-pasteable agent skills with documented inputs and guardrails, not a private prompt graveyard.",
    howItWorks: [
      "Browse 20 skills by job: engineering, ops, growth, security, AI, and more.",
      "Copy or download the SKILL.md and drop it into ~/.cursor/skills or .claude/skills.",
      "Keep the guardrails; adapt the trigger phrases to how your users actually ask.",
    ],
    features: [
      "Agent Skills spec (SKILL.md) packages, MIT-licensed",
      "Searchable catalog plus JSON and raw-markdown API",
      "Copy / download with Cursor and Claude install paths",
      "Spec validator in CI so contributions stay loadable",
    ],
    links: {
      app: "https://arc-skills-phi.vercel.app",
      github: "https://github.com/aking-beep/arc-skills",
      docs: "https://github.com/aking-beep/arc-skills#readme",
    },
    roadmap: [
      { label: "20 operator skills + catalog UI", done: true },
      { label: "Copy / download SKILL.md", done: true },
      { label: "JSON + raw markdown API", done: true },
      { label: "Open in Cursor / Claude deep links", done: false },
    ],
  },
  {
    slug: "connectivity-scanner",
    name: "Connectivity Scanner",
    tagline: "Is your endpoint actually reachable, secure, and fast?",
    description:
      "Paste a URL or hostname and get a graded report on DNS, TCP, TLS, redirects, latency, and security headers — with prioritized fixes you can paste into a PR. Free, open source, no account required to start.",
    status: "live",
    badge: "Free",
    visual: "connectivity",
    ctaLabel: "Scan an endpoint",
    audience:
      "Engineers and operators who need a clear-eyed read on whether a public endpoint is up, using modern TLS, and sending the headers a production service should send — before a customer or crawler finds out the hard way.",
    howItWorks: [
      "Paste a URL or hostname (example.com, https://api.example.com, example.com:8443).",
      "We resolve DNS, open TCP, complete a TLS handshake, follow redirects, and time the response.",
      "You get a letter grade plus per-category checks and copy-pasteable fixes.",
      "Gate deploys with the CLI or GitHub Action using --min-grade.",
    ],
    features: [
      "DNS, TCP, HTTP reachability and redirect-chain resolution",
      "TLS handshake, protocol version, hostname match, and expiry window",
      "Connect latency and time-to-first-byte",
      "HSTS, CSP, nosniff, frame, referrer, and Permissions-Policy checks",
      "HTTP→HTTPS upgrade, version-banner leak, and unsafe CORS detection",
      "Markdown / JSON export, CLI, and GitHub Action",
    ],
    links: {
      app: "https://connectivity-scanner.vercel.app",
      github: "https://github.com/aking-beep/connectivity-scanner",
      docs: "https://github.com/aking-beep/connectivity-scanner#readme",
    },
    roadmap: [
      { label: "Scan engine + UI + CLI", done: true },
      { label: "GitHub Action + SSRF-guarded redirects", done: true },
      { label: "Shareable report permalinks", done: false },
      { label: "SVG status badge", done: false },
    ],
  },
  {
    slug: "reference-architectures",
    name: "Reference Architectures",
    tagline: "Battle-tested system blueprints you can adapt instead of starting from a blank diagram.",
    description:
      "A free, open library of 20 reference architectures from ARC delivery work: streaming data, operator AI, Labs products, maturity scoring, and more. Each entry names the problem, the component shape, key decisions, failure modes, when not to use it, and a scaling path.",
    status: "live",
    badge: "Free",
    visual: "architecture",
    ctaLabel: "Browse architectures",
    audience:
      "Engineers and operators who need a proven shape with trade-offs named — not a blank diagram or a vendor reference architecture they cannot defend.",
    howItWorks: [
      "Browse by category: Data, AI, Web, Backend, SaaS, Integration, Cloud.",
      "Read When not to use, then Shape, then Failure modes.",
      "Copy the ASCII (or SVG) diagram into your design doc and adapt the decisions.",
      "Search from the CLI or pull the JSON API — no account required.",
    ],
    features: [
      "20 architectures with origin citations back to Drive",
      "When-not-to-use notes on every entry",
      "Kinesis, Bedrock, HITL, spend control, maturity scoring, and more",
      "JSON API, CLI, and open Markdown under content/",
    ],
    links: {
      app: "https://reference-architectures.vercel.app",
      github: "https://github.com/aking-beep/reference-architectures",
      docs: "https://github.com/aking-beep/reference-architectures#readme",
    },
    roadmap: [
      { label: "Drive-harvested catalog + origin notes", done: true },
      { label: "Search UI, JSON API, CLI", done: true },
      { label: "Mermaid diagrams + IaC snippets", done: false },
      { label: "Well-Architected overlay", done: false },
    ],
  },
  {
    slug: "arc-stack-advisor",
    name: "ARC AI Stack Advisor",
    tagline: "Turn a use case and real constraints into a defensible AI architecture.",
    description:
      "Describe the use case, the data, the budget, and the constraints. Get a decision matrix: the recommended shape, what was ruled out and why, named cost drivers (never invented prices), and a board brief you can copy. Free, no account, nothing stored. Built for the decision teams are actually making now — when not to use an agent, when MCP needs an allowlist, and when the answer is a lookup.",
    status: "live",
    badge: "Free",
    visual: "architecture",
    ctaLabel: "Open advisor",
    audience:
      "CTOs, tech leads, finance partners, and teams with no ML practice who need an architecture they can defend — not a list of trendy tools.",
    howItWorks: [
      "Pick a starter or describe the use case, stack, constraints, team, and budget in plain language.",
      "Deterministic rules match that description to a published catalog of architecture shapes — not vendors.",
      "You get a decision matrix, a copyable board brief, named cost drivers, and the questions you still have to answer.",
      "Every finding quotes the sentence that triggered it. Same input, same output. Nothing is stored.",
    ],
    features: [
      "Free on the site — no account, no email gate",
      "Recommended shape plus ruled-out alternatives with reasons",
      "Workflow vs agent, MCP/tool governance, copilot-on-a-lookup, on-prem, EU AI Act",
      "Deployment, model, and tooling classes — shapes, not product names",
      "Board brief you can copy or print",
      "Markdown / JSON export and a CLI",
    ],
    links: {
      app: "https://arc-stack-advisor.vercel.app",
      docs: "https://arc-stack-advisor.vercel.app/docs",
    },
    roadmap: [
      { label: "Decision matrix + 28 published rules", done: true },
      { label: "Situation gallery + board brief", done: true },
      { label: "Human review of the golden suite", done: false },
      { label: "Optional model narrative (phrasing only)", done: false },
    ],
  },
  {
    slug: "arc-ai-security-scanner",
    name: "ARC AI Security Scanner",
    tagline: "Defensive security review for AI applications.",
    description:
      "Describe an AI application — agents, MCP, RAG, prompts, data flows — and get a graded defensive review covering prompt injection surface, tool authority, data exposure, tenancy, and logging. Every finding quotes your own words. Not a penetration test and not a certification.",
    status: "live",
    badge: "Free",
    featured: true,
    visual: "security",
    ctaLabel: "Open scanner",
    audience:
      "Engineering, security, platform, and AI teams building RAG systems, agents, or MCP-based apps who need an explainable configuration review — not a green checkmark and not an exploit kit.",
    howItWorks: [
      "Paste a sanitized architecture description, prompt pattern, tool list, or RAG data-flow.",
      "Deterministic rules match that text. No model produces a finding or a score.",
      "You get a surface inventory, evidence-backed findings, remediation, and a sequenced defensive blueprint.",
      "Where the description is silent, the report says so. Nothing you paste is stored.",
    ],
    features: [
      "Free on the site — no account, no email gate",
      "19 published SEC-* rules across boundary, tools, RAG, secrets, observability, egress",
      "Every finding cites a verbatim quote from your input",
      "Score from a published rubric, never from a model",
      "Markdown / JSON export and a CLI",
    ],
    links: {
      app: "https://arc-ai-security-scanner.vercel.app",
      docs: "https://arc-ai-security-scanner.vercel.app/docs",
    },
    roadmap: [
      { label: "Rule pack + evidence-backed findings", done: true },
      { label: "Surface inventory + golden suite", done: true },
      { label: "Production deploy", done: true },
      { label: "Optional model narrative (phrasing only)", done: false },
    ],
  },
  {
    slug: "arc-journey-scanner",
    name: "ARC Journey Scanner",
    tagline: "Paste a URL. See where the purchase path stalls.",
    description:
      "Scan a public marketing, product, or checkout page and get an evidence-backed audit of the buying path: missing prices, account walls, sales-only CTAs, thin SPA checkouts, and competing asks. Every finding quotes what was on the page. Free, no account, nothing stored.",
    status: "live",
    badge: "Free",
    visual: "journey",
    ctaLabel: "Scan a purchase path",
    audience:
      "CMOs, product, marketing, and engineering leads who need a specific, citable read on where buyers stall — not a generic conversion checklist.",
    howItWorks: [
      "Paste a public site URL (home, pricing, product, or checkout). Optional notes about what you already know.",
      "We fetch that page and a few same-origin funnel pages (pricing, cart, checkout). No login, no form submit, no payment.",
      "Deterministic rules quote the CTAs, prices, and fields they found. A model never invents a score.",
      "You get a graded report with owner lanes (Marketing, Product, Engineering, Sales) you can hand to the team.",
    ],
    features: [
      "Free on the site — no account, no email gate",
      "URL crawl of the public buy path, plus a describe-a-journey option",
      "Findings cite the actual copy, CTAs, prices, and form fields on the pages",
      "Purchase-path classification: self-serve, account-gated, sales-only, or unclear",
      "Priority actions with owner lanes for CMO, product, engineering, and sales",
      "Markdown / JSON export. Nothing is stored",
    ],
    links: {
      app: "https://arc-journey-scanner.vercel.app",
      docs: "https://arc-journey-scanner.vercel.app/docs",
    },
    roadmap: [
      { label: "Journey rule pack + current/future map", done: true },
      { label: "URL purchase-path crawl + org actions", done: true },
      { label: "Human review of the golden suite", done: false },
      { label: "Optional model narrative (phrasing only)", done: false },
    ],
  },
  {
    slug: "arc-agent-governance",
    name: "ARC Agent Governance",
    tagline: "Know what your agents can reach, what they can do, and where the controls are missing.",
    description:
      "Describe your agents, tools, permissions, and data sources. Get an inventory plus a graded governance review across identity, least privilege, data access, human approval, MCP, and auditability — every finding quotes your own words. Free, no account, nothing stored.",
    status: "live",
    badge: "Free",
    visual: "governance",
    ctaLabel: "Open scanner",
    audience:
      "CIOs, CISOs, AI platform teams, and engineering leads moving from experiments into agent deployment who need to answer what an agent can reach — without a penetration test or a fake certification.",
    howItWorks: [
      "Paste a sanitized description or JSON manifest of agents, tools, and data sources.",
      "Deterministic rules match that text to a published governance rubric. No model produces a score.",
      "You get an inventory, evidence-backed findings, sequenced remediation, and a limitations block.",
      "Download Markdown or JSON. Same input always yields the same report.",
    ],
    features: [
      "Agent / tool / data inventory from prose or sanitized JSON",
      "19 published rules across identity, privilege, data, autonomy, audit, change, and MCP",
      "Governance posture score from a fixed rubric — never a model-generated number",
      "Every finding cites a verbatim quote from your input",
      "Markdown / JSON export and a CLI usable as a CI gate",
    ],
    links: {
      app: "https://arc-agent-governance.vercel.app",
      docs: "https://arc-agent-governance.vercel.app/docs",
    },
    roadmap: [
      { label: "Inventory + 19 deterministic rules", done: true },
      { label: "Markdown export + golden evaluation suite", done: true },
      { label: "Optional model narrative (phrasing only)", done: false },
      { label: "Read-only config integrations", done: false },
    ],
  },
  {
    slug: "arc-workflow-scanner",
    name: "ARC Workflow Scanner",
    tagline: "Describe a workflow. Get back where it actually breaks.",
    description:
      "Paste a process in plain language and get a graded diagnosis across handoffs, rework loops, wait states, and automation readiness — with what to fix, what to automate, and what to leave alone. Free, no account, nothing stored.",
    status: "live",
    badge: "Free",
    visual: "process",
    ctaLabel: "Open scanner",
    audience:
      "Operations, transformation, and product leaders who know a process is inefficient but do not yet know what to change — and do not want fabricated ROI.",
    howItWorks: [
      "Describe the workflow, or list numbered steps if you already know the sequence.",
      "Deterministic rules map friction, rework, and missing ownership from the text you wrote.",
      "You get a current-state map, findings with quotes, and a sequenced blueprint.",
      "Optional volume and cycle-time numbers you supply are recorded as yours — never invented into savings.",
    ],
    features: [
      "Current-state process map from your description",
      "Published rules for handoffs, rework, waits, and human-critical steps",
      "Recommendations that distinguish simplify / automate / keep-human",
      "Markdown / JSON export. Nothing stored",
    ],
    links: {
      app: "https://arc-workflow-scanner.vercel.app",
      docs: "https://arc-workflow-scanner.vercel.app/docs",
    },
    roadmap: [
      { label: "Process map + deterministic rule pack", done: true },
      { label: "Markdown export + golden cases", done: true },
      { label: "Document upload (sandboxed)", done: false },
    ],
  },
];

/** Honest Labs proof. Counts we cannot verify yet are omitted, not invented. */
export const labsProof = {
  tools: labs.length,
  note: "Adoption metrics (scans, reports, organizations) will be published here as they accumulate. We will not invent them.",
};

// ---------------------------------------------------------------------------
// ARC Studio - the nine services (migrated from the current site).
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
      "Turning intent into a release plan that actually ships. Charters, milestones, dependencies, governance: the unglamorous work that decides whether anything launches.",
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
      "The whole picture, in five to seven weeks. Architecture, data, infrastructure, security, operations, and AI together, then a phased 6-12 month roadmap with real owners, sized risks, and sequenced spend.",
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
    text: "What does winning look like, and how do we size the work to the problem you actually have?",
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
  "Companies, nonprofits, teams, and communities that feel the gap between digital change and real readiness.",
  "Operators who want a working system, not a slide deck.",
  "Groups ready to put real data, real users, and real effort behind the work.",
  "Leaders who want one honest partner across strategy, build, and scale — not a pile of vendors to manage.",
];

// ---------------------------------------------------------------------------
// ARC Research - grounded, cited briefs.
// ---------------------------------------------------------------------------
export type {
  Article,
  ArticleSection,
  Citation,
} from "./research";
export { research, getResearchBySlug } from "./research";

// ---------------------------------------------------------------------------
// ARC Academy - workshops.
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
  "A team that can keep moving after the workshop ends.",
];

// ---------------------------------------------------------------------------
// Case studies - reusable template content.
// ---------------------------------------------------------------------------
export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  status: Status;
  kind: "career" | "arc";
  industry: string;
  summary: string;
  problem: string;
  intervention: string;
  deliverable: string;
  timeframe: string;
  challenge: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-cybersecurity-release-value",
    client: "Confidential · global cybersecurity company",
    title: "Coordinating 300+ features so release investment produced sales, not just shipped code",
    status: "live",
    kind: "career",
    industry: "Enterprise cybersecurity",
    summary:
      "An enterprise cybersecurity product line where feature volume had outpaced release value. The work was to coordinate 300+ features into a program that improved what actually reached customers — and what that was worth.",
    problem:
      "A large security product surface was shipping a high volume of features without a shared view of which releases moved customer value or revenue. Coordination cost was rising; release value was not.",
    intervention:
      "Program leadership across product, engineering, and go-to-market: a single coordination model for 300+ features, with release-value scoring instead of feature-count as the success measure.",
    deliverable:
      "A coordinated release program, a value framework operators could run without the original program lead in the room, and an investment sequence tied to sales impact.",
    timeframe: "Multi-year product program",
    challenge:
      "Enterprise cybersecurity buyers do not pay for feature volume. They pay for releases that reduce risk and can be sold. The organization was optimizing for coordination of more work, not for the value of what shipped.",
    approach: [
      "Inventory the live feature surface and how it mapped to release trains and sales motions.",
      "Install a release-value model so the program could say no to work that did not move the number.",
      "Coordinate 300+ features through one operating cadence with named owners.",
      "Tie program reporting to sales impact, not to story-point burn.",
    ],
    outcomes: [
      { metric: "300+", label: "Features coordinated" },
      { metric: "25%", label: "Improvement in release value" },
      { metric: "$8M+", label: "Annual sales impact" },
    ],
  },
  {
    slug: "consumer-cdp-tens-of-millions",
    client: "Confidential · large-scale consumer platform",
    title: "Customer-data architecture at tens of millions of profiles",
    status: "live",
    kind: "career",
    industry: "Live entertainment · consumer platforms",
    summary:
      "CDP and data-platform delivery for a consumer business operating at Ticketmaster scale: tens of millions of customer profiles, complex enterprise constraints, and a platform that had to hold up under live-event load.",
    problem:
      "Customer data was fragmented across ticketing, marketing, and experience systems. Reporting could not be trusted at the scale the business actually ran, and new products could not share a single profile of the customer.",
    intervention:
      "Enterprise data-platform and CDP architecture: identity, profile assembly, and delivery patterns that could serve tens of millions of customers without pretending a warehouse was a product.",
    deliverable:
      "A customer-data architecture and delivery program that operators could run — pipelines, identity, access, and the failure modes named before they hit a live event.",
    timeframe: "Enterprise delivery program",
    challenge:
      "Live-entertainment platforms do not get a quiet quarter to rebuild. The data layer had to support tens of millions of profiles while the business kept selling tickets, running events, and talking to fans.",
    approach: [
      "Map the real profile graph: who the customer was across ticketing, CRM, and experience systems.",
      "Design CDP patterns for identity resolution, consent, and activation at that scale.",
      "Sequence delivery so the platform could take load during live events, not only in a staging diagram.",
      "Name failure modes: identity collisions, late data, and access that was too wide for the data it touched.",
    ],
    outcomes: [
      { metric: "10M+", label: "Customer profiles in scope" },
      { metric: "CDP", label: "Enterprise data architecture" },
      { metric: "Live events", label: "Delivery under real load" },
    ],
  },
  {
    slug: "brand-consumer-lego-nfl",
    client: "LEGO · NFL · live entertainment",
    title: "Brand and consumer programs at global scale",
    status: "live",
    kind: "career",
    industry: "Consumer brands · live entertainment",
    summary:
      "Technology delivery for global consumer brands and live-entertainment platforms — including programs with LEGO and the NFL — where the work had to survive real fans, real events, and real brand standards.",
    problem:
      "Consumer and live-entertainment programs fail when the stack is treated as a campaign site: no operating model, no data trust, and no plan for what happens when the event or product launch is over.",
    intervention:
      "Hands-on delivery across platforms, data, and operations for brand and entertainment programs that had to work in production, not in a pitch.",
    deliverable:
      "Shipped platforms and operating patterns for consumer and live-entertainment work, including programs with LEGO and the NFL, with owners who could run the next version.",
    timeframe: "Multiple brand and entertainment programs",
    challenge:
      "Global brands and leagues do not buy clever demos. They buy systems that hold up for fans, partners, and internal operators — on a deadline that does not move.",
    approach: [
      "Treat brand and entertainment work as production systems: data, access, failure modes, and who owns the runbook.",
      "Build to the event or launch calendar, not to an unbounded transformation slide.",
      "Keep the next version cheaper than the first — because campaigns become platforms whether you plan for it or not.",
    ],
    outcomes: [
      { metric: "LEGO", label: "Brand and consumer programs" },
      { metric: "NFL", label: "Live-entertainment programs" },
      { metric: "F100/F500", label: "Environments the work shipped in" },
    ],
  },
  {
    slug: "transformation-diagnostic",
    client: "Confidential · mid-market operator",
    title: "Three competing initiatives, one sequenced roadmap",
    status: "live",
    kind: "arc",
    industry: "Digital transformation",
    summary:
      "An Integrated Transformation Diagnostic: three overlapping digital bets, no shared view of debt, and a board asking which one to fund. Five weeks later — one sequenced plan with named owners and an investment order.",
    problem:
      "Leadership was running three digital initiatives with no shared map of architecture, data, security, or operations. Vendors were filling the vacuum with product demos. Nobody could defend a funding sequence.",
    intervention:
      "A five-week Integrated Transformation Diagnostic across architecture, data, infrastructure, security, operations, and opportunity areas. Every recommendation scored on business value, risk, feasibility, and adoption.",
    deliverable:
      "A board-ready executive summary, a phased roadmap, named owners, sized risks, and a sequence of spend the operators could actually execute.",
    timeframe: "5-week diagnostic",
    challenge:
      "The organization did not need another strategy deck. It needed one plan that killed or resequenced competing bets, with owners who would still be there after the workshop high wore off.",
    approach: [
      "Current-state across architecture, data, infra, security, operations, and AI-where-it-helps.",
      "Score every opportunity on the four axes — drop anything that fails them.",
      "Resequence three initiatives into one investment order.",
      "Write the output for the board and for the people who have to run it.",
    ],
    outcomes: [
      { metric: "3 → 1", label: "Competing initiatives, resequenced" },
      { metric: "5 wks", label: "Diagnostic to board-ready plan" },
      { metric: "Named owners", label: "Investment sequence attached" },
    ],
  },
];

// ---------------------------------------------------------------------------
// FAQ - shared across About and Studio.
// ---------------------------------------------------------------------------
export const faqs = [
  {
    q: "Do you only work on AI projects?",
    a: "No. ARC is a digital transformation practice. AI is one part of the mix, alongside data, cloud, cybersecurity, process change, and delivery. If AI is not the highest-ROI move, we will say so.",
  },
  {
    q: "How do most engagements start?",
    a: "Usually with a diagnostic, about three to seven weeks, that ends in a clear summary and a phased roadmap. After that we stay on for delivery if the problem still needs us — sized to what you need, not to a menu of packages.",
  },
  {
    q: "Are the Labs tools really free?",
    a: "Most Labs tools are free to run with no account. A few, like TokenLoop, use a free signup so secrets stay encrypted to your organization. There is no paid tier. Studio is optional if you want a human read on what the tools surface.",
  },
  {
    q: "What is ARC Academy?",
    a: "Workshops only. Live sessions against your real systems and backlog: digital readiness and vocabulary, technical operator sessions, or a custom day built around your problem. No course catalog and no certification product right now.",
  },
  {
    q: "How do you size the work?",
    a: "From the problem. We look at what you actually need and what is reasonable for that organization, then we size the engagement to match. The discovery call is to find that fit — not to quote a menu.",
  },
  {
    q: "Will you just build whatever we ask for?",
    a: "Not if it would be malpractice. Selling a build before the problem is named is how projects burn money. We will push back, and we are usually grateful later that we did.",
  },
  {
    q: "Where are you based?",
    a: "Remote-first, US-friendly hours. Discovery calls and delivery work happen over video. Workshops can be remote or on-site by arrangement.",
  },
];

// ---------------------------------------------------------------------------
// Navigation.
// ---------------------------------------------------------------------------
export const nav = [
  { label: "Labs", href: "/labs" },
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "Academy", href: "/academy" },
  { label: "About", href: "/about" },
];
