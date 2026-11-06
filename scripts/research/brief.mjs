/**
 * Build the month's research brief: what is oldest, what is covered, and
 * what every article already cites.
 *
 *   node scripts/research/brief.mjs            # human-readable
 *   node scripts/research/brief.mjs --json     # machine-readable
 *
 * This is the deterministic half of the monthly review. It does no research
 * and reaches no network: it reads the repository and states facts, so the
 * agent that runs afterwards starts from "these five briefs are oldest and
 * already cite these sources" rather than a blank prompt. That is the
 * difference between a review and an invention.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const asJson = process.argv.includes("--json");

/**
 * Parsed out of the source rather than imported, so this runs with plain
 * node and no TypeScript loader. It only needs fields, not behaviour.
 */
async function readArticles() {
  const text = await fs.readFile(path.join(root, "lib/research.ts"), "utf8");
  const articles = [];
  // Split on top-level entries: each begins with a slug at a known indent.
  const chunks = text.split(/\n  \{\n/).slice(1);
  for (const chunk of chunks) {
    const get = (key) => {
      const m = chunk.match(new RegExp(`\\b${key}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      return m ? m[1].replace(/\\"/g, '"') : null;
    };
    const slug = get("slug");
    if (!slug) continue;
    const urls = [...chunk.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);
    articles.push({
      slug,
      title: get("title"),
      topic: get("topic"),
      kind: get("kind"),
      date: get("date"),
      sourceCount: urls.length,
      sources: urls,
    });
  }
  return articles;
}

async function readSignalsDate() {
  const text = await fs.readFile(path.join(root, "lib/content.ts"), "utf8");
  const m = text.match(/marketSignalsUpdated\s*=\s*"([^"]+)"/);
  return m ? m[1] : null;
}

const ageInDays = (iso) => Math.floor((Date.now() - Date.parse(iso)) / 86_400_000);

async function main() {
  const articles = (await readArticles()).filter((a) => a.date);
  if (articles.length === 0) throw new Error("parsed no articles out of lib/research.ts");

  for (const a of articles) a.ageDays = ageInDays(a.date);
  articles.sort((x, y) => y.ageDays - x.ageDays);

  const signalsUpdated = await readSignalsDate();
  const brief = {
    generated: new Date().toISOString().slice(0, 10),
    articleCount: articles.length,
    marketSignalsUpdated: signalsUpdated,
    marketSignalsAgeDays: signalsUpdated ? ageInDays(signalsUpdated) : null,
    oldestFirst: articles,
    topicsCovered: [...new Set(articles.map((a) => a.topic).filter(Boolean))].sort(),
  };

  if (asJson) {
    console.log(JSON.stringify(brief, null, 2));
    return;
  }

  const lines = [];
  lines.push(`Research brief · generated ${brief.generated}`, "");
  lines.push(
    `${brief.articleCount} published briefs. Market signals last updated ` +
      `${brief.marketSignalsUpdated} (${brief.marketSignalsAgeDays} days ago).`,
    "",
  );
  lines.push("Oldest first:", "");
  for (const a of articles) {
    lines.push(
      `- ${a.date} (${a.ageDays}d) · ${a.topic ?? "no topic"} · ${a.slug}`,
      `    ${a.title}`,
      `    ${a.sourceCount} cited source${a.sourceCount === 1 ? "" : "s"}`,
    );
  }
  lines.push("", `Topics covered: ${brief.topicsCovered.join(", ")}`, "");
  lines.push("Every URL already cited, so a review does not re-cite the same page as new:", "");
  for (const u of [...new Set(articles.flatMap((a) => a.sources))].sort()) {
    lines.push(`  ${u}`);
  }
  console.log(lines.join("\n"));
}

main().catch((error) => {
  console.error(`research brief failed: ${error.message}`);
  process.exitCode = 1;
});
