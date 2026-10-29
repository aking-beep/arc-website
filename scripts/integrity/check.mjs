/**
 * Weekly integrity check for everything this site points at.
 *
 *   node scripts/integrity/check.mjs
 *
 * The site publishes nine independently deployed ARC Labs tools, a booking
 * link and a set of cited research sources. None of them live in this
 * repository, so any of them can disappear without a single test failing.
 * This notices.
 *
 * Deliberately NOT a content generator. It verifies and reports; it never
 * writes to the site. Exit code 1 means something needs a person.
 *
 * Buckets, because "unreachable" is not one thing:
 *   ok           2xx or 3xx.
 *   broken       404, 410, DNS failure, refused connection. Real.
 *   inconclusive 403, 429, timeout. Usually bot-blocking or rate limiting
 *                rather than a dead link, so it is reported and does not
 *                fail the run. Crying wolf weekly is how a check gets muted.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** Content modules the site renders from. URLs anywhere in these count. */
const SOURCES = ["lib/content.ts", "lib/arc"];

/** Not real destinations: placeholders in demonstration data, and API hosts. */
const SKIP = [
  /^https?:\/\/api\.example\.com/,
  /^https?:\/\/(sandbox-)?api\.paddle\.com/,
  /^https?:\/\/api\.resend\.com/,
  /^https?:\/\/schema\.org/,
];

/** Days before content counts as stale. */
const STALE_DAYS = Number(process.env.INTEGRITY_STALE_DAYS ?? 60);
const TIMEOUT_MS = Number(process.env.INTEGRITY_TIMEOUT_MS ?? 15000);

/** A dead tool is a dead product. A dead citation is a weaker argument. */
function classify(url) {
  const host = new URL(url).hostname;
  if (host.endsWith("arctransformationgroup.com")) return "own site";
  if (host.includes("calendly.com")) return "booking";
  if (host.endsWith("arctransformationgrouplab.dev") || host.endsWith("vercel.app")) {
    return "ARC Labs tool";
  }
  return "cited source";
}

async function collectFiles(entry) {
  const full = path.join(root, entry);
  const stat = await fs.stat(full).catch(() => null);
  if (!stat) return [];
  if (stat.isFile()) return [full];
  const names = await fs.readdir(full);
  return names.filter((n) => n.endsWith(".ts")).map((n) => path.join(full, n));
}

async function collectUrls() {
  const found = new Map(); // url -> Set of files
  for (const entry of SOURCES) {
    for (const file of await collectFiles(entry)) {
      const text = await fs.readFile(file, "utf8");
      for (const raw of text.match(/https?:\/\/[^\s"'`)\\]+/g) ?? []) {
        const url = raw.replace(/[.,;:]+$/, "");
        if (SKIP.some((re) => re.test(url))) continue;
        let parsed;
        try {
          parsed = new URL(url);
        } catch {
          continue;
        }
        if (!parsed.hostname.includes(".")) continue;
        const where = path.relative(root, file);
        if (!found.has(url)) found.set(url, new Set());
        found.get(url).add(where);
      }
    }
  }
  return found;
}

async function probe(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        // Identify honestly. A blank UA gets blocked more often than a named one.
        "user-agent":
          "ARC-site-integrity-check/1.0 (+https://arctransformationgroup.com)",
        accept: "*/*",
      },
    });
    return { status: res.status };
  } catch (error) {
    return { error: error?.name === "AbortError" ? "timeout" : String(error?.cause?.code ?? error?.message ?? error) };
  } finally {
    clearTimeout(timer);
  }
}

async function check(url) {
  let result = await probe(url, "HEAD");
  // Plenty of hosts refuse HEAD outright. Retry those with GET before judging.
  if (result.status === 405 || result.status === 501 || result.error) {
    result = await probe(url, "GET");
  }

  if (result.error) {
    const inconclusive = result.error === "timeout";
    return {
      bucket: inconclusive ? "inconclusive" : "broken",
      detail: result.error,
    };
  }
  const s = result.status;
  if (s >= 200 && s < 400) return { bucket: "ok", detail: String(s) };
  if (s === 403 || s === 429) return { bucket: "inconclusive", detail: `${s} (likely bot-blocked)` };
  return { bucket: "broken", detail: String(s) };
}

async function staleness() {
  const text = await fs.readFile(path.join(root, "lib/content.ts"), "utf8");
  const dates = (text.match(/\d{4}-\d{2}-\d{2}/g) ?? []).sort();
  const newest = dates.at(-1);
  if (!newest) return null;
  const days = Math.floor((Date.now() - Date.parse(newest)) / 86_400_000);
  return { newest, days, stale: days > STALE_DAYS };
}

async function main() {
  const urls = await collectUrls();
  const sorted = [...urls.keys()].sort();
  console.log(`Checking ${sorted.length} external URLs the site publishes.\n`);

  const results = [];
  // Serial on purpose: a few dozen URLs, and parallel probes from one IP are
  // what turns a 200 into a 429.
  for (const url of sorted) {
    const outcome = await check(url);
    results.push({ url, ...outcome, kind: classify(url), where: [...urls.get(url)] });
    const mark = { ok: "ok  ", broken: "DEAD", inconclusive: "??  " }[outcome.bucket];
    console.log(`  ${mark} ${outcome.detail.padEnd(22)} ${url}`);
  }

  const broken = results.filter((r) => r.bucket === "broken");
  const unsure = results.filter((r) => r.bucket === "inconclusive");
  const age = await staleness();

  /*
   * Before believing the verdicts, ask whether the network was the problem.
   *
   * Twenty-four simultaneous DNS failures is not twenty-four dead sites, it
   * is one blocked egress — a sandbox, a corporate proxy, a dropped VPN.
   * Reporting that as "the whole site is broken" would be wrong in the most
   * expensive way: it files an alarming issue, nobody can reproduce it, and
   * the check gets muted. So this exits 2 (could not run) rather than 1
   * (findings), and says which it was.
   */
  const networkLevel = results.filter(
    (r) => r.bucket === "broken" && /ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ECONNRESET|CERT_/.test(r.detail),
  );
  if (results.length >= 4 && networkLevel.length > results.length / 2) {
    console.error(
      `\n${networkLevel.length} of ${results.length} URLs failed at the network level ` +
        `(${[...new Set(networkLevel.map((r) => r.detail))].join(", ")}).`,
    );
    console.error(
      "That is this machine's egress, not the sites. No report written and no issue is worth filing.",
    );
    console.error("Re-run somewhere with open outbound HTTPS.");
    process.exitCode = 2;
    return;
  }

  const lines = [];
  lines.push("## Site integrity check", "");
  lines.push(`Ran ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC against ${sorted.length} external URLs.`, "");

  if (broken.length) {
    lines.push(`### ${broken.length} broken link${broken.length === 1 ? "" : "s"}`, "");
    lines.push("| What | URL | Result | Referenced in |", "| --- | --- | --- | --- |");
    for (const r of broken) {
      lines.push(`| ${r.kind} | ${r.url} | \`${r.detail}\` | ${r.where.join(", ")} |`);
    }
    lines.push("");
    const tools = broken.filter((r) => r.kind === "ARC Labs tool");
    if (tools.length) {
      lines.push(
        `**${tools.length} of these is an ARC Labs tool.** The site tells visitors it is free to use now, so this is a broken promise on a page that ranks, not just a dead link.`,
        "",
      );
    }
  }

  if (age?.stale) {
    lines.push(
      "### Content is stale",
      "",
      `Newest dated content in \`lib/content.ts\` is **${age.newest}**, ${age.days} days ago (threshold ${STALE_DAYS}).`,
      "",
    );
  }

  if (unsure.length) {
    lines.push(`### ${unsure.length} inconclusive, no action implied`, "");
    for (const r of unsure) lines.push(`- ${r.url} — \`${r.detail}\``);
    lines.push("", "These are usually bot-blocking or rate limiting rather than dead links. Worth an eye if one persists for weeks.", "");
  }

  if (!broken.length && !age?.stale) {
    lines.push("Everything the site points at resolves, and dated content is within the freshness threshold.", "");
  }

  await fs.writeFile(path.join(root, "integrity-report.md"), lines.join("\n"));

  console.log(`\n${results.filter((r) => r.bucket === "ok").length} ok · ${broken.length} broken · ${unsure.length} inconclusive`);
  if (age) {
    console.log(`newest dated content: ${age.newest} (${age.days} days ago, threshold ${STALE_DAYS})${age.stale ? " — STALE" : ""}`);
  }
  console.log("report written to integrity-report.md");

  if (broken.length || age?.stale) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`\nintegrity check failed to run: ${error.message}`);
  process.exitCode = 2;
});
