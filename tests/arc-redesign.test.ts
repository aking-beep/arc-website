import { describe, expect, it } from "vitest";
import {
  labs,
  marketSignals,
  maturityLabel,
  nav,
  secondaryRoutes,
  site,
  type Maturity,
} from "@/lib/content";
import { arkProducts, developerAreas } from "@/lib/ark";
import { playbooks } from "@/lib/learn";
import { serviceAreas } from "@/lib/services";
import { research as articles } from "@/lib/research";
import { arcFooterColumns, arcNav, arcSite } from "@/lib/arc/site";
import { isUsableToday, maturityStyles } from "@/lib/arc/status";
import {
  featuredLabProducts,
  labCounts,
  labProducts,
  moreLabProducts,
  retiredIntoPlaybook,
} from "@/lib/arc/products";
import { solutions } from "@/lib/arc/solutions";
import { initialProjectType, projectTypes, serviceToType, unmappedSolutions } from "@/lib/arc/inquiry";
import { bands, maxScorePerQuestion, questions, readinessLevel } from "@/lib/arc/readiness";
import {
  consoleShowcase,
  control,
  controlCapabilities,
  lifecycleControlled,
  lifecycleSteps,
} from "@/lib/arc/control";
import { ecoNodes } from "@/lib/arc/ecosystem";
import { layers } from "@/lib/arc/architecture";
import { frameworks, researchIndex, researchTopics } from "@/lib/arc/research";
import { jsonLdScript } from "@/lib/arc/json-ld";
import {
  clampField,
  INQUIRY_LIMITS,
  isValidEmail,
  MIN_MESSAGE_LENGTH,
  validateInquiryStep,
  type InquiryPayload,
} from "@/lib/arc/contact-payload";

/**
 * Guards for the redesign's own logic and for the claims-discipline rules in
 * docs/MAGIC_PATTERNS_AUDIT.md. These are the rules that are easy to break
 * accidentally later: a reintroduced consumer app, a tool promoted to a
 * maturity it has not earned, a dead cross-link, an overclaiming status badge.
 */

const EXCLUDED_APPS = ["arc travel", "climb up", "mirrosu", "steady move"];

describe("excluded consumer applications", () => {
  /**
   * ARC Travel, CLIMB UP, MIRROSU and Steady Move were deliberately removed
   * from the corporate site. Their own repositories still exist; this asserts
   * only that nothing on this website names them, including anything
   * generated from a content module.
   */
  const haystacks: [string, unknown][] = [
    ["lib/content labs", labs],
    ["lib/content nav", nav],
    ["lib/ark products", arkProducts],
    ["lib/learn playbooks", playbooks],
    ["lib/services areas", serviceAreas],
    ["lib/research articles", articles],
    ["lib/arc products", labProducts],
    ["lib/arc solutions", solutions],
    ["lib/arc ecosystem", ecoNodes],
    ["lib/arc architecture", layers],
    ["lib/arc research index", researchIndex],
    ["lib/arc nav", arcNav],
    ["lib/arc footer", arcFooterColumns],
    ["lib/arc inquiry", projectTypes],
    ["lib/arc readiness", questions],
    ["lib/arc control", [control, controlCapabilities]],
  ];

  for (const [name, value] of haystacks) {
    it(`${name} names none of them`, () => {
      const text = JSON.stringify(value).toLowerCase();
      for (const app of EXCLUDED_APPS) {
        expect(text, `${app} found in ${name}`).not.toContain(app);
        // Also catch the unspaced forms.
        expect(text).not.toContain(app.replace(" ", ""));
        expect(text).not.toContain(app.replace(" ", "-"));
      }
    });
  }
});

describe("no ARC GitHub presence on the site", () => {
  /**
   * GitHub links were removed from the public site. These assert that the
   * content modules the pages render from carry none, so a link cannot return
   * through data. Two things are deliberately exempt and checked for below:
   * a cited third-party source in the market signals, which is evidence rather
   * than promotion, and scripts/, which runs at build time and never ships.
   */
  const ARC_REPOS = /github\.com\/aking-beep/i;

  const modules: [string, unknown][] = [
    ["site", site],
    ["labs", labs],
    ["labProducts", labProducts],
    ["arkProducts", arkProducts],
    ["developerAreas", developerAreas],
    ["consoleShowcase", consoleShowcase],
    ["solutions", solutions],
    ["ecoNodes", ecoNodes],
    ["arcSite", arcSite],
    ["arcFooterColumns", arcFooterColumns],
    ["arcNav", arcNav],
  ];

  for (const [name, value] of modules) {
    it(`${name} links no ARC repository`, () => {
      expect(JSON.stringify(value)).not.toMatch(ARC_REPOS);
    });
  }

  it("has no github field on the shared site object", () => {
    expect("github" in site).toBe(false);
    expect("github" in arcSite).toBe(false);
  });

  it("keeps the cited third-party source, which is evidence not promotion", () => {
    const cited = marketSignals.flatMap((s) => s.sources.map((x) => x.url));
    expect(cited.some((u) => u.includes("github.com/anthropics"))).toBe(true);
    // ...but still none of ARC's own.
    expect(cited.some((u) => ARC_REPOS.test(u))).toBe(false);
  });
});

describe("maturity taxonomy", () => {
  it("covers every Maturity in lib/content", () => {
    for (const maturity of Object.keys(maturityLabel) as Maturity[]) {
      expect(maturityStyles[maturity], `no style for ${maturity}`).toBeDefined();
      expect(maturityStyles[maturity].label.length).toBeGreaterThan(0);
    }
  });

  it("never labels an unreleased thing as available", () => {
    expect(maturityStyles["in-development"].label).not.toMatch(/available/i);
    expect(maturityStyles.research.label).not.toMatch(/available/i);
    expect(isUsableToday("in-development")).toBe(false);
    expect(isUsableToday("research")).toBe(false);
    expect(isUsableToday("open-source")).toBe(true);
    expect(isUsableToday("alpha")).toBe(true);
  });

  it("marks ARC Control as design-partner development, not available", () => {
    expect(control.maturity).toBe("design-partners");
    expect(maturityStyles[control.maturity].label).toMatch(/design-partner/i);
  });

  it("claims no ARC Control capability as generally available", () => {
    for (const capability of controlCapabilities) {
      expect(capability.state, capability.name).not.toBe("available");
    }
  });

  it("states what ARC Control is not", () => {
    expect(control.limits.length).toBeGreaterThanOrEqual(4);
    expect(control.limits.join(" ")).toMatch(/not available for purchase/i);
  });
});

describe("ARC Labs catalogue", () => {
  it("derives entirely from lib/content, so statuses cannot diverge", () => {
    expect(labProducts).toHaveLength(labs.length);
    for (const product of labProducts) {
      const source = labs.find((l) => l.slug === product.slug);
      expect(source, product.slug).toBeDefined();
      expect(product.maturity).toBe(source!.maturity);
      expect(product.app).toBe(source!.links.app);
      expect(product.docs).toBe(source!.links.docs);
    }
  });

  it("partitions into featured and more with nothing lost or duplicated", () => {
    expect(featuredLabProducts.length + moreLabProducts.length).toBe(labProducts.length);
    const slugs = [...featuredLabProducts, ...moreLabProducts].map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every featured tool a preview and a way to use it", () => {
    expect(featuredLabProducts).toHaveLength(4);
    for (const product of featuredLabProducts) {
      expect(product.preview, product.slug).toBeDefined();
      expect(product.app, product.slug).toBeTruthy();
    }
  });

  it("counts only what the catalogue actually contains", () => {
    expect(labCounts.total).toBe(labs.length);
    expect(labCounts.usable).toBe(
      labs.filter((l) => isUsableToday(l.maturity) && l.links.app).length,
    );
    expect(labCounts.earlyStage).toBe(
      labs.filter((l) => l.maturity === "alpha" || l.maturity === "experiment").length,
    );
  });

  it("links no ARC repository and claims no code it cannot show", () => {
    // GitHub was removed from the site. The data carries no repo field at all,
    // so a link cannot come back in through content, and the maturity label
    // must not promise source either.
    const serialized = JSON.stringify(labProducts);
    expect(serialized).not.toContain("github.com");
    for (const style of Object.values(maturityStyles)) {
      expect(style.label.toLowerCase()).not.toContain("open source");
      expect(style.label.toLowerCase()).not.toContain("github");
    }
  });

  it("does not feature the three tools that were retired into the playbook", () => {
    const slugs = labProducts.map((p) => p.slug);
    for (const retired of ["arc-skills", "reference-architectures", "ai-workflow-templates"]) {
      expect(slugs, `${retired} is redirected in next.config.mjs`).not.toContain(retired);
    }
    expect(retiredIntoPlaybook.names).toHaveLength(3);
  });
});

describe("solution areas", () => {
  it("covers the six areas the brief specifies", () => {
    expect(solutions.map((s) => s.slug)).toEqual([
      "ai-strategy",
      "ai-development",
      "workflow-automation",
      "cloud-modernization",
      "ai-governance",
      "emerging-technology",
    ]);
  });

  it("names only engagements that exist under /advisory", () => {
    const known = new Set([
      "ai-readiness-audit",
      "technical-architecture-review",
      "cloud-devops-readiness",
      "data-health-analytics",
      "security-compliance-posture",
      "ai-solution-mvp-scope",
      "delivery-program-setup",
      "integrated-transformation-diagnostic",
    ]);
    for (const solution of solutions) {
      expect(solution.engagements.length).toBeGreaterThan(0);
      for (const engagement of solution.engagements) {
        expect(known, `${solution.slug} -> ${engagement.slug}`).toContain(engagement.slug);
      }
    }
  });

  it("gives each area a problem, an approach, outcomes and three steps", () => {
    for (const solution of solutions) {
      expect(solution.problem.length, solution.slug).toBeGreaterThan(80);
      expect(solution.approach.length, solution.slug).toBeGreaterThan(80);
      expect(solution.outcomes.length, solution.slug).toBeGreaterThanOrEqual(3);
      expect(solution.process, solution.slug).toHaveLength(3);
    }
  });

  it("maps every area onto an inquiry project type", () => {
    expect(unmappedSolutions).toEqual([]);
    for (const slug of Object.values(serviceToType)) {
      expect(projectTypes.map((p) => p.id)).toContain(slug);
    }
  });
});

describe("inquiry deep links", () => {
  it("preselects ARC Control from ?type=control", () => {
    expect(initialProjectType({ type: "control" })).toBe("control");
  });

  it("preselects from a solution deep link", () => {
    expect(initialProjectType({ service: "ai-governance" })).toBe("governance");
    expect(initialProjectType({ service: "cloud-modernization" })).toBe("modernization");
  });

  it("still honours the ?topic= links that predate this form", () => {
    expect(initialProjectType({ topic: "ark-control" })).toBe("control");
    expect(initialProjectType({ topic: "ai-fit-teams" })).toBe("strategy");
  });

  it("preselects strategy when arriving from the readiness check", () => {
    expect(initialProjectType({ readiness: "62" })).toBe("strategy");
  });

  it("ignores a type that is not on the list", () => {
    expect(initialProjectType({ type: "'); DROP TABLE--" })).toBe("");
    expect(initialProjectType({})).toBe("");
  });
});

describe("inquiry validation", () => {
  const empty: InquiryPayload = {
    type: "",
    name: "",
    email: "",
    company: "",
    role: "",
    size: "",
    budget: "",
    timeline: "",
    message: "",
    technical: "",
    company_website: "",
  };

  it("requires a project type on step one", () => {
    expect(Object.keys(validateInquiryStep(0, empty))).toEqual(["type"]);
    expect(validateInquiryStep(0, { ...empty, type: "control" })).toEqual({});
  });

  it("requires name, email and company on step two", () => {
    expect(Object.keys(validateInquiryStep(1, empty)).sort()).toEqual([
      "company",
      "email",
      "name",
    ]);
  });

  it("rejects a malformed email", () => {
    const errors = validateInquiryStep(1, {
      ...empty,
      name: "A",
      company: "B",
      email: "a@b",
    });
    expect(errors.email).toBeDefined();
  });

  it("accepts a well-formed email", () => {
    expect(
      validateInquiryStep(1, { ...empty, name: "A", company: "B", email: "a@b.com" }),
    ).toEqual({});
  });

  it("requires budget, timeline and a real message on step three", () => {
    expect(Object.keys(validateInquiryStep(2, empty)).sort()).toEqual([
      "budget",
      "message",
      "timeline",
    ]);
    expect(
      validateInquiryStep(2, {
        ...empty,
        budget: "Not sure yet",
        timeline: "This quarter",
        message: "x".repeat(MIN_MESSAGE_LENGTH - 1),
      }).message,
    ).toBeDefined();
    expect(
      validateInquiryStep(2, {
        ...empty,
        budget: "Not sure yet",
        timeline: "This quarter",
        message: "x".repeat(MIN_MESSAGE_LENGTH),
      }),
    ).toEqual({});
  });

  it("validates emails the same way the API route does", () => {
    expect(isValidEmail("a@b.com")).toBe(true);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("a b@c.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });

  it("strips control characters from the fields that become one email line", () => {
    // A newline in any of these would split a line of the notification email,
    // and `name`, `company` and `type` reach the subject.
    for (const field of ["name", "company", "role", "type", "topic", "budget"] as const) {
      expect(clampField("Acme\r\nBcc: attacker@example.com", field)).not.toMatch(/[\r\n]/);
      expect(clampField("a\u0000b", field)).not.toContain("\u0000");
    }
  });

  it("keeps line breaks in the message body but drops other control characters", () => {
    expect(clampField("line one\nline two", "message")).toBe("line one\nline two");
    expect(clampField("a\u0000b", "message")).toBe("ab");
    expect(clampField("a\u0007b", "technical")).toBe("ab");
  });

  it("clamps every field to its documented cap", () => {
    for (const [field, limit] of Object.entries(INQUIRY_LIMITS)) {
      const clamped = clampField("x".repeat(limit + 50), field as keyof typeof INQUIRY_LIMITS);
      expect(clamped.length, field).toBe(limit);
    }
    expect(clampField("  padded  ", "name")).toBe("padded");
    expect(clampField(undefined, "name")).toBe("");
  });
});

describe("structured data", () => {
  it("escapes characters that would break out of a script tag", () => {
    const out = jsonLdScript({ name: "</script><img src=x onerror=alert(1)>" });
    expect(out).not.toContain("</script>");
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    // Still valid JSON once parsed back.
    expect(JSON.parse(out).name).toBe("</script><img src=x onerror=alert(1)>");
  });

  it("escapes the line terminators that are legal in JSON but not in JavaScript", () => {
    const out = jsonLdScript({ a: "x\u2028y\u2029z" });
    expect(out).not.toContain("\u2028");
    expect(out).not.toContain("\u2029");
    expect(JSON.parse(out).a).toBe("x\u2028y\u2029z");
  });

  it("round-trips the real payloads unchanged", () => {
    const payload = { "@context": "https://schema.org", "@type": "Organization", name: "ARC" };
    expect(JSON.parse(jsonLdScript(payload))).toEqual(payload);
  });
});

describe("readiness check", () => {
  it("asks six questions with four options each", () => {
    expect(questions).toHaveLength(6);
    for (const question of questions) {
      expect(question.options, question.id).toHaveLength(maxScorePerQuestion + 1);
      expect(question.advice.length).toBeGreaterThan(40);
    }
  });

  it("points every question at a solution area that exists", () => {
    const slugs = solutions.map((s) => s.slug);
    for (const question of questions) {
      expect(slugs, question.id).toContain(question.solution);
    }
  });

  it("covers 0 to 100 with no gap or overlap between bands", () => {
    const sorted = [...bands].sort((a, b) => a.min - b.min);
    expect(sorted[0].min).toBe(0);
    expect(sorted[sorted.length - 1].max).toBe(100);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].min).toBe(sorted[i - 1].max + 1);
    }
  });

  it("returns a band for every reachable score", () => {
    for (let score = 0; score <= 100; score++) {
      expect(readinessLevel(score), String(score)).toBeDefined();
    }
    expect(readinessLevel(0).label).toBe("Not ready");
    expect(readinessLevel(100).label).toBe("Ready");
  });
});

describe("ARC Control architecture", () => {
  it("uses the nine lifecycle steps from lib/ark", () => {
    expect(lifecycleSteps).toHaveLength(9);
  });

  it("claims only four of the nine, and names ones that exist", () => {
    expect(lifecycleControlled).toHaveLength(4);
    const names = lifecycleSteps.map((s) => s.name);
    for (const step of lifecycleControlled) {
      expect(names, step).toContain(step);
    }
  });

  it("wires each capability to a distinct console view", () => {
    const tabs = controlCapabilities.map((c) => c.tab);
    expect(new Set(tabs).size).toBe(tabs.length);
    expect(controlCapabilities).toHaveLength(6);
  });

  it("keeps the legacy path recorded so the redirect and sitemap stay correct", () => {
    expect(control.legacyPath).toBe("/ark-control");
    expect(control.path).toBe("/control");
  });
});

describe("research index", () => {
  it("derives from the real articles and computes its own counts", () => {
    const live = articles.filter((a) => a.status === "live");
    expect(researchIndex).toHaveLength(live.length);
    for (const item of researchIndex) {
      const source = live.find((a) => a.slug === item.slug);
      expect(source, item.slug).toBeDefined();
      expect(item.sources).toBe(source!.sources.length);
      expect(item.findings).toBe(source!.keyFindings.length);
      expect(item.minutes).toBeGreaterThan(0);
      expect(item.href).toBe(`/research/${item.slug}`);
    }
  });

  it("orders newest first and features exactly one item", () => {
    const dates = researchIndex.map((r) => r.date);
    expect([...dates].sort().reverse()).toEqual(dates);
    expect(researchIndex.filter((r) => r.featured)).toHaveLength(1);
    expect(researchIndex[0].featured).toBe(true);
  });

  it("lists topics without duplicates", () => {
    expect(new Set(researchTopics).size).toBe(researchTopics.length);
  });

  it("links frameworks to the pages that publish them", () => {
    expect(frameworks).toHaveLength(playbooks.length);
    for (const framework of frameworks) {
      expect(framework.href).toMatch(/^\/playbooks\//);
    }
  });
});

describe("navigation", () => {
  it("has no duplicate primary destinations", () => {
    const hrefs = arcNav.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("keeps every route the header dropped reachable from the footer", () => {
    const footerHrefs = new Set(
      arcFooterColumns.flatMap((c) => c.links.map((l) => l.href)),
    );
    // Routes that were in the old header or secondary list and are no longer
    // in the primary nav have to be somewhere in the footer, or the redesign
    // orphans a page that already ranks.
    const mustBeReachable = [
      "/platform",
      "/developers",
      "/agent-readiness",
      "/ai-fit",
      "/advisory",
      "/academy",
      "/work",
      "/playbook",
      "/research",
      "/contact",
      "/about",
      "/services",
      "/labs",
      "/control",
    ];
    for (const href of mustBeReachable) {
      expect(footerHrefs, `${href} is not linked from the footer`).toContain(href);
    }
  });

  it("points nowhere that redirects", () => {
    const all = [
      ...arcNav.map((i) => i.href),
      ...arcFooterColumns.flatMap((c) => c.links.map((l) => l.href)),
    ];
    for (const href of all) {
      expect(href, `${href} redirects`).not.toBe(control.legacyPath);
    }
  });

  it("still records the secondary routes the sitemap composes from", () => {
    expect(secondaryRoutes).toContain("/research");
    expect(secondaryRoutes).toContain("/contact");
  });
});

describe("ecosystem map", () => {
  it("has four nodes positioned inside the panel", () => {
    expect(ecoNodes).toHaveLength(4);
    for (const node of ecoNodes) {
      expect(node.x).toBeGreaterThan(0);
      expect(node.x).toBeLessThan(100);
      expect(node.y).toBeGreaterThan(0);
      expect(node.y).toBeLessThan(100);
      expect(node.to).toMatch(/^\//);
    }
  });

  it("gives ARC Control the same maturity as the product page", () => {
    const node = ecoNodes.find((n) => n.id === "control");
    expect(node?.maturity).toBe(control.maturity);
  });
});

describe("architecture explorer", () => {
  it("describes both states for every layer", () => {
    expect(layers.length).toBeGreaterThanOrEqual(6);
    for (const layer of layers) {
      expect(layer.current.components.length, layer.id).toBeGreaterThan(0);
      expect(layer.current.risks.length, layer.id).toBeGreaterThan(0);
      expect(layer.target.components.length, layer.id).toBeGreaterThan(0);
      expect(layer.target.moves.length, layer.id).toBeGreaterThan(0);
    }
  });

  it("has both stacked layers and cross-cutting concerns", () => {
    expect(layers.filter((l) => l.kind === "layer").length).toBeGreaterThan(0);
    expect(layers.filter((l) => l.kind === "cross").length).toBeGreaterThan(0);
  });
});
