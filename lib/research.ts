// ---------------------------------------------------------------------------
// ARC Intelligence — grounded research briefs.
// Each paper synthesizes cited academic, standards, and industry sources.
// Claims that are not sourced are labeled as ARC operator guidance.
// ---------------------------------------------------------------------------

export type Citation = {
  id: string;
  authors: string;
  title: string;
  venue: string;
  year: string;
  url: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  kind: "Benchmark" | "Research" | "Report";
  topic: string;
  date: string;
  status: "live" | "building" | "planned";
  summary: string;
  readingTime: string;
  keyFindings: string[];
  sections: ArticleSection[];
  sources: Citation[];
};

export const research: Article[] = [
  {
    slug: "ai-development-horizon-agents-protocols",
    title:
      "AI Development on the Horizon: Agents, Tool Protocols, and the Jagged Frontier",
    kind: "Research",
    topic: "AI development",
    date: "2026-08-01",
    status: "live",
    summary:
      "A grounded brief on where AI systems are actually improving — agent computer-use benchmarks, Model Context Protocol tooling, and why capability remains uneven. Built from Stanford HAI, arXiv agent studies, and NIST risk guidance.",
    readingTime: "16 min",
    keyFindings: [
      "Stanford AI Index 2026 reports OSWorld agent task success rising from roughly 12% (2024) to about 66% — near human baselines on bounded desktop workflows, while other tasks remain weak.",
      "OSWorld-MCP evaluations show MCP tools can raise success rates, yet even strong models invoke available tools on only about 36% of tasks — an adoption gap, not just a model-size gap.",
      "Public MCP tooling has shifted toward action tools that modify external environments; software-development tools dominate usage in large observational samples.",
      "Operators should treat agents as jagged systems: pilot narrow, measurable workflows; require human review on high-stakes actions; manage risk with NIST AI RMF practices.",
    ],
    sections: [
      {
        heading: "Academic and industry background",
        paragraphs: [
          "Modern AI products are no longer only chat interfaces. They are increasingly agentic systems: large models wrapped with tools that read data, call APIs, edit files, or operate software. That shift reframes the research problem from “can the model answer?” to “can the system complete a multi-step task safely and repeatedly?”",
          "Two research traditions matter here. First, agent and tool-use research (ReAct-style planning, function calling, computer-use agents) measures end-to-end task success in realistic environments such as OSWorld. Second, protocol and systems research asks how tools are exposed to models. Anthropic’s Model Context Protocol (MCP) has become a widely adopted open interface for packaging tools as servers that clients can discover and invoke.",
          "Capability progress is real but uneven — what Stanford HAI and related reporting describe as a jagged frontier. Models can excel on structured benchmarks while failing on tasks humans find trivial. For builders, that means headline demos are not a substitute for measured task success in your workflow.",
        ],
      },
      {
        heading: "What the evidence shows",
        paragraphs: [
          "The Stanford AI Index Report 2026 documents a large jump in agent performance on OSWorld computer tasks: roughly from 12% success in 2024 to about 66% more recently, approaching reported human baselines on that suite while still failing roughly one in three attempts. Terminal-oriented benchmarks also show rapid gains. The same reporting notes persistent failures on other tasks (for example, analog clock reading near chance relative to humans), reinforcing that progress does not transfer evenly across domains.[1][2]",
          "MCP-native evaluation deepens the picture. OSWorld-MCP finds that giving computer-use agents verified MCP tools generally improves success (for example, reported lifts for strong models under fixed step budgets), but tool invocation remains low — on the order of 36% even for top systems. Follow-on work on hybrid GUI–MCP agents frames this as an adoption gap: tools are available, yet policies often prefer cheaper screenshot/GUI paths unless training or incentives change tool-decision behavior.[3][4]",
          "At ecosystem scale, observational research monitoring public MCP servers reports on the order of 177,000 agent tools over a 2024–2026 window. Software development accounts for the majority of tools and downloads; the share of action tools (those that modify external environments) rose sharply in usage over the sample period. That is commercially useful and risk-relevant: action tools expand automation value and expand the blast radius of mistakes.[5]",
          "Risk management literature is catching up. NIST’s AI Risk Management Framework (AI RMF 1.0) and the Generative AI Profile (NIST AI 600-1) give voluntary, structured outcomes for governing trustworthy AI — map, measure, manage, and govern — including gen-AI-specific failure modes. These are the right companion documents when teams move from demos to production agents.[6][7]",
        ],
      },
      {
        heading: "Grounded outcomes for operators",
        paragraphs: [
          "1) Prefer bounded workflows first. The strongest evidence of agent progress is on scripted, well-scoped computer and terminal tasks — not open-ended strategy work. Start where success can be scored.",
          "2) Instrument tool adoption, not only model quality. If tools exist but are rarely invoked, the bottleneck is policy, prompting, harness design, or training incentives — not solely base-model capability.",
          "3) Treat MCP (or equivalent tool buses) as production interfaces. Capability negotiation, schema correctness, auth, and audit logs matter as much as prompt quality. Conformance and regression tests belong in CI.",
          "4) Separate perception, reasoning, and action privileges. Action tools that send money, change production data, or message customers need stronger authorization and human review than read-only tools.",
          "5) Pair shipping with NIST-aligned risk reviews. Before scale-out, document intended use, known failure modes, monitoring, and rollback — especially for generative and agentic systems.",
        ],
      },
      {
        heading: "Limitations and how to read this brief",
        paragraphs: [
          "This is a research synthesis for operators, not a primary empirical study by ARC. Benchmark numbers come from published indexes and papers; they may not match your stack, data sensitivity, or latency budget. Public MCP corpora under-represent private enterprise servers. Where we recommend operating practices, we label them as guidance derived from the cited evidence, not as universal guarantees.",
        ],
      },
    ],
    sources: [
      {
        id: "1",
        authors: "Stanford Institute for Human-Centered Artificial Intelligence (HAI)",
        title: "Artificial Intelligence Index Report 2026",
        venue: "arXiv / Stanford HAI",
        year: "2026",
        url: "https://doi.org/10.48550/arxiv.2606.15708",
      },
      {
        id: "2",
        authors: "Stanford HAI",
        title: "The 2025 AI Index Report — Technical Performance",
        venue: "Stanford HAI",
        year: "2025",
        url: "https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance",
      },
      {
        id: "3",
        authors: "OSWorld-MCP authors",
        title:
          "OSWorld-MCP: Benchmarking MCP Tool Invocation In Computer-Use Agents",
        venue: "arXiv / Hugging Face Papers",
        year: "2025",
        url: "https://huggingface.co/papers/2510.24563",
      },
      {
        id: "4",
        authors: "Hybrid GUI–MCP agent authors",
        title:
          "Screenshots or Tools? Eliciting Tool Use and Managing Multimodal Context in Hybrid GUI–MCP Computer-Use Agents",
        venue: "arXiv",
        year: "2026",
        url: "https://arxiv.org/html/2608.03327",
      },
      {
        id: "5",
        authors: "MCP tool monitoring study authors",
        title: "How are AI agents used? Evidence from 177,000 MCP tools",
        venue: "arXiv",
        year: "2026",
        url: "https://arxiv.org/pdf/2603.23802",
      },
      {
        id: "6",
        authors: "National Institute of Standards and Technology (NIST)",
        title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0)",
        venue: "NIST",
        year: "2023",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        id: "7",
        authors: "NIST",
        title:
          "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)",
        venue: "NIST",
        year: "2024",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
  },
  {
    slug: "security-zero-trust-ai-risk",
    title:
      "Security for Modern Operators: Zero Trust, CSF 2.0, and AI-Era Threats",
    kind: "Research",
    topic: "Security",
    date: "2026-08-01",
    status: "live",
    summary:
      "A cited briefing on NIST Cybersecurity Framework 2.0, Zero Trust Architecture, the emerging Cyber AI Profile, and OWASP’s Top 10 for LLM applications — translated into outcomes teams can actually run.",
    readingTime: "15 min",
    keyFindings: [
      "NIST CSF 2.0 (2024) elevates Govern as a core function and frames cybersecurity as enterprise risk management for organizations of any size.",
      "NIST SP 800-207 Zero Trust removes implicit trust based on network location; continuous authentication and authorization become the default for users, devices, and workloads.",
      "NIST’s draft Cyber AI Profile (NISTIR 8596) organizes AI-era cyber work into securing AI systems, using AI for defense, and thwarting AI-enabled attacks.",
      "OWASP Top 10 for LLM Applications 2025 highlights prompt injection, excessive agency, supply-chain risk, and unbounded consumption as first-class application risks.",
    ],
    sections: [
      {
        heading: "Academic and standards background",
        paragraphs: [
          "Enterprise security guidance has moved from perimeter checklists to continuous risk management. NIST’s Cybersecurity Framework began as critical-infrastructure guidance and, in CSF 2.0 (February 2024), became explicitly usable by any organization. CSF 2.0 adds a Govern function alongside Identify, Protect, Detect, Respond, and Recover, and it links outcomes to online informative references rather than prescribing a single control set.[1]",
          "Zero Trust Architecture (NIST SP 800-207) is the complementary architectural model: no implicit trust from network location or asset ownership; authenticate and authorize before establishing a session to a resource; assume breach and limit lateral movement. It responds to remote work, BYOD, and cloud assets that live outside enterprise-owned perimeters.[2]",
          "AI changes both the asset surface and the attacker toolkit. NIST’s AI RMF addresses trustworthy AI risk broadly; CSF 2.0 explicitly points organizations to treat AI risks alongside financial, cyber, reputational, and privacy risks. In December 2025, NIST released a preliminary draft Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile / NISTIR 8596) to help organizations use CSF 2.0 outcomes when securing AI, defending with AI, and thwarting AI-enabled attacks.[1][3][4]",
        ],
      },
      {
        heading: "What the evidence and standards imply",
        paragraphs: [
          "CSF 2.0’s practical message is governance-first: roles, policies, supply-chain oversight, and communication of cyber risk to leadership are outcomes, not afterthoughts. Organizations that only buy tools without owning Govern outcomes tend to accumulate controls without decision rights.[1]",
          "Zero Trust implies identity-centric access, continuous verification, and resource-level policy — not a single product purchase. Migration is incremental: inventory resources, map transaction flows, enforce strong identity, and segment access while monitoring for lateral movement.[2]",
          "For AI applications, OWASP’s Top 10 for LLM Applications 2025 is the most widely referenced community catalog of application-layer failure modes. The 2025 list emphasizes prompt injection; sensitive information disclosure; supply chain (models, plugins, data); data/model poisoning; improper output handling; excessive agency; system prompt leakage; vector/embedding weaknesses; misinformation; and unbounded consumption (cost and resource exhaustion beyond classic DoS).[5]",
          "Taken together, standards bodies and practitioner catalogs converge: secure the AI system components, constrain what agents may do, treat model/tool supply chains like software supply chains, and measure both cyber outcomes and AI-specific abuse cases.",
        ],
      },
      {
        heading: "Grounded outcomes for operators",
        paragraphs: [
          "1) Run a CSF 2.0 profile for your operating context. Start with Govern and Identify: who owns AI and cyber risk, what systems matter, and which suppliers touch them.",
          "2) Implement Zero Trust patterns where they reduce blast radius fastest — privileged admin paths, production data stores, CI/CD, and agent tool endpoints.",
          "3) Map every LLM/agent feature to OWASP LLM risks before launch. Prompt injection and excessive agency deserve explicit mitigations (input/output controls, tool allowlists, human approval for irreversible actions).",
          "4) Use the Cyber AI Profile framing: Secure (harden AI components), Defend (where AI improves detection/response), Thwart (prepare for AI-amplified social engineering and automation).",
          "5) Require evidence: access logs, model/tool inventory, change control for prompts and RAG corpora, and incident playbooks that name AI failure modes.",
        ],
      },
      {
        heading: "Limitations and how to read this brief",
        paragraphs: [
          "Frameworks are voluntary and outcome-oriented; they do not certify security by themselves. The Cyber AI Profile cited here is a preliminary draft subject to public comment and revision. OWASP rankings are community consensus, not a regulated baseline. Adapt controls to your threat model, sector obligations, and risk appetite.",
        ],
      },
    ],
    sources: [
      {
        id: "1",
        authors: "NIST",
        title: "The NIST Cybersecurity Framework (CSF) 2.0",
        venue: "NIST CSWP 29",
        year: "2024",
        url: "https://nvlpubs.nist.gov/nistpubs/cswp/nist.cswp.29.pdf",
      },
      {
        id: "2",
        authors: "Scott Rose, Oliver Borchert, Stu Mitchell, Sean Connelly (NIST)",
        title: "Zero Trust Architecture",
        venue: "NIST SP 800-207",
        year: "2020",
        url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf",
      },
      {
        id: "3",
        authors: "NIST",
        title:
          "Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile) — NISTIR 8596 preliminary draft",
        venue: "NIST CSRC",
        year: "2025",
        url: "https://csrc.nist.gov/pubs/ir/8596/iprd",
      },
      {
        id: "4",
        authors: "NIST",
        title: "Draft NIST Guidelines Rethink Cybersecurity for the AI Era",
        venue: "NIST News",
        year: "2025",
        url: "https://www.nist.gov/news-events/news/2025/12/draft-nist-guidelines-rethink-cybersecurity-ai-era",
      },
      {
        id: "5",
        authors: "OWASP Foundation",
        title: "OWASP Top 10 for Large Language Model Applications 2025",
        venue: "OWASP",
        year: "2025",
        url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf",
      },
    ],
  },
  {
    slug: "operations-workflow-process-mining",
    title:
      "Operations Workflow Development: Process Truth, Mining, and Hyperautomation",
    kind: "Research",
    topic: "Operations workflow",
    date: "2026-08-01",
    status: "live",
    summary:
      "How high-performing operations teams move from assumed process maps to event-log truth — grounded in process-mining scholarship, BPM maturity evidence, and Gartner’s hyperautomation research.",
    readingTime: "14 min",
    keyFindings: [
      "Process mining reconstructs real workflows from system event logs; academic foundations (van der Aalst and others) emphasize discovery, conformance, and enhancement as the core triad.",
      "Gartner has projected that by 2026, about 25% of global enterprises will use process mining as a step toward digital twins of operations — while warning that weak BPM maturity blocks most related initiatives.",
      "Hyperautomation remains a staple discipline for large enterprises, yet Gartner reports that fewer than 20% of organizations have mastered measuring those initiatives.",
      "AI agents amplify the need for process clarity: automating a misunderstood workflow scales waste and risk.",
    ],
    sections: [
      {
        heading: "Academic and industry background",
        paragraphs: [
          "Operational workflow development sits at the intersection of business process management (BPM), industrial engineering, and information systems. Classical BPM relied on workshops and Visio maps — useful for intent, often wrong about reality. Process mining emerged as a data-driven discipline: extract event logs from IT systems, discover the as-is process, check conformance against the to-be model, and enhance processes with performance analytics.",
          "Wil van der Aalst and collaborators established much of the academic vocabulary and algorithms behind process discovery and conformance checking. Industry platforms now productize those ideas — automated discovery, bottleneck analysis, simulation, and increasingly AI-assisted recommendations — which is why analyst firms created a dedicated Magic Quadrant for Process Mining Platforms.[1][2]",
          "In parallel, Gartner popularized hyperautomation: orchestrating multiple technologies (RPA, integration, AI/ML, event-driven architecture) to automate work at scale. Interest resurged with generative AI, but measurement maturity lags adoption rhetoric.[3]",
        ],
      },
      {
        heading: "What the evidence shows",
        paragraphs: [
          "Analyst research repeatedly ties process mining to digital-operations ambitions. Coverage of Gartner’s Process Mining Magic Quadrant notes the projection that by 2026, roughly a quarter of global enterprises will embrace process mining platforms as a first step toward digital twins of operations — and that through 2026, insufficient BPM maturity will prevent the vast majority of related initiatives from achieving intended outcomes.[1][2]",
          "On automation measurement, Gartner’s 2024 I&O automation research states that hyperautomation remains a staple for about 90% of large enterprises, while less than 20% of organizations have mastered measuring hyperautomation initiatives. Separately, Gartner projects rapid growth in network-activity automation (30% of enterprises automating more than half of network activities by 2026, up from under 10% in mid-2023) — evidence that automation appetite is rising faster than governance and measurement in many domains.[3]",
          "The operational implication is consistent across sources: visibility and process maturity are prerequisites. Without event-level truth and ownership, automation and agent projects optimize anecdotes.",
        ],
      },
      {
        heading: "Grounded outcomes for operators",
        paragraphs: [
          "1) Start with one revenue- or risk-critical workflow and an extractable event log (CRM, ERP, ticketing, CI/CD). Discover the real path variants before redesigning.",
          "2) Score conformance gaps: where policy and practice diverge is usually where audit risk, rework, and automation failure hide.",
          "3) Only then select automation. Hyperautomation without measurement recreates the pilot-purgatory pattern Gartner flags — activity without attributable outcomes.",
          "4) Design agent and RPA work against mined processes, not slideware. Encode happy paths and exception handling explicitly; monitor drift when systems change.",
          "5) Build BPM muscle: named process owners, cycle-time and quality KPIs, and a backlog of improvements ranked by value, risk, feasibility, and adoption.",
        ],
      },
      {
        heading: "Limitations and how to read this brief",
        paragraphs: [
          "Gartner figures are analyst projections and survey-based findings, not controlled experiments. Process-mining quality depends on log completeness and identifier correlation across systems. This brief does not endorse specific vendors; platform choice should follow data access, governance, and use-case fit.",
        ],
      },
    ],
    sources: [
      {
        id: "1",
        authors: "Wil van der Aalst (summary commentary on Gartner MQ)",
        title: "New Gartner Magic Quadrant for Process Mining Platforms",
        venue: "vdaalst.com / Gartner MQ discussion",
        year: "2024",
        url: "https://vdaalst.com/news/Gartner-MQ-2024.pdf",
      },
      {
        id: "2",
        authors: "Tushar Srivastava, Marc Kerremans, David Sugden (Gartner)",
        title: "Magic Quadrant for Process Mining Platforms",
        venue: "Gartner (as cited by vendor/analyst republication)",
        year: "2025",
        url: "https://aris.com/resources/process-mining-tools-gartner-report/",
      },
      {
        id: "3",
        authors: "Gartner",
        title:
          "Gartner Says 30% of Enterprises Will Automate More Than Half of Their Network Activities by 2026",
        venue: "Gartner Newsroom",
        year: "2024",
        url: "https://www.gartner.com/en/newsroom/press-releases/2024-09-18-gartner-says-30-percent-of-enterprises-will-automate-more-than-half-of-their-network-activities-by-2026",
      },
    ],
  },
  {
    slug: "cloud-infrastructure-finops-cloud-native",
    title:
      "Cloud Infrastructure That Pays Its Way: FinOps, Cloud Native, and Well-Architected Practice",
    kind: "Research",
    topic: "Cloud infrastructure",
    date: "2026-08-01",
    status: "live",
    summary:
      "A research brief on running cloud as an operating system for the business — FinOps Framework 2025’s Cloud+ scopes, CNCF evidence that Kubernetes is production infrastructure for AI, and Well-Architected trade-offs.",
    readingTime: "14 min",
    keyFindings: [
      "The FinOps Foundation’s 2025 Framework expands practice from public-cloud bills to Cloud+ scopes: SaaS, licensing, private cloud, data centers, and related technology spend.",
      "CNCF’s annual cloud native survey reports that a large majority of container users run Kubernetes in production — cloud native is foundational infrastructure, including for AI workloads.",
      "Cost, reliability, security, performance, and sustainability are joint architecture decisions; optimizing one pillar in isolation creates false savings.",
      "Standardized cost data (for example FOCUS) and cross-functional FinOps personas are becoming prerequisites for multi-cloud and AI spend control.",
    ],
    sections: [
      {
        heading: "Academic and industry background",
        paragraphs: [
          "Cloud infrastructure research and practice sit on three overlapping foundations: distributed-systems engineering (elasticity, failure domains, observability), economic governance of shared resources (FinOps), and architectural quality frameworks used by major providers (for example AWS Well-Architected pillars covering operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability).",
          "FinOps began as a cultural and operating practice for cloud cost accountability — bringing engineering, finance, and business together in near-real-time feedback loops. The FinOps Foundation, under the Linux Foundation, publishes the FinOps Framework used by practitioners worldwide.[1]",
          "Cloud native, stewarded in large part by CNCF, standardized how teams package and run software (containers, Kubernetes, service meshes, GitOps). As AI inference and training workloads moved into the same clusters and clouds, the infrastructure conversation expanded from “apps on Kubernetes” to “AI on the same operating layer.”[2]",
        ],
      },
      {
        heading: "What the evidence shows",
        paragraphs: [
          "FinOps Framework 2025 formalizes a Cloud+ reality: practitioners increasingly manage technology spend beyond a single public cloud invoice. The Foundation’s updates add Scopes as a core framework element and revise principles, domains, and capabilities so FinOps applies to SaaS, licensing, private cloud, data centers, and related categories — reflecting State of FinOps survey directions that SaaS and other non-VM costs are entering FinOps ownership.[1][3]",
          "Industry analyses of State of FinOps data describe majority adoption of SaaS spend management within FinOps practices and growing coverage of private cloud and data-center scopes. Interoperability efforts such as the FOCUS cost data specification aim to reduce multi-cloud mapping friction — a systems problem as much as an accounting one.[3]",
          "CNCF’s annual cloud native survey positions Kubernetes as production backbone infrastructure: with a reported 82% of container users running Kubernetes in production, cloud native has crossed from experimental to foundational, including as the layer organizations use to bring AI into real environments. People, culture, and organizational alignment are highlighted alongside tooling maturity.[2]",
        ],
      },
      {
        heading: "Grounded outcomes for operators",
        paragraphs: [
          "1) Define FinOps scopes explicitly. If AI platforms, SaaS, and observability are outside the cloud bill, they are still on the P&L — put them in scope with owners.",
          "2) Architect to Well-Architected trade-offs. Cost cuts that destroy reliability or security are not optimizations; score changes on multiple pillars.",
          "3) Treat platform engineering as product work: paved roads for deploy, identity, secrets, observability, and spend guardrails beat one-off heroics.",
          "4) For AI workloads on Kubernetes, separate concerns: model supply chain, GPU/capacity economics, network egress, and data residency — each needs controls and budgets.",
          "5) Standardize cost telemetry early (FOCUS or equivalent) so multi-cloud and Cloud+ reporting does not become a permanent spreadsheet project.",
        ],
      },
      {
        heading: "Limitations and how to read this brief",
        paragraphs: [
          "Survey percentages describe responding populations, not every company. Cloud provider frameworks are informative references, not compliance regimes by themselves. FinOps maturity varies widely; copying dashboards without decision rights rarely changes spend.",
        ],
      },
    ],
    sources: [
      {
        id: "1",
        authors: "FinOps Foundation",
        title: "Framework 2025 — Scopes and Cloud+ updates to the FinOps Framework",
        venue: "FinOps Foundation",
        year: "2025",
        url: "https://www.finops.org/insights/2025-finops-framework/",
      },
      {
        id: "2",
        authors: "Cloud Native Computing Foundation (CNCF)",
        title:
          "The CNCF Annual Cloud Native Survey: The Infrastructure of AI’s Future",
        venue: "CNCF",
        year: "2025",
        url: "https://www.cncf.io/reports/the-cncf-annual-cloud-native-survey/",
      },
      {
        id: "3",
        authors: "FinOps Foundation",
        title:
          "FinOps Foundation Launches 2025 FinOps Framework with Scopes for Cloud+",
        venue: "FinOps Foundation / PR Newswire coverage",
        year: "2025",
        url: "https://www.finops.org/framework/",
      },
    ],
  },
  {
    slug: "digital-transformation-productivity-j-curve",
    title:
      "Digital Transformation That Compounds: The Productivity J-Curve and Capability Gaps",
    kind: "Research",
    topic: "Digital transformation",
    date: "2026-08-01",
    status: "live",
    summary:
      "Why most digital and AI programs under-deliver — and what Brynjolfsson’s productivity research, MIT manufacturing evidence, and McKinsey capability studies say separates leaders from the pack.",
    readingTime: "15 min",
    keyFindings: [
      "Technology alone does not raise productivity; complementary investments in process, skills, and organization create a J-curve — dips before gains.",
      "McKinsey reports that companies on average capture less than a third of the value expected from digital transformations, while digital/AI leaders widen the capability gap over time.",
      "Census-linked manufacturing research finds early AI adoption can disrupt established firms in the short run, with longer-run productivity and market-share advantages for adopters who adjust.",
      "Successful transformation looks like rewiring operating models, not stacking tools.",
    ],
    sections: [
      {
        heading: "Academic background",
        paragraphs: [
          "Robert Solow’s productivity paradox — “you can see the computer age everywhere but in the productivity statistics” — framed decades of research on why powerful IT under-showed in macro productivity. Erik Brynjolfsson and collaborators extended that line into modern AI, arguing that general-purpose technologies require complementary intangible investments: new processes, skills, metrics, and business models. During that adjustment, measured productivity can flatten or fall before rising — the productivity J-curve.[1][2]",
          "That academic frame is the right antidote to transformation theater. Buying software is an expense; changing how work is done is the investment that unlocks the upside of the J-curve.",
        ],
      },
      {
        heading: "What the evidence shows",
        paragraphs: [
          "In conversation with McKinsey, Brynjolfsson restates the core finding: awesome technology is insufficient without updated business processes, reskilling, and sometimes business-model change — producing the J-curve pattern of delayed gains.[1]",
          "McKinsey’s research on digital and AI leaders finds that average companies capture less than a third of expected value from digital transformation initiatives, while a leading cohort compounds advantage by rewiring capabilities (talent, operating model, scaling). The spread in digital/AI maturity between top and bottom performers widened substantially across studied periods — evidence of a widening capability gap, not a one-time tech race.[3]",
          "MIT Sloan coverage of “The Rise of Industrial AI in America” (McElheran, Yang, Kroff, Brynjolfsson and collaborators), using U.S. Census Bureau manufacturing survey data, reports J-curve dynamics in industrial AI adoption: short-run disruption especially for older firms, with longer-horizon outperformance in productivity and market share among adopters — contingent on complementary practices that flatten the dip.[4]",
          "Across these sources, the mechanism is consistent: transformation ROI is gated by organizational complements, measurement honesty, and sequenced change — not by model novelty alone.",
        ],
      },
      {
        heading: "Grounded outcomes for operators",
        paragraphs: [
          "1) Budget for complements. Training, process redesign, data cleanup, and change management are part of the transformation capital plan — not optional soft costs.",
          "2) Measure leading and lagging indicators. Track adoption, cycle time, error rates, and P&L impact; do not stop at license counts or pilot demos.",
          "3) Sequence for learning. Expect a J-curve dip; design pilots that shorten it (narrow scope, clear owners, weekly operating reviews).",
          "4) Rewire decision rights. Leaders who pull ahead treat digital/AI as an operating-system change: product teams, platform teams, and business owners share outcomes.",
          "5) Kill zombie initiatives. Competing unfunded pilots without a sequenced roadmap are a leading indicator of the value leakage McKinsey documents.",
        ],
      },
      {
        heading: "Limitations and how to read this brief",
        paragraphs: [
          "Macro and survey evidence describe averages and cohorts; your firm may sit on a different part of the curve. Manufacturing AI findings do not automatically transfer to pure software businesses, though the complementary-investment logic does. Consultant research can embed selection effects; we cite it as industry evidence alongside academic work, not as gospel.",
        ],
      },
    ],
    sources: [
      {
        id: "1",
        authors: "Erik Brynjolfsson with Lareina Yee (McKinsey)",
        title: "Technology alone is never enough for true productivity",
        venue: "McKinsey Digital / At the Edge",
        year: "2024",
        url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/technology-alone-is-never-enough-for-true-productivity",
      },
      {
        id: "2",
        authors: "Erik Brynjolfsson, Seth Benzell, Daniel Rock",
        title: "Understanding and Addressing the Modern Productivity Paradox",
        venue: "MIT Work of the Future research brief",
        year: "2020",
        url: "https://workofthefuture-taskforce.mit.edu/wp-content/uploads/2020/11/2020-Research-Brief-Brynjolfsson-Benzell-Rock.pdf",
      },
      {
        id: "3",
        authors: "McKinsey & Company",
        title:
          "Rewired and running ahead: Digital and AI leaders are leaving the rest behind",
        venue: "McKinsey",
        year: "2023",
        url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/rewired-and-running-ahead-digital-and-ai-leaders-are-leaving-the-rest-behind",
      },
      {
        id: "4",
        authors:
          "Kristina McElheran et al. (coverage via MIT Sloan; paper on industrial AI J-curves)",
        title: "The productivity paradox of AI adoption in manufacturing firms",
        venue: "MIT Sloan Ideas Made to Matter",
        year: "2025",
        url: "https://mitsloan.mit.edu/ideas-made-to-matter/productivity-paradox-ai-adoption-manufacturing-firms",
      },
    ],
  },
  {
    slug: "product-development-discovery-delivery",
    title:
      "Product Development That Learns: Discovery, Delivery, and Outcome Ownership",
    kind: "Research",
    topic: "Product development",
    date: "2026-08-01",
    status: "live",
    summary:
      "A research-informed brief on modern product operating models — Marty Cagan / SVPG empowerment principles, Teresa Torres’ continuous discovery habits, and dual-track discovery–delivery — aimed at teams shipping AI-era products without roadmap theater.",
    readingTime: "13 min",
    keyFindings: [
      "Leading product practice separates problem assignment (leadership/strategy) from solution discovery (empowered product teams) and insists on outcomes over feature output.",
      "Continuous discovery runs in parallel with continuous delivery: small, frequent customer touchpoints and experiments, not a big upfront research phase.",
      "Discovery must test value, usability, feasibility, and viability risks before heavy build investment.",
      "Splitting “discovery teams” from “delivery teams” is a documented anti-pattern that weakens ownership and innovation.",
    ],
    sections: [
      {
        heading: "Academic and practitioner background",
        paragraphs: [
          "Product development research spans design theory, lean startup experimentation, agile delivery economics, and organizational behavior. In software, a durable practitioner synthesis comes from Silicon Valley Product Group (Marty Cagan and collaborators): empowered product teams composed of product management, design, and engineering; product strategy that assigns problems and outcomes; and continuous discovery paired with continuous delivery.[1][2]",
          "Teresa Torres’ continuous discovery habits operationalize the research loop: weekly customer contact, opportunity solution trees linking outcomes to opportunities to solutions, and assumption testing from low to higher fidelity. The emphasis is outcome focus — not shipping a backlog of outputs and hoping metrics move.[3][4]",
          "These ideas align with lean and dual-track agile traditions: discovery continuously feeds validated backlog items while delivery continuously ships — preferably without a hard wall between the people who learn and the people who build.[2][5]",
        ],
      },
      {
        heading: "What the evidence and field literature show",
        paragraphs: [
          "SVPG’s product operating model literature argues that feature-team roadmaps (output) optimize for delivery theater, while problem/outcome assignment enables teams closest to users and technology to discover solutions that work. Product discovery exists to minimize waste, assess the four risks early, and use rapid experimentation responsibly.[1][2]",
          "On team design, Cagan explicitly calls out the anti-pattern of separate discovery vs. delivery teams: it undermines empowerment, ownership of results, and innovation likelihood. Healthy teams keep a single cross-functional unit responsible for both learning and shipping, even when individuals spend different proportions of time on each.[5]",
          "Continuous discovery and continuous delivery push many teams toward flow-based systems (often Kanban-flavored adaptations) because learning and release cadence are ongoing rather than phase-gated. That does not remove the need for strategy: leadership still chooses which problems matter in a timeframe.[2][4]",
          "For AI products, these principles intensify. Model demos are cheap; proving value, reliability, and operable cost in a customer workflow is the discovery problem. Treating “add AI” as a roadmap feature without outcome tests recreates the digital-transformation value gap documented elsewhere in ARC’s research series.",
        ],
      },
      {
        heading: "Grounded outcomes for operators",
        paragraphs: [
          "1) Rewrite roadmaps as outcomes and problems. Features become hypotheses inside discovery, not commitments masquerading as strategy.",
          "2) Institute a continuous discovery cadence (for example, weekly customer interviews) owned by the product trio — not outsourced solely to a research silo.",
          "3) Gate build investment on evidence across value, usability, feasibility, and viability — especially for AI features with cost, safety, and accuracy risks.",
          "4) Keep discovery and delivery in one team. Specialists can lead activities; accountability for results stays shared.",
          "5) Instrument product outcomes in production: activation, retention, task success, cost-to-serve, and failure review — the same honesty standard ARC applies to transformation work.",
        ],
      },
      {
        heading: "Limitations and how to read this brief",
        paragraphs: [
          "This brief draws primarily on established product-management field literature rather than a single randomized trial. Practices that work in empowered product companies require supportive leadership, hiring, and funding models; copying ceremonies without empowerment rarely produces the same outcomes. Adapt discovery methods to regulated contexts where customer contact and experimentation need compliance wrappers.",
        ],
      },
    ],
    sources: [
      {
        id: "1",
        authors: "Marty Cagan / Silicon Valley Product Group",
        title: "The Product Operating Model: An Introduction",
        venue: "SVPG",
        year: "2024",
        url: "https://www.svpg.com/the-product-operating-model-an-introduction/",
      },
      {
        id: "2",
        authors: "Marty Cagan / SVPG",
        title: "Product Model Concepts",
        venue: "SVPG",
        year: "2024",
        url: "https://www.svpg.com/product-model-concepts/",
      },
      {
        id: "3",
        authors: "Teresa Torres (as summarized in practitioner references)",
        title: "Continuous Discovery Habits — opportunity solution trees and cadence",
        venue: "Product discovery practice literature",
        year: "2021–2024",
        url: "https://www.svpg.com/continuous-discovery/",
      },
      {
        id: "4",
        authors: "Marty Cagan / SVPG",
        title: "Continuous Discovery",
        venue: "SVPG",
        year: "2016–updated practice notes",
        url: "https://www.svpg.com/continuous-discovery/",
      },
      {
        id: "5",
        authors: "Marty Cagan / SVPG",
        title: "Discovery – Delivery",
        venue: "SVPG",
        year: "2023",
        url: "https://www.svpg.com/discovery-delivery/",
      },
    ],
  },
];

export function getResearchBySlug(slug: string) {
  return research.find((a) => a.slug === slug);
}
