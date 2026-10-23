// ============================================================================
// ARC ecosystem - single source of truth.
// Add a product/service/article here and it shows up across the site.
// ============================================================================

export const site = {
  name: "ARC Transformation Group",
  short: "ARC",
  tagline: "Make technology work for your business.",
  description:
    "ARC helps growing companies work out what to improve, what to automate and what to build across AI, cloud, data, security and software — and then helps get it working.",
  audience: {
    badge: "AI · Automation · Cloud · Security · Software",
    line: "ARC helps growing companies work out what to improve, what to automate and what to build — and then helps get it working.",
  },
  /** The question the practice answers. */
  question: "How should we use technology?",
  email: "aking@arctransformationgroup.com",
  calendly: "https://calendly.com/aking-arctransformationgroup/30min",
  github: "https://github.com/aking-beep",
  // Prefer an org account long-term (e.g. github.com/arctransformationgroup).
  linkedin: "https://www.linkedin.com/in/andrew-k-a676aa178/",
  // Choose ONE canonical domain and redirect the other.
  domain: "https://arctransformationgroup.com",
  team: {
    title: "Senior-led delivery",
    lead: "Fortune 100/500 experience, without the 40-person bench.",
    bio: "We bring twenty years of technology program delivery from Fortune 100 and Fortune 500 environments: cybersecurity product lines, live-entertainment platforms, consumer brands, and customer-data architecture. Our team has coordinated 300+ features on enterprise security releases, improved release value by 25%, and tied program investment to measurable sales impact. We have designed CDP work at tens of millions of profiles, including Ticketmaster-scale delivery, and run brand programs with LEGO and the NFL. ARC exists so mid-size organizations get that same standard without a consulting army.",
    highlights: [
      "Twenty years of technology program delivery in Fortune 100 and Fortune 500 environments",
      "Enterprise cybersecurity: 300+ features coordinated, 25% improvement in release value, sales-linked program impact",
      "Customer-data platforms at tens of millions of profiles, including Ticketmaster-scale live-entertainment delivery",
      "Brand and consumer programs with LEGO and the NFL",
      "Process, data, cloud, and security first. AI when it moves a number we agreed on.",
      "Works with 10–500 person companies, nonprofits, and teams",
    ],
    scope: [
      { metric: "20 yrs", label: "Fortune 100 / 500 technology delivery" },
      { metric: "300+", label: "Features coordinated in cybersecurity" },
      { metric: "25%", label: "Release-value improvement" },
      { metric: "Sales-linked", label: "Program tied to revenue" },
      { metric: "10M+", label: "Customer profiles at CDP scale" },
      { metric: "LEGO · NFL", label: "Brand and consumer programs" },
    ],
  },
};

// ---------------------------------------------------------------------------
// How ARC differs from the other three things a buyer is comparing us to.
// Every row has to survive the buyer repeating it to the
// competitor in question.
// ---------------------------------------------------------------------------
export type Alternative = {
  option: string;
  whoDoesTheWork: string;
  whatYouGet: string;
  afterward: string;
  isArc?: boolean;
};

export const alternatives: Alternative[] = [
  {
    option: "A digital agency",
    whoDoesTheWork: "A senior team pitches. A junior team delivers.",
    whatYouGet: "Campaigns, sites, and brand work.",
    afterward: "A renewal conversation, usually scoped as more campaign.",
  },
  {
    option: "A systems integrator",
    whoDoesTheWork: "A large bench, priced to stay large.",
    whatYouGet: "A platform implementation against a signed statement of work.",
    afterward: "Change requests. The bench stays.",
  },
  {
    option: "A freelancer",
    whoDoesTheWork: "One person, as available.",
    whatYouGet: "Hours against your backlog.",
    afterward: "The knowledge leaves when they do.",
  },
  {
    option: "ARC",
    whoDoesTheWork: "The senior person on your first call stays on the work.",
    whatYouGet: "A scored plan with named owners — then the system, built.",
    afterward: "Your team can run it without us. A retainer only if you want one.",
    isArc: true,
  },
];

/** What digital transformation means in practice for ARC. */
export const digitalTransformation = [
  {
    name: "Technology and infrastructure",
    text: "Cloud, apps, and the systems people use every day. If those wobble, nothing else sticks.",
  },
  {
    name: "Data and insight",
    text: "Reporting leadership can trust. Quality, access, and decisions that hold up in a meeting.",
  },
  {
    name: "Process and operations",
    text: "The work itself, rather than a new login screen. A tool counts when the workflow changes.",
  },
  {
    name: "Cybersecurity and risk",
    text: "Security and privacy built into the change, so growth does not open a hole you cannot close later.",
  },
  {
    name: "People and readiness",
    text: "Skills, owners, and a shared vocabulary. A system nobody can run is not a system.",
  },
  {
    name: "AI and automation when it helps",
    text: "Useful on some problems. Harmful or premature on others. Now that agents hold credentials and can act, we say which — with a human still in the loop.",
  },
];

// ---------------------------------------------------------------------------
// Market signals — what changed recently, what it means, and where we answer it.
// Rule: every signal is dated and sourced. Drop anything older than a quarter
// instead of letting it rot on the homepage.
// ---------------------------------------------------------------------------
export type MarketSignal = {
  /** ISO date of the change itself, not the date we wrote about it. */
  date: string;
  label: string;
  headline: string;
  soWhat: string;
  href: string;
  hrefLabel: string;
  sources: { name: string; url: string }[];
};

export const marketSignalsUpdated = "2026-09-10";

export const marketSignals: MarketSignal[] = [
  {
    date: "2026-07-28",
    label: "Protocols",
    headline: "The standard for connecting AI to your tools changed.",
    soWhat:
      "The 2026-07-28 revision of the Model Context Protocol retires the old startup handshake and session header, and moves that information into every request instead. Existing servers keep working for about a year. If you built or bought one, it needs a check before that window closes.",
    href: "/labs/mcp-conformance-scanner",
    hrefLabel: "Scan a server",
    sources: [
      {
        name: "Model Context Protocol — 2026-07-28 specification",
        url: "https://blog.modelcontextprotocol.io/posts/2026-07-28/",
      },
    ],
  },
  {
    date: "2026-08-02",
    label: "Regulation",
    headline: "EU AI Act transparency rules are in force. The high-risk rules moved to 2027.",
    soWhat:
      "Since 2 August 2026 you have to tell people when they are talking to AI, and mark generated content so it can be detected. The tougher high-risk obligations were pushed to December 2027. Teams who heard \"delayed\" and stopped reading are exposed on the part that already applies.",
    href: "/research/eu-ai-act-transparency-live",
    hrefLabel: "Read the brief",
    sources: [
      {
        name: "European Commission — Article 50 transparency FAQ",
        url: "https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act",
      },
    ],
  },
  {
    date: "2026-08-04",
    label: "Agent risk",
    headline: "A government evaluator caught AI agents acting on the live internet without permission.",
    soWhat:
      "The UK AI Security Institute recorded 19 unsanctioned actions across 10 of 122 test runs. In one, an agent invented fake identities to pressure an open-source maintainer into merging malicious code. Limiting what an agent can reach stopped being a policy sentence.",
    href: "/labs/arc-agent-governance",
    hrefLabel: "Review agent access",
    sources: [
      {
        name: "UK AI Security Institute — incident report INC-2026-07-28-01",
        url: "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing",
      },
      {
        name: "Cloud Security Alliance — identity maturity model for AI agents",
        url: "https://cloudsecurityalliance.org/blog/2026/08/20/governing-ai-agent-identities-an-identity-maturity-model-for-ai-agents",
      },
    ],
  },
  {
    date: "2026-08-18",
    label: "Security",
    headline: "This year's AI breaches came from ordinary links and documents.",
    soWhat:
      "One crafted link was enough to hijack a live Atlassian Rovo session and pull documents out of every connected system. No jailbreak, no stolen password. A connected assistant carries every permission you gave it, and the same pattern keeps showing up in email assistants and developer tools.",
    href: "/labs/arc-ai-security-scanner",
    hrefLabel: "Review an AI app",
    sources: [
      {
        name: "AI Governance Institute — RovoBlast disclosure coverage",
        url: "https://aigovernance.com/news/rovoblast-prompt-injection-exposes-agentic-data-exfiltration-risk-in-atlassian-rovo",
      },
    ],
  },
  {
    date: "2026-08-24",
    label: "Cost",
    headline: "AI coding tools now bill by whichever model answered.",
    soWhat:
      "Cursor's Auto mode charges based on the model that handled each request, plus a $0.25-per-million token rate on third-party models for teams, and the old flat enterprise rate expired on 7 September 2026. Claude Code runs roughly $150–250 per developer per month. The same task costs a different amount on a different day, which makes a monthly budget hard to hold.",
    href: "/labs/tokenloop",
    hrefLabel: "Open TokenLoop",
    sources: [
      {
        name: "Cursor — Models & Pricing",
        url: "https://cursor.com/docs/models-and-pricing",
      },
      {
        name: "Anthropic — Claude Code cost documentation",
        url: "https://code.claude.com/docs/en/costs",
      },
    ],
  },
  {
    date: "2026-08-26",
    label: "Enterprise apps",
    headline: "Your business software is growing AI agent access, with a meter on it.",
    soWhat:
      "Salesforce put its CRM inside Claude and opened the platform to agents through tools, APIs, and the command line. Agents inherit whatever permissions the user already has, and the usage is billed against your API consumption. Vendors are shipping agent access whether or not you asked for it.",
    href: "/agent-readiness",
    hrefLabel: "Assess agent readiness",
    sources: [
      {
        name: "Salesforce — Claudeforce announcement",
        url: "https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/",
      },
      {
        name: "Salesforce — Headless 360",
        url: "https://www.salesforce.com/headless/",
      },
    ],
  },
  {
    date: "2026-09-06",
    label: "Skills",
    headline: "Unused skills now have a meter. Operators cannot keep them in sync.",
    soWhat:
      "Ask HN on managing SKILL.md files is still on the front page: people symlink one folder into Claude and Codex, while unused skills tax context. Claude Code's /skill-doctor names dead skills and their token cost. The official install path is a plugin marketplace, not a gist.",
    href: "/playbook",
    hrefLabel: "Get the skills library",
    sources: [
      {
        name: "Ask HN — How do you manage skills files?",
        url: "https://news.ycombinator.com/item?id=49589914",
      },
      {
        name: "Claude Code changelog — /skill-doctor",
        url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
      },
    ],
  },
];

export type Status = "live" | "building" | "planned";

export const statusLabel: Record<Status, string> = {
  live: "Live",
  building: "In progress",
  planned: "Planned",
};

/**
 * Maturity is deliberately separate from Status. Status says whether a thing
 * exists; maturity says how far you should trust it. An experiment must never
 * be presented with the same weight as something we support.
 */
export type Maturity =
  | "available"
  | "design-partners"
  | "in-development"
  | "open-source"
  | "experiment"
  | "alpha"
  | "research";

export const maturityLabel: Record<Maturity, string> = {
  available: "Available",
  "design-partners": "Design partners",
  "in-development": "In development",
  "open-source": "Open source",
  experiment: "Experiment",
  alpha: "Alpha",
  research: "Research",
};

// ---------------------------------------------------------------------------
// Labs — open tools, scanners and experiments.
// Every entry carries its maturity. Nothing here is sold as a product.
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
  /**
   * Real maturity, shown on every card and page. A Labs project is never
   * presented with the weight of a commercial product, so this is required.
   */
  maturity: Maturity;
  badge?: string;
  featured?: boolean;
  visual: ProductVisual;
  audience: string;
  howItWorks: string[];
  features: string[];
  /** Primary product action — label must match what the destination is. */
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
      "Point it at a Model Context Protocol server and get a report: what passes, what breaks, and what to fix first, written for an operator to act on. The July 2026 spec revision changed how servers start up, so \"it works in one client\" is no longer evidence that it works.",
    status: "live",
    maturity: "open-source",
    badge: "Flagship",
    featured: true,
    visual: "conformance",
    ctaLabel: "Scan a server",
    audience:
      "Teams shipping or consuming MCP servers who need a production gate rather than a one-client smoke test — especially now that enterprise platforms are publishing tool surfaces by the dozen.",
    howItWorks: [
      "Paste a server URL or point the CLI at your local process.",
      "We exercise the transport, capability, and schema behavior your server advertises.",
      "You get a graded report with prioritized fixes an operator can act on.",
      "Share the link with a teammate or drop it into CI when the Action ships.",
    ],
    features: [
      "Handshake, capability, and negotiation checks for session-based servers",
      "Tool, resource, and prompt schema validation",
      "Prioritized findings written for an operator to act on",
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
      { label: "2026-07-28 rule pack: server/discover, per-request _meta, routing headers", done: false },
      { label: "CI GitHub Action", done: false },
    ],
  },
  {
    slug: "tokenloop",
    name: "TokenLoop",
    tagline: "Stop AI coding-agent spend before the invoice.",
    description:
      "Spend control for Claude Code and Cursor: what each developer is burning, a kill switch that acts within minutes, and client chargeback — without routing your traffic through a gateway. Free signup, keys encrypted at rest.",
    status: "live",
    maturity: "alpha",
    badge: "Free product",
    featured: true,
    visual: "spend",
    ctaLabel: "Open TokenLoop",
    audience:
      "Engineering and agency leads running Claude Code and Cursor who currently find out about runaway spend on the invoice. Flat rates have expired and billing now follows whichever model answered, so the number moves on its own.",
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
      "Scope: a minutes-scale cut, not per-request blocking",
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
    maturity: "open-source",
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
    slug: "connectivity-scanner",
    name: "Connectivity Scanner",
    tagline: "Is your endpoint reachable, secure, and fast?",
    description:
      "Paste a URL or hostname and get a graded report on DNS, TCP, TLS, redirects, latency, and security headers — with prioritized fixes you can paste into a PR. Free, open source, no account required to start.",
    status: "live",
    maturity: "open-source",
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
    slug: "arc-stack-advisor",
    name: "ARC AI Stack Advisor",
    tagline: "Turn a use case and your constraints into a defensible AI architecture.",
    description:
      "Describe the use case, the data, the budget, and the constraints. Get a decision matrix: the recommended shape, what was ruled out and why, named cost drivers (never invented prices), and a board brief you can copy. Free, no account, nothing stored. Built for the decisions teams are making now: when not to use an agent, when a tool needs an allowlist, and when the answer is just a database lookup.",
    status: "live",
    maturity: "alpha",
    badge: "Free",
    visual: "architecture",
    ctaLabel: "Open advisor",
    audience:
      "CTOs, tech leads, finance partners, and teams with no ML practice who need an architecture they can defend in a budget conversation.",
    howItWorks: [
      "Pick a starter or describe the use case, stack, constraints, team, and budget in plain language.",
      "Deterministic rules match that description to a published catalog of architecture shapes — not vendors.",
      "You get a decision matrix, a copyable board brief, named cost drivers, and the questions you still have to answer.",
      "Every finding quotes the sentence that triggered it. Same input, same output. Nothing is stored.",
    ],
    features: [
      "Free on the site — no account, no email gate",
      "Recommended shape plus ruled-out alternatives with reasons",
      "Workflow vs agent, MCP/tool governance, copilot-on-a-lookup, on-prem, and the EU AI Act duties that already apply",
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
      "Describe an AI application — agents, MCP, retrieval, prompts, data flows — and get a graded defensive review covering prompt injection, what your tools are allowed to do, data exposure, tenancy, and logging. Every finding quotes your own words back to you. Not a penetration test and not a certification.",
    status: "live",
    maturity: "alpha",
    badge: "Free",
    featured: true,
    visual: "security",
    ctaLabel: "Review an AI app",
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
    maturity: "experiment",
    badge: "Free",
    visual: "journey",
    ctaLabel: "Scan a purchase path",
    audience:
      "CMOs, product, marketing, and engineering leads who need a specific, citable read on where buyers stall on their own site.",
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
      "Describe your agents, tools, permissions, and data sources. Get an inventory plus a graded review across identity, permissions, data access, human approval, and audit trails — every finding quotes your own words back to you. Free, no account, nothing stored.",
    status: "live",
    maturity: "alpha",
    badge: "Free",
    visual: "governance",
    ctaLabel: "Review agent access",
    audience:
      "CIOs, CISOs, and engineering leads whose vendors switched on agent access this year — CRM tools, coding agents, connected assistants — and who now have to answer what those agents can reach.",
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
    tagline: "Describe a workflow. Get back where it breaks.",
    description:
      "Paste a process in plain language and get a graded diagnosis across handoffs, rework loops, wait states, and automation readiness — with what to fix, what to automate, and what to leave alone. Free, no account, nothing stored.",
    status: "live",
    maturity: "experiment",
    badge: "Free",
    visual: "process",
    ctaLabel: "Scan a workflow",
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

/** Labs proof. Counts we cannot verify yet are omitted rather than invented. */
export const labsProof = {
  tools: labs.length,
  note: "We'll publish usage numbers when we have them.",
};

export const labGroups = [
  {
    id: "ai",
    name: "AI engineering",
    lead: "Check an MCP server, review a prompt, or see what your agents can reach.",
    slugs: ["mcp-conformance-scanner", "prompt-reviewer", "arc-agent-governance"],
  },
  {
    id: "security",
    name: "Security and infrastructure",
    lead: "What's reachable, what's misconfigured, and where an AI app is exposed.",
    slugs: ["connectivity-scanner", "arc-ai-security-scanner"],
  },
  {
    id: "architecture",
    name: "Architecture and planning",
    lead: "A stack decision you can defend, built from your constraints, your data and your budget.",
    slugs: ["arc-stack-advisor"],
  },
  {
    id: "cost",
    name: "Cost control",
    lead: "See coding-agent spend before the invoice hits. Routed-model pricing moves the number daily.",
    slugs: ["tokenloop"],
  },
  {
    id: "operations",
    name: "Operations and journeys",
    lead: "Where a purchase path stalls, and where the operating workflow breaks.",
    slugs: ["arc-journey-scanner", "arc-workflow-scanner"],
  },
];

// ---------------------------------------------------------------------------
// ARC Advisory — scoped reviews, delivery and retainers.
// Each engagement has a detail page at /advisory/[slug].
// ---------------------------------------------------------------------------
export type AdvisoryEngagement = {
  slug: string;
  /** Plain-language category shown on the card so people can scan for their problem. */
  focus: string;
  name: string;
  tagline: string;
  blurb: string;
  duration: string;
  flagship?: boolean;
  startsWith: string;
  youLeaveWith: string;
  whoFor: string;
  notFor: string[];
  deliverables: string[];
  buildOptions: string[];
  scoping: string[];
  typicalFollowOn?: string;
};

export const advisoryEngagements: AdvisoryEngagement[] = [
  {
    slug: "ai-readiness-audit",
    focus: "AI strategy",
    name: "AI Readiness Audit",
    tagline: "Decide where AI belongs — and where it doesn't — before anyone writes code.",
    blurb:
      "We score four things against the workflows you run: what you can do today, what you are trying to achieve, whether your teams can support it, and the habits that will either carry the change or kill it. You leave knowing which bet to fund and which to defer.",
    duration: "3–4 weeks",
    startsWith:
      "Your processes, access to your data, and the people who would have to run whatever gets built.",
    youLeaveWith:
      "A scored readiness snapshot, a classified automation backlog, and a 30/60/90-day roadmap with owners.",
    whoFor:
      "Leadership teams being pushed toward AI without a clear workflow, owner, or constraint. Operators who have discovered AI is already running in six places on someone else's credit card and want one scored plan instead of six pilots.",
    notFor: [
      "Teams that already have a scoped MVP and just need hands to implement it — start with AI Solution Concept + MVP Scope, or a Post-Diagnostic retainer.",
      "Organizations looking for a vendor demo tour instead of a decision framework.",
    ],
    deliverables: [
      "Readiness scorecard across capability, intent, teams, and habits — each scored with evidence",
      "Shadow-AI inventory: which tools and agents are already in use, who turned them on, and what they can reach",
      "Process opportunity map tied to the workflows your team runs",
      "Classified automation backlog: ship now, fix prerequisites first, or defer",
      "30/60/90-day roadmap with named owners and success measures",
      "Human-review gates identified for any workflow touching judgment, compliance, or customer trust",
    ],
    buildOptions: [
      "MVP scope and functional requirements for the top-ranked opportunity",
      "Retrieval or workflow implementation on AWS — design through production rollout",
      "Post-Diagnostic Execution Retainer: roadmap items delivered in monthly sprints",
      "Fractional Head of AI / Transformation retainer for ongoing governance and vendor judgment",
    ],
    scoping: [
      "Discovery call (30 min): confirm the problem, the stakeholders, and whether this is the right front door",
      "Intake: access to key systems, sample workflows, and the people who run them",
      "Week 1–2: workflow interviews, data and integration review, team capability assessment",
      "Week 2–3: scorecard draft, opportunity map, backlog classification",
      "Week 3–4: roadmap finalization, exec readout, handoff to delivery or retainer if scoped",
    ],
    typicalFollowOn:
      "AI Solution Concept + MVP Scope, or a Post-Diagnostic Execution Retainer to ship the first workflow.",
  },
  {
    slug: "technical-architecture-review",
    focus: "Architecture",
    name: "Technical Architecture Review",
    tagline: "Understand whether the system can scale — and what it costs to operate.",
    blurb:
      "Program-level review of how your platform is built, where debt concentrates, and what to modernize first. Written for operators and boards, not architects performing for each other.",
    duration: "3–4 weeks",
    startsWith:
      "Code, architecture diagrams, deployment history, and the operating constraints you have, rather than a whiteboard version of them.",
    youLeaveWith:
      "A prioritized findings list, a modernization sequence, and risks an operator can act on Monday.",
    whoFor:
      "Teams evaluating an acquisition, planning a platform rewrite, or stuck between 'it works' and 'it won't survive the next growth phase.' CTOs and engineering leads who need a clear read before committing spend.",
    notFor: [
      "Line-by-line code review for compliance sign-off — that is a different engagement.",
      "Teams that need a delivery program stood up — pair this with Delivery Program Setup.",
    ],
    deliverables: [
      "Current-state architecture map: services, data flows, integrations, and ownership",
      "Risk register with severity, likelihood, and remediation cost estimates",
      "Technical debt inventory grouped by business impact rather than code smell",
      "Modernization roadmap sequenced by dependency and ROI",
      "One-page executive summary for board or investor conversations",
    ],
    buildOptions: [
      "Platform migration or re-architecture — scoped sprints with CI/CD gates",
      "Service decomposition or API boundary work",
      "Fractional Cloud / Platform Advisor retainer for ongoing architecture decisions",
      "Cloud & DevOps Readiness Review if CI/CD and observability are the primary blockers",
    ],
    scoping: [
      "Discovery call: confirm scope boundaries, systems in play, and decision timeline",
      "Access: repos, infra diagrams, deployment configs, incident history",
      "Week 1: architecture walk-through with engineering leads, dependency mapping",
      "Week 2: debt and risk assessment, stakeholder interviews on pain points",
      "Week 3–4: findings synthesis, roadmap draft, exec readout and handoff",
    ],
    typicalFollowOn:
      "Cloud & DevOps Readiness Review for pipeline gaps, or Fractional Cloud / Platform Advisor for ongoing decisions.",
  },
  {
    slug: "cloud-devops-readiness",
    focus: "Cloud & DevOps",
    name: "Cloud & DevOps Readiness Review",
    tagline: "Find out why releases hurt — and what to fix in the pipeline first.",
    blurb:
      "Cloud posture, CI/CD audit, observability gaps, and scalability recommendations. Grounded in how your team deploys today, rather than how a reference architecture says they should.",
    duration: "2–3 weeks",
    startsWith:
      "Your pipelines, environments, deployment frequency, and the incidents that keep repeating.",
    youLeaveWith:
      "A CI/CD maturity snapshot, observability gap list, and a sequenced fix plan your platform team can execute.",
    whoFor:
      "Platform and DevOps leads where releases are painful, environments drift, or nobody trusts the monitoring. Teams mid-migration who need a clear read before committing to the next phase.",
    notFor: [
      "Full cloud migration execution — this scopes it; a retainer or scoped build delivers it.",
      "Security compliance certification — pair with the Security & Compliance Posture Review for that lens.",
    ],
    deliverables: [
      "Cloud posture assessment: accounts, networking, cost patterns, and blast radius",
      "CI/CD pipeline audit: build, test, deploy stages, environment promotion, rollback capability",
      "Observability review: logging, metrics, alerting, and on-call readiness",
      "Scalability recommendations with effort estimates",
      "Prioritized remediation roadmap sequenced by release risk reduction",
    ],
    buildOptions: [
      "CI/CD pipeline rebuild: GitHub Actions, AWS CodePipeline, or your stack — through to production gates",
      "Infrastructure-as-code migration (Terraform, CDK, CloudFormation)",
      "Observability stack setup: CloudWatch, Datadog, or Grafana with alert routing",
      "Fractional TPM / Delivery Program Lead if releases need governance as well as tooling",
    ],
    scoping: [
      "Discovery call: confirm cloud provider, team size, and the release pain you want solved",
      "Access: CI/CD configs, infra repos, monitoring dashboards, recent incident postmortems",
      "Week 1: pipeline walk-through, environment inventory, deployment frequency analysis",
      "Week 2: observability and scalability assessment, stakeholder interviews",
      "Week 2–3: findings report, roadmap, and handoff to build or retainer",
    ],
    typicalFollowOn: "Post-Diagnostic Execution Retainer for pipeline rebuild, or Fractional TPM for release governance.",
  },
  {
    slug: "data-health-analytics",
    focus: "Data & analytics",
    name: "Data Health & Analytics Readiness",
    tagline: "Find out why leadership doesn't trust the numbers — and fix the first workflow.",
    blurb:
      "Data flow map, schema audit, quality scoring, and a remediation roadmap. The goal is a reporting workflow your team can run without a heroic analyst.",
    duration: "2–3 weeks",
    startsWith:
      "The reports leadership already uses — and the spreadsheets they fall back on when those reports are wrong.",
    youLeaveWith:
      "A data-trust diagnosis, a sequenced platform path, and the first governed workflow worth shipping.",
    whoFor:
      "Operators where dashboards exist but nobody trusts them. Teams planning a CDP, warehouse, or analytics platform migration. Leaders who need data to support decisions, not decorate slide decks.",
    notFor: [
      "Full data platform build — this scopes it; delivery is a separate engagement.",
      "Real-time streaming architecture from scratch without a defined use case.",
    ],
    deliverables: [
      "Data flow map: sources, pipelines, transformations, and consumption points",
      "Schema audit with lineage gaps and duplication flagged",
      "Data quality scoring on the datasets that drive decisions",
      "Reporting trust assessment: which numbers leadership uses vs. ignores",
      "Remediation roadmap with the first governed workflow identified",
    ],
    buildOptions: [
      "First governed pipeline: ETL/ELT setup, dbt models, or event tracking for one critical workflow",
      "CDP or warehouse migration scoped to one domain (customer, product, finance)",
      "Data quality monitoring and alerting for production datasets",
      "Fractional Cloud / Platform Advisor if data infra decisions need ongoing judgment",
    ],
    scoping: [
      "Discovery call: confirm data sources, reporting pain, and decision timeline",
      "Access: sample reports, pipeline configs, schema docs, and the analyst who knows where bodies are buried",
      "Week 1: data flow mapping, stakeholder interviews on trust gaps",
      "Week 2: schema and quality assessment, platform options evaluation",
      "Week 2–3: roadmap, first workflow recommendation, exec readout",
    ],
    typicalFollowOn: "Post-Diagnostic Execution Retainer to ship the first governed workflow.",
  },
  {
    slug: "security-compliance-posture",
    focus: "Security & compliance",
    name: "Security & Compliance Posture Review",
    tagline: "Find the weaknesses that would hurt you most, ranked by what they would cost.",
    blurb:
      "Risk matrix, access and secrets review, remediation roadmap, and SOC 2 / GDPR / CCPA readiness notes. Readiness work that tells you what to fix first, not audit theater.",
    duration: "2–3 weeks",
    startsWith:
      "Access controls, secrets management, logging, and the systems holding the data that would hurt most to lose.",
    youLeaveWith:
      "A ranked exposure list, a 30/60/90 hardening plan, and named owners for the first fixes.",
    whoFor:
      "Teams approaching SOC 2, GDPR, or CCPA requirements. Startups scaling past 'everyone is admin.' Operators who know something is wrong but can't prioritize across competing alerts.",
    notFor: [
      "Penetration testing or red-team exercises — we scope readiness, not offensive security.",
      "Compliance certification body work — we prepare you; an auditor certifies.",
    ],
    deliverables: [
      "Risk matrix: threats, likelihood, impact, and current controls",
      "Access and secrets review: IAM policies, credential storage, rotation gaps",
      "Non-human identity review: service accounts and agent credentials, their scopes, and how they get revoked",
      "Logging and monitoring assessment for security-relevant events",
      "Remediation roadmap prioritized by exposure and compliance timeline",
      "SOC 2 / GDPR / CCPA readiness notes with gap analysis",
    ],
    buildOptions: [
      "IAM hardening and least-privilege rollout",
      "Secrets management migration (AWS Secrets Manager, Vault, or your stack)",
      "Security monitoring and alert routing setup",
      "Compliance program scaffolding: policies, evidence collection, audit prep",
    ],
    scoping: [
      "Discovery call: confirm compliance targets, timeline, and systems in scope",
      "Access: IAM configs, secrets inventory, logging setup, existing policies",
      "Week 1: access and secrets review, risk identification",
      "Week 2: logging, monitoring, and compliance gap analysis",
      "Week 2–3: risk matrix, remediation roadmap, exec readout",
    ],
    typicalFollowOn: "Post-Diagnostic Execution Retainer for hardening sprints, or Fractional Cloud / Platform Advisor for ongoing posture.",
  },
  {
    slug: "ai-solution-mvp-scope",
    focus: "AI build scope",
    name: "AI Solution Concept + MVP Scope",
    tagline: "Turn a ranked opportunity into something engineering can build.",
    blurb:
      "Workflow design, MVP scope, functional requirements, KPI framework, and rollout plan. The output is a build-ready package: scope, requirements and a rollout plan engineering can start on.",
    duration: "3–5 weeks",
    startsWith:
      "One scored opportunity — from the AI Readiness Audit or your own prioritization — with a named owner and access to the data it needs.",
    youLeaveWith:
      "Functional requirements, architecture sketch, KPI framework, and a rollout plan with human-review gates defined.",
    whoFor:
      "Teams that know what problem to solve but need it scoped for engineering. Product and engineering leads who want a build package rather than a strategy deck. Organizations ready to commit build resources after the scope is signed.",
    notFor: [
      "Teams still deciding whether to do AI at all — start with the AI Readiness Audit.",
      "Organizations wanting us to build without signed scope — we scope first, then deliver.",
    ],
    deliverables: [
      "Workflow design: inputs, processing steps, outputs, and exception handling",
      "MVP scope document with in/out boundaries and acceptance criteria",
      "Functional requirements engineering can estimate against",
      "KPI framework: what success looks like in numbers, measured how",
      "Rollout plan: pilot cohort, review gates, production criteria, and rollback triggers",
      "Human-in-the-loop design for steps requiring judgment or compliance review",
    ],
    buildOptions: [
      "MVP implementation on AWS Bedrock: RAG pipeline, agent workflow, or API integration",
      "Production rollout with CI/CD gates, monitoring, and cost controls",
      "Post-Diagnostic Execution Retainer for iterative delivery after MVP",
      "Fractional Head of AI / Transformation for ongoing product governance",
    ],
    scoping: [
      "Discovery call: confirm the opportunity, data access, and build timeline",
      "Prerequisite check: an AI Readiness Audit completed, or equivalent prioritization in hand",
      "Week 1–2: workflow design sessions, data and integration mapping",
      "Week 2–3: MVP scope, requirements draft, KPI definition",
      "Week 3–5: architecture sketch, rollout plan, stakeholder sign-off, handoff to build",
    ],
    typicalFollowOn: "Scoped build or Post-Diagnostic Execution Retainer to ship the MVP.",
  },
  {
    slug: "delivery-program-setup",
    focus: "Delivery & release",
    name: "Delivery Program Setup",
    tagline: "Turn intent into a release plan with dates someone owns.",
    blurb:
      "Project charter, milestone plan, a live log of risks and dependencies, a release checklist, and a weekly governance cadence. The unglamorous work that decides whether anything launches on time.",
    duration: "2–3 weeks",
    startsWith:
      "Your backlog, release history, dependency map, and the reasons last quarter's commitments slipped.",
    youLeaveWith:
      "A project charter, milestone plan with owners, RAID log, and a governance cadence your team can run.",
    whoFor:
      "Teams shipping platform work where delivery slips, releases are painful, or governance is missing. Engineering leads who need program structure without hiring a full-time TPM.",
    notFor: [
      "Teams that need technical architecture decisions — pair with the Technical Architecture Review.",
      "Organizations wanting staff augmentation instead of program setup.",
    ],
    deliverables: [
      "Project charter: scope, success criteria, stakeholders, and decision rights",
      "Milestone plan with dependencies, owners, and realistic dates",
      "RAID log: risks, assumptions, issues, and dependencies tracked from day one",
      "Release checklist: definition of done, rollback criteria, and sign-off gates",
      "Weekly governance cadence: standup format, escalation path, and reporting template",
    ],
    buildOptions: [
      "Fractional TPM / Delivery Program Lead retainer to run the program",
      "Release train setup with CI/CD integration and deployment gates",
      "Incident response playbook design (TTD / TTN / TTR targets)",
      "Post-Diagnostic Execution Retainer for roadmap items alongside program governance",
    ],
    scoping: [
      "Discovery call: confirm program scope, team size, and release pain",
      "Access: backlog, recent sprint/release history, org chart for owners",
      "Week 1: stakeholder interviews, dependency mapping, pain point catalog",
      "Week 2: charter draft, milestone plan, RAID log initialization",
      "Week 2–3: governance design, release checklist, team walkthrough and handoff",
    ],
    typicalFollowOn:
      "Fractional TPM / Delivery Program Lead retainer to run the program this sets up.",
  },
  {
    slug: "integrated-transformation-diagnostic",
    focus: "The whole picture",
    name: "Integrated Transformation Diagnostic",
    tagline: "The whole picture — architecture, data, infra, security, and AI — in one sequenced plan.",
    blurb:
      "The architecture, AI readiness, and delivery reviews run together as one engagement. Full current-state across every dimension that affects whether your next bet ships, then a phased 6–12 month roadmap with named owners and sized risks.",
    duration: "5–7 weeks",
    flagship: true,
    startsWith:
      "Competing initiatives, no shared debt map, and a board asking which bet to fund.",
    youLeaveWith:
      "A board-ready summary, named owners, sized risks, and a 6–12 month investment sequence.",
    whoFor:
      "Leadership running parallel digital bets with no shared view of technical debt, data trust, or security posture. Boards or investors asking for a defensible funding sequence. Organizations of 10–500 people ready to commit to a phased plan.",
    notFor: [
      "Single-domain problems — one of the focused diagnostics is faster and cheaper.",
      "Teams wanting a build quote before understanding current state.",
    ],
    deliverables: [
      "Current-state across architecture, data, infrastructure, security, operations, and AI readiness",
      "Executive summary written for the board as well as the engineering team",
      "Phased 6–12 month roadmap with sequenced spend and dependency order",
      "Named owners for every initiative in the plan",
      "Sized risks with mitigation paths and decision triggers",
      "Delivery program scaffolding: charter, milestones, and governance cadence",
    ],
    buildOptions: [
      "Post-Diagnostic Execution Retainer scoped to the roadmap",
      "ARC Partner Retainer for integrated ongoing partnership",
      "Individual builds scoped from roadmap items: platform, data, AI, security",
      "Fractional Head of AI / Transformation or Fractional TPM depending on primary gap",
    ],
    scoping: [
      "Discovery call: confirm competing initiatives, stakeholder map, and board timeline",
      "Access: full system inventory, recent audits or assessments, org chart",
      "Week 1–2: three parallel workstreams — architecture, AI readiness, and delivery assessment",
      "Week 3–4: cross-domain synthesis, opportunity scoring on value, risk, feasibility and adoption",
      "Week 5–6: roadmap draft, owner assignment, risk sizing",
      "Week 6–7: board-ready summary, exec readout, retainer scoping if delivery follows",
    ],
    typicalFollowOn: "ARC Partner Retainer or Post-Diagnostic Execution Retainer to deliver the roadmap.",
  },
];

export function getAdvisoryEngagementBySlug(slug: string): AdvisoryEngagement | undefined {
  return advisoryEngagements.find((o) => o.slug === slug);
}

// ---------------------------------------------------------------------------
// Advisory retainers — monthly engagement models.
// ---------------------------------------------------------------------------
export type Retainer = {
  slug: string;
  name: string;
  bestFit: string;
  commitment: string;
  flagship?: boolean;
};

export const retainers: Retainer[] = [
  {
    slug: "fractional-head-of-ai",
    name: "Fractional Head of AI / Transformation",
    bestFit:
      "No senior AI leader in-house. You need strategy, AI governance, vendor judgment, and something coherent to tell the board.",
    commitment: "30–50 hrs / month",
    flagship: true,
  },
  {
    slug: "fractional-tpm",
    name: "Fractional TPM / Delivery Program Lead",
    bestFit:
      "You are shipping platform work, but delivery slips, releases hurt, and nobody owns the cadence.",
    commitment: "40–60 hrs / month",
  },
  {
    slug: "fractional-cloud-advisor",
    name: "Fractional Cloud / Platform Advisor",
    bestFit:
      "You are mid-migration or scaling infrastructure and need someone senior on the AWS architecture calls.",
    commitment: "30–40 hrs / month",
  },
  {
    slug: "post-diagnostic-execution",
    name: "Post-Diagnostic Execution Retainer",
    bestFit:
      "The natural next step after any ARC review — turn the roadmap into delivered work, sprint by sprint.",
    commitment: "Scoped to the roadmap",
  },
  {
    slug: "arc-partner",
    name: "ARC Partner Retainer",
    bestFit:
      "One ongoing partner across strategy, delivery, and AI instead of a pile of vendors to manage.",
    commitment: "80+ hrs / month",
  },
];

export const bestFit = [
  "Operators in 10–500 person companies, nonprofits, and teams who need a working system at the end of it.",
  "Leaders who want one partner across strategy, build and scale instead of six vendors to coordinate.",
  "Groups ready to put their data, their users and their own time behind the work.",
];

export const notAFit = [
  "You want a large team staffed next week to take over IT.",
  "You need a logo-driven RFP response more than a diagnosis.",
  "The problem is still “we should do AI” with no workflow, owner, or constraint.",
  "You want us to build whatever was already decided, without scoring it.",
];

export const howWeEngage = [
  {
    name: "A scoped start",
    text: "Most clients begin with a two-to-seven week review. You leave with a plan, owners, and a clear next step.",
  },
  {
    name: "Delivery if you still need us",
    text: "If the plan still needs hands on the work, we stay and implement. We size that from the problem, not from a menu.",
  },
  {
    name: "A workshop when the room is stuck",
    text: "Sometimes the issue is getting leadership and operators to agree. That's a half-day or two-day session rather than a six-week diagnostic.",
  },
];

// ---------------------------------------------------------------------------
// ARC Research — grounded, cited briefs.
// ---------------------------------------------------------------------------
export type {
  Article,
  ArticleSection,
  Citation,
} from "./research";
export { research, getResearchBySlug } from "./research";

// ---------------------------------------------------------------------------
// Workshops. Part of the Learn layer, surfaced under /playbooks.
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
    text: "Build a shared vocabulary for digital change, score where you stand, and scope what is worth doing first.",
    detail:
      "Half-day. Leadership and operators in one room. Leave with clear language, a readiness snapshot, and a scoped shortlist.",
    status: "live",
    whoFor:
      "Leadership and operators in companies and nonprofits who keep talking past each other about cloud, data, security, or AI.",
    objectives: [
      "Give the room a shared vocabulary: platforms and cloud, data trust, cybersecurity basics, process change, automation, and AI when it is relevant.",
      "Run a readiness check across awareness, use cases, data and tools, security and guardrails, ownership, and how you will measure success.",
      "Scope a short list of opportunities people can explain the same way, then leave with a 30-day action plan and named owners.",
    ],
    curriculum: [
      "Open and align. Why this session exists, what \"ready\" means here, and what you will leave with. No trends lecture.",
      "Shared vocabulary. Walk the terms teams mix up: digitization vs. digital transformation, pilot vs. production, cloud vs. \"someone else's computer,\" data trust vs. a pretty dashboard, automation vs. judgment, AI when it helps vs. AI theater. Agree on language you will use after the room empties.",
      "Readiness snapshot. Score the current state together: awareness, use-case clarity, workflow integration, data and approved tools, security and basic guardrails, leadership alignment, and measurement. Surface the gaps out loud.",
      "Opportunity scoping. Map the workflows people run this week. For each candidate, name the problem, who uses it, how often it happens, what systems and data it needs, and what risk or review it requires.",
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
    text: "A technical working session against your own systems, scoring the work in front of you on business value, risk, feasibility and adoption.",
    detail:
      "One or two days. We work in your tools and constraints. Leave with a run plan your team can execute without us in the room.",
    status: "live",
    whoFor:
      "Technical and operating leads who need the plan built across architecture, data, infra, security, delivery, and the human loops that keep it stable. Best when you have a running stack and a live backlog to put on the table.",
    objectives: [
      "Separate the strategy from the deliverable: what is a near-term fix, what is a bet, and what ships next month.",
      "Pressure-test the technical path in your actual systems: data trust, connectors, permissions, failure modes, and what breaks when someone is out.",
      "Leave with an operator-ready run plan: owners, sequence, KPIs, and human review where it matters.",
    ],
    curriculum: [
      "Systems walk-through. Get into the running stack: data sources, pipelines, apps, connectors, access, and the workflow you want to change.",
      "Sort the backlog. Separate what needs discovery, what is ready to build, and what is already running and needs measuring. Call out where strategy is being sold as a deliverable.",
      "Score each opportunity on business value, risk, feasibility, and adoption, with your constraints in the room. Drop anything that fails on more than one.",
      "Technical design of the boring next step. Map one workflow end to end: inputs, systems, integrations, checks, and where a human stays in the loop. Call assumptions, dependencies, and unknowns.",
      "Operator run plan. Owners, sequence, dependencies, KPIs, review cadence, and the checks that keep version two cheaper than version one. Written so the team can run it after we leave.",
    ],
    outcomes: [
      "Candidates sorted and scored on value, risk, feasibility and adoption, with constraints visible.",
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
      "Use a short intake to define the question, the audience, and the success criteria before anyone books the room.",
      "Run a tailored working session that still holds the same bar: options scored on value, risk, feasibility and adoption, with assumptions written down and strategy kept separate from what ships.",
      "Leave with owners and a next step specific enough to start, whether the topic was technical, operational, or mission-driven.",
    ],
    curriculum: [
      "Intake (before the day). Scoping call: problem statement, who must be in the room, constraints, materials to bring, and what \"done\" looks like. We send a draft agenda for your sign-off.",
      "Open on your terms. Confirm the decision or artifact the day must produce. Align on vocabulary for this topic so the room is not arguing past each other.",
      "Deep work on your agenda. Facilitated time on the problem you brought. Examples of past custom days include cloud and data modernization, cybersecurity posture, MCP or agent work, CDP migration, governance and risk, delivery structuring, and nonprofit program enablement. Yours may be different.",
      "Decision and owners. Capture what is in, what is out, who holds what, and the first step. Same quality bar as our other workshops: assumptions labeled, next step specific enough for Monday.",
      "Follow-through pack. Agenda notes, decisions, owners, and open questions in a form your team can reuse. Optional follow-up hour if you want a check-in after the first week of work.",
    ],
    outcomes: [
      "A signed agenda and materials built for your problem, rather than a reused template.",
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
  stakes: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-cybersecurity-release-value",
    client: "Confidential · global cybersecurity company",
    title: "Coordinating 300+ features so release investment showed up in sales",
    status: "live",
    kind: "career",
    industry: "Enterprise cybersecurity",
    summary:
      "An enterprise cybersecurity product line where feature volume had outpaced release value. The work was to coordinate 300+ features into a program that improved what reached customers — and what that was worth.",
    problem:
      "A large security product surface was shipping a high volume of features without a shared view of which releases moved customer value or revenue. Coordination cost was rising; release value was not.",
    intervention:
      "Program leadership across product, engineering, and go-to-market: a single coordination model for 300+ features, with release-value scoring instead of feature-count as the success measure.",
    deliverable:
      "A coordinated release program, a value framework operators could run without the original program lead in the room, and an investment sequence tied to sales impact.",
    timeframe: "Multi-year product program",
    stakes:
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
      { metric: "Sales-linked", label: "Program tied to revenue" },
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
      "Customer data was fragmented across ticketing, marketing, and experience systems. Reporting could not be trusted at the scale the business ran, and new products could not share a single profile of the customer.",
    intervention:
      "Enterprise data-platform and CDP architecture: identity, profile assembly, and delivery patterns that could serve tens of millions of customers without pretending a warehouse was a product.",
    deliverable:
      "A customer-data architecture and delivery program that operators could run — pipelines, identity, access, and the failure modes named before they hit a live event.",
    timeframe: "Enterprise delivery program",
    stakes:
      "Live-entertainment platforms do not get a quiet quarter to rebuild. The data layer had to support tens of millions of profiles while the business kept selling tickets, running events, and talking to fans.",
    approach: [
      "Map the profile graph: who the customer was across ticketing, CRM, and experience systems.",
      "Design CDP patterns for identity resolution, consent, and activation at that scale.",
      "Sequence delivery so the platform could take load during live events rather than only in a staging diagram.",
      "Name failure modes: identity collisions, late data, and access that was too wide for the data it touched.",
    ],
    outcomes: [
      { metric: "10M+", label: "Customer profiles in scope" },
      { metric: "CDP", label: "Enterprise data architecture" },
      { metric: "Live events", label: "Delivery under live load" },
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
      "Technology delivery for global consumer brands and live-entertainment platforms — including programs with LEGO and the NFL — where the work had to survive fans, event deadlines and brand standards.",
    problem:
      "Consumer and live-entertainment programs fail when the stack is treated as a campaign site: no operating model, no data trust, and no plan for what happens when the event or product launch is over.",
    intervention:
      "Hands-on delivery across platforms, data, and operations for brand and entertainment programs that had to work in production, not in a pitch.",
    deliverable:
      "Shipped platforms and operating patterns for consumer and live-entertainment work, including programs with LEGO and the NFL, with owners who could run the next version.",
    timeframe: "Multiple brand and entertainment programs",
    stakes:
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
      "A board-ready executive summary, a phased roadmap, named owners, sized risks, and a sequence of spend the operators could execute.",
    timeframe: "5-week diagnostic",
    stakes:
      "The organization did not need another strategy deck. It needed one plan that killed or resequenced competing bets, with owners who would still be there after the workshop high wore off.",
    approach: [
      "Current-state across architecture, data, infra, security, operations, and AI-where-it-helps.",
      "Score every opportunity on business value, risk, feasibility and adoption. Drop anything that fails on more than one.",
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
// FAQ.
// ---------------------------------------------------------------------------
export const faqs = [
  {
    q: "Can I buy Agent Control?",
    a: "Not yet. Agent Control is in design-partner development, and there is no pricing page in front of it. AI Fit is free on the web. Agent Readiness is a free scorecard and a paid assessment. AI Fit Teams is a three-to-four week engagement. The product playbooks are separate: Define is $5, Build is $10, and Ship is $20.",
  },
  {
    q: "Do you only do AI?",
    a: "No. Most of the value in a technology estate is in the systems already running the business: cloud, APIs, data platforms, security, architecture. That is the Modernize side of what we do, and for a lot of clients it is the whole engagement. AI belongs where it moves a number somebody is already measuring.",
  },
  {
    q: "How does work usually start?",
    a: "Three ways, two of them free. Run a scorecard or a Labs tool and read the report. Read a playbook and use the framework without us. Or book a 30-minute call, which leads to a scoped review of two to seven weeks ending in a plan with named owners.",
  },
  {
    q: "Who does the work?",
    a: "The senior person on your first call. We do not pitch with one team and deliver with another, and we do not put a junior bench on your problem after the contract is signed. That is the main reason to pick a small practice over an agency.",
  },
  {
    q: "Our vendors turned on AI agents inside tools we already pay for. Is that a problem?",
    a: "It is the question of the quarter. An agent inside your CRM or your code editor inherits the permissions of whoever runs it, and this year's breaches came from ordinary links and documents rather than exotic attacks. Start with the free Agent Readiness Scorecard, then the Agent Readiness assessment if you need the inventory, the blast-radius ranking and the approval gates.",
  },
  {
    q: "How do you know an automated system did what it said it did?",
    a: "We check the system that was supposed to change. An agent can finish a run while the payment failed, or report a record as updated when the destination system never received it, so the run log is the weakest possible source. Confirmation has to come from the destination, independent of the thing claiming to have changed it. Where we cannot get that confirmation, we report the outcome as unverified.",
  },
  {
    q: "EU AI Act transparency rules applied on 2 August 2026. Does that hit us?",
    a: "If you serve EU users and your product talks to people or generates content, the disclosure and content-marking duties apply to you now. The tougher high-risk obligations moved to December 2027, which is why teams who heard \"delayed\" and stopped reading are exposed on the part that already applies. We give you the readiness read and the gap list; your lawyer and your auditor sign off.",
  },
  {
    q: "Are the Labs tools free?",
    a: "Yes. Most run with no account and store nothing. There is no paid tier. Every Labs project carries its maturity — open source, alpha, experiment or research — so you can tell what is supported and what is not before you depend on it.",
  },
  {
    q: "Why are the playbooks so cheap, or free?",
    a: "The scorecard, the operating contract, and the outcome checklist are free and complete on the page. The three product playbooks are separate purchases: Define is $5, Build is $10, and Ship is $20. If you can run the method without hiring us, that is a good outcome for both of us.",
  },
  {
    q: "How do you size the work?",
    a: "From the problem, and from what is reasonable for that organization. The call is to find that fit, not to quote a menu.",
  },
  {
    q: "Will you just build whatever we ask for?",
    a: "Not if that would waste your money. Selling a build before the problem is named is how projects burn. We will push back.",
  },
  {
    q: "When should we look elsewhere?",
    a: "If you need a large team to take over IT next week, a logo-driven RFP response, or someone to build a decision that has not been scored. We will say no.",
  },
  {
    q: "Where are you based?",
    a: "Remote-first, US-friendly hours. Calls and delivery over video. Workshops can be remote or on-site.",
  },
];

// ---------------------------------------------------------------------------
// Navigation.
//
// Six entries and one button. The previous bar had seven capability names in
// it, which asked a visitor to understand our internal taxonomy before they
// could find their own problem.
//
// Two of the entries open a menu. Everything else a visitor might want —
// research, workshops, the individual scanners, the developer surface — is
// reachable from the page behind the entry it belongs to, and from the footer.
// ---------------------------------------------------------------------------
export type NavItem = {
  label: string;
  href: string;
  /** Rendered as a dropdown when present. */
  children?: { label: string; href: string; summary: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Modernize",
        href: "/services/modernize",
        summary: "Cloud, architecture, data, security and delivery.",
      },
      {
        label: "Automate",
        href: "/services/automate",
        summary: "Where AI saves time, and where it does not belong.",
      },
      {
        label: "Build",
        href: "/services/build",
        summary: "Products, applications, integrations and workflows.",
      },
      {
        label: "Operate",
        href: "/services/operate",
        summary: "Governance, observability, controls and evaluation.",
      },
    ],
  },
  {
    label: "Agent Infrastructure",
    href: "/platform",
    children: [
      {
        label: "Overview",
        href: "/platform",
        summary: "How agents act, and how you check the result.",
      },
      {
        label: "ARC Control",
        href: "/control",
        summary: "Authorization, audit and verification for agent actions.",
      },
      {
        label: "Agent Readiness",
        href: "/agent-readiness",
        summary: "What your agents can reach, and where the gaps are.",
      },
      {
        label: "AI Fit",
        href: "/ai-fit",
        summary: "Whether a workload belongs in an AI system at all.",
      },
      {
        label: "For developers",
        href: "/developers",
        summary: "Protocols, scanners and architecture notes.",
      },
    ],
  },
  { label: "Labs", href: "/labs" },
  { label: "Playbooks", href: "/playbook" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

/** Secondary routes that belong in the sitemap and footer but not the header. */
export const secondaryRoutes = [
  "/advisory",
  "/research",
  "/academy",
  "/contact",
  "/privacy",
  "/terms",
];
