// ---------------------------------------------------------------------------
// The research index, for the redesigned /research page.
//
// Reconstructs the Magic Patterns `data/research` module, but derives from the
// 9 real articles in lib/research.ts rather than restating them. Reading time
// and source counts are computed from the articles themselves, so they cannot
// drift away from what the article pages show.
//
// The prototype rendered a drawer with the summary and the note "the full piece
// lives at /research/[slug] on the current site". Those pages exist and are
// complete, so rows link to them.
//
// `Framework` is not an article kind in this repository — the free frameworks
// live in lib/learn.ts at /playbooks/*. They are surfaced here from there.
// ---------------------------------------------------------------------------

import { research as articles, type Article } from "@/lib/research";
import { playbooks, playbookHref } from "@/lib/learn";

export const researchKinds = ["Report", "Research", "Benchmark"] as const;
export type ResearchKind = (typeof researchKinds)[number];

export type ResearchItem = {
  slug: string;
  href: string;
  title: string;
  kind: ResearchKind;
  topic: string;
  /** ISO date, as recorded on the article. */
  date: string;
  summary: string;
  minutes: number;
  sources: number;
  findings: number;
  featured?: boolean;
};

function minutesOf(a: Article): number {
  const n = parseInt(a.readingTime, 10);
  return Number.isFinite(n) ? n : 0;
}

/** Newest first. Articles are dated by the change, not the publication date. */
export const researchIndex: ResearchItem[] = articles
  .filter((a) => a.status === "live")
  .map((a) => ({
    slug: a.slug,
    href: `/research/${a.slug}`,
    title: a.title,
    kind: a.kind,
    topic: a.topic,
    date: a.date,
    summary: a.summary,
    minutes: minutesOf(a),
    sources: a.sources.length,
    findings: a.keyFindings.length,
  }))
  .sort((x, y) => (x.date < y.date ? 1 : -1))
  .map((item, i) => (i === 0 ? { ...item, featured: true } : item));

export const featuredResearch = researchIndex.find((r) => r.featured) ?? researchIndex[0];

export const researchTopics: string[] = Array.from(
  new Set(researchIndex.map((r) => r.topic)),
).sort();

/**
 * The free frameworks, from lib/learn.ts. These are complete on their own
 * pages with no email gate, which is worth saying next to them.
 */
export type FrameworkItem = { slug: string; href: string; name: string; summary: string };

export const frameworks: FrameworkItem[] = playbooks.map((p) => ({
  slug: p.slug,
  href: playbookHref(p),
  name: p.name,
  summary: p.summary,
}));

/** The topics the research programme is organised around, for the page intro. */
export const researchThemes = [
  "AI agent infrastructure",
  "Agent reliability and verification",
  "MCP security and conformance",
  "AI governance and regulation",
  "Workflow automation",
  "Context engineering",
  "Cloud infrastructure and cost",
  "Enterprise AI implementation",
];

/** Short, readable date for the row metadata. */
export function formatResearchDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
