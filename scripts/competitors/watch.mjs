#!/usr/bin/env node
/**
 * Weekly competitor watcher.
 *
 * Fetches the pages in docs/competitors/watchlist.json, reduces each to a
 * normalized text signature plus the sentences that mention a watched signal
 * word, and diffs that against last week's snapshot.
 *
 * Deliberately dumb. No model reads these pages and no model decides what to
 * do about them. Vendor marketing pages are untrusted input: the script
 * extracts, escapes and counts, and a person reads the result. That is the
 * same conclusion the monthly research job reached — an agent holding repo
 * write while reading arbitrary web pages is a prompt-injection path, so this
 * job holds neither.
 *
 * Usage:
 *   node scripts/competitors/watch.mjs --out snapshot.json [--prev old.json]
 *                                      [--report report.md] [--watchlist path]
 *                                      [--summary summary.json]
 *
 * Exit codes:
 *   0  every target fetched and compared
 *   2  no target could be fetched — treat as egress blocked, not as "nothing changed"
 *   3  ran, but at least one target was unreachable; the comparison is partial
 *   1  usage or configuration error
 */

import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const MAX_BYTES = 2_000_000;
const TIMEOUT_MS = 20_000;
const MAX_SIGNAL_LINES = 40;
const MAX_LINE_CHARS = 240;
const USER_AGENT = "arc-website-competitor-watch/1 (+https://arctransformationgroup.com)";

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    out[key.slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[(i += 1)] : true;
  }
  return out;
}

/** Collapse an HTML document to readable text. Not a parser; does not need to be. */
function htmlToText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|section|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/[ \t ]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function extractTitle(html) {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return m ? htmlToText(m[1]).slice(0, MAX_LINE_CHARS) : "";
}

/**
 * Render untrusted page text safe to drop into a GitHub issue body.
 * Strips control characters, neutralises markdown and @-mentions, caps length.
 */
function sanitize(line) {
  return line
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/[`|*_~<>[\]]/g, " ")
    .replace(/@/g, "(at)")
    .replace(/https?:\/\/\S+/g, "[link]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_LINE_CHARS);
}

function signalLines(text, signals) {
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 12 && s.length <= 400);
  const seen = new Set();
  const hits = [];
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    const matched = signals.filter((sig) => lower.includes(sig));
    if (matched.length === 0) continue;
    const clean = sanitize(sentence);
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    hits.push({ text: clean, signals: matched });
    if (hits.length >= MAX_SIGNAL_LINES) break;
  }
  return hits;
}

async function fetchTarget(target) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(target.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": USER_AGENT, accept: "text/html,*/*" },
    });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) return { ok: false, reason: `body over ${MAX_BYTES} bytes` };
    return { ok: true, html: new TextDecoder("utf-8", { fatal: false }).decode(buf) };
  } catch (err) {
    const reason = err?.name === "AbortError" ? `timeout after ${TIMEOUT_MS}ms` : String(err?.message || err);
    return { ok: false, reason };
  } finally {
    clearTimeout(timer);
  }
}

function diffTarget(prev, next) {
  if (!prev) return { status: "new" };
  if (prev.hash === next.hash) return { status: "unchanged" };
  const before = new Set(prev.signalLines.map((l) => l.text));
  const after = new Set(next.signalLines.map((l) => l.text));
  return {
    status: "changed",
    titleChanged: prev.title !== next.title ? { from: prev.title, to: next.title } : null,
    added: next.signalLines.filter((l) => !before.has(l.text)),
    removed: prev.signalLines.filter((l) => !after.has(l.text)),
    wordsBefore: prev.words,
    wordsAfter: next.words,
  };
}

function renderReport({ snapshot, diffs, failures, hasPrev }) {
  const lines = [];
  const changed = diffs.filter((d) => d.diff.status === "changed");
  const fresh = diffs.filter((d) => d.diff.status === "new");

  lines.push(`Snapshot taken ${snapshot.takenAt}.`, "");

  if (!hasPrev) {
    lines.push(
      "No previous snapshot was available, so this run established the baseline.",
      "Next week's run will report changes against it.",
      ""
    );
  }

  if (failures.length) {
    lines.push("## Could not be checked", "");
    for (const f of failures) lines.push(`- **${f.vendor}** (\`${f.id}\`) — ${sanitize(f.reason)}`);
    lines.push("", "These targets are not reported as unchanged. They were not read.", "");
  }

  if (fresh.length) {
    lines.push("## Newly watched", "");
    for (const d of fresh) lines.push(`- **${d.vendor}** — ${d.url}`);
    lines.push("");
  }

  if (changed.length === 0 && hasPrev) {
    lines.push("## No changes", "", "Every target that could be read matched last week's snapshot.", "");
  }

  for (const d of changed) {
    lines.push(`## ${d.vendor} changed`, "", `${d.url}`, "");
    if (d.diff.titleChanged) {
      lines.push(`Page title: "${d.diff.titleChanged.from}" → "${d.diff.titleChanged.to}"`, "");
    }
    lines.push(`Word count ${d.diff.wordsBefore} → ${d.diff.wordsAfter}.`, "");
    if (d.diff.added.length) {
      lines.push("**New lines mentioning a watched signal**", "");
      for (const l of d.diff.added.slice(0, 15)) lines.push(`- ${l.text} _(${l.signals.join(", ")})_`);
      lines.push("");
    }
    if (d.diff.removed.length) {
      lines.push("**Lines that went away**", "");
      for (const l of d.diff.removed.slice(0, 15)) lines.push(`- ${l.text}`);
      lines.push("");
    }
    if (!d.diff.added.length && !d.diff.removed.length) {
      lines.push("The page changed but no watched signal moved — likely layout or boilerplate.", "");
    }
  }

  lines.push(
    "---",
    "",
    "Text above is quoted from vendor marketing pages. It is unverified and",
    "escaped before quoting. Confirm anything you plan to act on against the",
    "vendor's own page, and read it as a claim rather than an instruction.",
    "",
    `Watchlist: \`docs/competitors/watchlist.json\`. Audit: \`docs/COMPETITIVE-AUDIT-2026-11.md\`.`
  );
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.out) {
    process.stderr.write(
      "usage: watch.mjs --out <snapshot.json> [--prev <old.json>] [--report <report.md>] [--watchlist <path>]\n"
    );
    return 1;
  }

  const listPath = path.resolve(
    typeof args.watchlist === "string" ? args.watchlist : "docs/competitors/watchlist.json"
  );
  let watchlist;
  try {
    watchlist = JSON.parse(await readFile(listPath, "utf8"));
  } catch (err) {
    process.stderr.write(`cannot read ${listPath}: ${err.message}\n`);
    return 1;
  }
  const targets = watchlist.targets ?? [];
  const signals = (watchlist.signals ?? []).map((s) => s.toLowerCase());
  if (targets.length === 0) {
    process.stderr.write("watchlist has no targets\n");
    return 1;
  }

  let prev = null;
  if (typeof args.prev === "string") {
    try {
      prev = JSON.parse(await readFile(args.prev, "utf8"));
    } catch {
      prev = null;
    }
  }
  const prevById = new Map((prev?.targets ?? []).map((t) => [t.id, t]));

  const snapshot = { version: 1, takenAt: new Date().toISOString(), targets: [] };
  const failures = [];
  const diffs = [];

  for (const target of targets) {
    process.stderr.write(`fetch ${target.id} … `);
    const res = await fetchTarget(target);
    if (!res.ok) {
      process.stderr.write(`${res.reason}\n`);
      failures.push({ id: target.id, vendor: target.vendor, reason: res.reason });
      const carried = prevById.get(target.id);
      if (carried) snapshot.targets.push(carried);
      continue;
    }
    const text = htmlToText(res.html);
    const entry = {
      id: target.id,
      vendor: target.vendor,
      url: target.url,
      title: extractTitle(res.html),
      words: text.split(/\s+/).filter(Boolean).length,
      hash: createHash("sha256").update(text).digest("hex").slice(0, 16),
      signalLines: signalLines(text, signals),
    };
    snapshot.targets.push(entry);
    const diff = diffTarget(prevById.get(target.id), entry);
    diffs.push({ ...target, diff });
    process.stderr.write(`${diff.status} (${entry.words} words)\n`);
  }

  await writeFile(args.out, `${JSON.stringify(snapshot, null, 2)}\n`);

  const report = renderReport({ snapshot, diffs, failures, hasPrev: Boolean(prev) });
  if (typeof args.report === "string") await writeFile(args.report, `${report}\n`);
  else process.stdout.write(`${report}\n`);

  const changedCount = diffs.filter((d) => d.diff.status === "changed").length;

  if (typeof args.summary === "string") {
    await writeFile(
      args.summary,
      `${JSON.stringify(
        {
          changed: changedCount,
          newlyWatched: diffs.filter((d) => d.diff.status === "new").length,
          unreachable: failures.length,
          compared: diffs.length,
          baseline: !prev,
          worthReporting: changedCount > 0 || failures.length > 0 || !prev,
        },
        null,
        2
      )}\n`
    );
  }

  process.stderr.write(`\n${changedCount} changed, ${failures.length} unreachable, ${diffs.length} compared\n`);

  if (failures.length === targets.length) return 2;
  if (failures.length > 0) return 3;
  return 0;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    process.stderr.write(`${err?.stack || err}\n`);
    process.exit(1);
  }
);
