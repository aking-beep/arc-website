/**
 * Pull the three libraries and turn them into Playbook appendices, printed in
 * full.
 *
 * Why at build time rather than committed: the libraries have their own
 * repositories and change on their own schedule. A copy in this repo would be
 * stale within a month and the Playbook would start describing skills that no
 * longer exist. This records the commit SHA it pulled so the colophon can say
 * exactly which revision a buyer is holding.
 *
 *   node scripts/playbook/fetch-appendices.mjs
 *
 * Writes:
 *   playbook/build/assets/<id>/      editable catalog files, for the ZIP
 *   playbook/build/appendices/*.md   appendix pages, for the PDF
 *   playbook/build/appendices/sources.json
 *
 * Set GITHUB_TOKEN to avoid the unauthenticated API rate limit. Nothing here
 * needs write access or a private credential.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import { libraries } from "./libraries.mjs";
import { paths, parseFrontMatter, readJson, slugify, writeFileEnsured } from "./util.mjs";

const API = "https://api.github.com";

async function api(url) {
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "arc-playbook-build",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `GitHub request failed: ${response.status} ${response.statusText} for ${url}` +
        (response.status === 403
          ? "\nThis is usually the unauthenticated rate limit. Set GITHUB_TOKEN and retry."
          : ""),
    );
  }
  return response.json();
}

async function resolveHead(library) {
  const repoInfo = await api(`${API}/repos/${library.owner}/${library.repo}`);
  const branch = repoInfo.default_branch;
  const commit = await api(
    `${API}/repos/${library.owner}/${library.repo}/commits/${branch}`,
  );
  return {
    branch,
    sha: commit.sha,
    shortSha: commit.sha.slice(0, 7),
    committedAt: commit.commit?.committer?.date ?? null,
    htmlUrl: repoInfo.html_url,
  };
}

async function downloadRepo(library, head, tmpDir) {
  const tarball = path.join(tmpDir, `${library.repo}.tar.gz`);
  const url = `https://codeload.github.com/${library.owner}/${library.repo}/tar.gz/${head.sha}`;
  const response = await fetch(url, { headers: { "user-agent": "arc-playbook-build" } });
  if (!response.ok) {
    throw new Error(`Could not download ${library.repo}: ${response.status}`);
  }
  await fs.writeFile(tarball, Buffer.from(await response.arrayBuffer()));

  const extracted = path.join(tmpDir, library.repo);
  await fs.mkdir(extracted, { recursive: true });
  execFileSync("tar", ["-xzf", tarball, "-C", extracted, "--strip-components=1"], {
    stdio: "pipe",
  });
  await fs.rm(tarball, { force: true });
  return extracted;
}

/**
 * Catalog entries are either a directory holding `entryFile` (skills) or a
 * Markdown file one category deep (architectures, templates).
 */
async function collectEntries(library, repoRoot) {
  const catalogRoot = path.join(repoRoot, library.dir);
  const entries = [];

  if (library.entryFile) {
    for (const item of await fs.readdir(catalogRoot, { withFileTypes: true })) {
      if (!item.isDirectory()) continue;
      const file = path.join(catalogRoot, item.name, library.entryFile);
      const raw = await fs.readFile(file, "utf8").catch(() => null);
      if (raw === null) continue;
      entries.push({ key: item.name, category: null, raw });
    }
  } else {
    for (const group of await fs.readdir(catalogRoot, { withFileTypes: true })) {
      if (!group.isDirectory()) continue;
      const groupDir = path.join(catalogRoot, group.name);
      for (const item of await fs.readdir(groupDir, { withFileTypes: true })) {
        if (!item.isFile() || !item.name.endsWith(".md")) continue;
        const raw = await fs.readFile(path.join(groupDir, item.name), "utf8");
        entries.push({
          key: `${group.name}/${item.name.replace(/\.md$/, "")}`,
          category: group.name,
          raw,
        });
      }
    }
  }

  entries.sort((a, b) => a.key.localeCompare(b.key));
  return entries;
}

/**
 * Skills carry a slug rather than a title, so the title is derived. Title-case
 * mangles the acronyms, and "Mcp Server Review" in a paid product looks like
 * nobody read it.
 */
const ACRONYMS = new Map(
  [
    "AI", "API", "CRM", "ICP", "LLM", "MCP", "MVP", "PR", "RAG", "RFP",
    "SOW", "SRE", "UX",
  ].map((word) => [word.toLowerCase(), word]),
);
ACRONYMS.set("devops", "DevOps");
ACRONYMS.set("saas", "SaaS");
ACRONYMS.set("hitl", "HITL");

const MINOR_WORDS = new Set(["a", "an", "and", "for", "from", "of", "the", "to", "with"]);

function titleCase(slug) {
  return slug
    .split(/[-\s]+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return ACRONYMS.get(lower);
      if (index > 0 && MINOR_WORDS.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Prepare an entry's own Markdown for printing inside an appendix.
 *
 * The appendix owns h1 and the module group owns h2, so the entry becomes h3
 * and everything it wrote as a section has to move down with it. Without the
 * shift, an entry's `## Steps` would outrank the entry it belongs to and the
 * table of contents would read as nonsense.
 */
function prepareBody(body) {
  const lines = [];
  let inFence = false;
  let droppedTitle = false;

  for (const line of body.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      lines.push(line);
      continue;
    }

    if (inFence) {
      lines.push(line);
      continue;
    }

    // The entry's own h1 repeats the title we print above it.
    if (!droppedTitle && /^#\s+/.test(line)) {
      droppedTitle = true;
      continue;
    }

    // Images are repo-relative and their alt text repeats the paragraph above.
    if (/^\s*!\[[^\]]*\]\([^)]*\)\s*$/.test(line)) continue;

    // Internal provenance ("Harvested from: Operator-AI / 01_Synthetic…").
    // Accurate inside the repo, meaningless to a buyer.
    if (/^\s*_Harvested from:_/i.test(line)) continue;

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const depth = Math.min(heading[1].length + 2, 6);
      lines.push(`${"#".repeat(depth)} ${heading[2]}`);
      continue;
    }

    lines.push(line);
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function describe(entry) {
  const { data, body } = parseFrontMatter(entry.raw);
  const title =
    data.title ||
    (data.name && titleCase(data.name)) ||
    titleCase(entry.key.split("/").pop());

  // Skills keep their one-line summary in front matter, so it has to be
  // printed. The architectures and templates open with the same sentence in
  // the body itself, and printing it twice would just look careless.
  const summary = (data.description || "").replace(/\s+/g, " ").trim();

  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string"
      ? data.tags.split(",").map((tag) => tag.trim())
      : [];

  return {
    title,
    summary,
    body: prepareBody(body),
    category: data.category || entry.category || "",
    difficulty: data.difficulty || "",
    compatibility: data.compatibility || "",
    tags: tags.filter(Boolean),
  };
}

function moduleFor(curation, library, entry) {
  const config = curation.libraries[library.id];
  if (!config) return null;
  const explicit = config.entries?.[entry.key];
  if (explicit) return explicit;
  const fallback = config.categoryDefault;
  if (typeof fallback === "string") return fallback;
  return fallback?.[entry.category] ?? null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Every skill declares the same runtimes and a couple add a sentence on top.
 * The appendix lead already names the runtimes, so printing that sentence
 * twenty more times is noise. Return the shared opening so only the part an
 * entry adds gets printed — and only when it ends cleanly, otherwise the
 * remainder would start mid-sentence.
 */
function sharedCompatibility(entries) {
  const values = entries.map((entry) => entry.compatibility).filter(Boolean);
  if (values.length < 2) return "";

  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (prefix && !value.startsWith(prefix)) {
      prefix = prefix.slice(0, prefix.lastIndexOf(" ") + 1).trimEnd();
    }
    if (!prefix) return "";
  }
  return /[.!?]$/.test(prefix) ? prefix : "";
}

function renderAppendix(library, head, entries, curation) {
  const byModule = new Map();
  for (const entry of entries) {
    const key = entry.module ?? "unsorted";
    if (!byModule.has(key)) byModule.set(key, []);
    byModule.get(key).push(entry);
  }
  const moduleKeys = [...byModule.keys()].sort();
  const sharedRuntime = sharedCompatibility(entries);

  const lines = [
    "---",
    `section: appendix`,
    `title: ${library.title}`,
    `appendix: "${library.appendix}"`,
    "---",
    "",
    `# Appendix ${library.appendix} · ${library.title}`,
    "",
    library.lead,
    "",
    library.useWhen,
    "",
    `**${entries.length} entries, printed in full**, grouped by the module that ` +
      `sends you to them. Every one is also in the ZIP under \`${library.id}/\` ` +
      `so you can edit it.`,
    "",
    // Index first. Fifty-odd entries printed in full is a reference section,
    // and a reference section without a contents list is a pile of paper.
    "## In this appendix",
    "",
    `| Module | ${library.id === "skills" ? "Skill" : library.id === "architectures" ? "Architecture" : "Workflow"} | File |`,
    "| --- | --- | --- |",
  ];

  for (const key of moduleKeys) {
    for (const entry of byModule.get(key)) {
      lines.push(
        `| ${key === "unsorted" ? "—" : key} | ${entry.title} | \`${entry.key}\` |`,
      );
    }
  }
  lines.push("");

  for (const key of moduleKeys) {
    const heading =
      key === "unsorted"
        ? "Not yet placed"
        : `Module ${key} · ${curation.modules[key] ?? ""}`.trim();
    lines.push('<div class="module-group">', "", `## ${heading}`, "", "</div>", "");

    for (const entry of byModule.get(key)) {
      const meta = [entry.category, entry.difficulty, ...entry.tags]
        .filter(Boolean)
        .join(" · ");

      lines.push('<div class="appendix-entry">', "");
      lines.push(`### ${entry.title}`, "");
      lines.push(
        `<p class="entry-meta">${escapeHtml(entry.key)}${meta ? ` — ${escapeHtml(meta)}` : ""}</p>`,
        "",
      );
      if (entry.summary) lines.push(entry.summary, "");

      const runtime = entry.compatibility.slice(sharedRuntime.length).trim();
      if (runtime) lines.push(`*${runtime}*`, "");
      lines.push(entry.body, "");
      lines.push("</div>", "");
    }
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

/**
 * Appendix D is one page: which revision of each library is bound into this
 * copy, and what the buyer may do with all of it.
 */
function renderUsage(results) {
  const total = results.reduce((sum, result) => sum + result.entries.length, 0);

  const lines = [
    "---",
    "section: appendix",
    "title: Usage and edition",
    'appendix: "D"',
    "---",
    "",
    "# Appendix D · Usage and edition",
    "",
    "## What you may do with this",
    "",
    "Everything in this bundle — the Playbook text, the eleven worksheets, and all",
    `${total} entries in appendices A, B and C — is © ARC Transformation Group.`,
    "",
    "Your purchase covers use by you and your team: read it, print it, fill in the",
    "worksheets, copy the skills and templates into your own repositories, and",
    "adapt any of it for products you are building. You do not need to ask and you",
    "do not need to credit us.",
    "",
    "It does not cover redistributing the bundle itself, or using it as paid",
    "training material for other organisations. Email us for that rather than",
    "buying twelve copies, and we will sort out a licence.",
    "",
    "## This edition",
    "",
    "The three libraries are assembled when the PDF is built, so the revisions",
    "below are exactly what is printed in this copy. Quote the revision if you",
    "ever need to ask us about a specific entry.",
    "",
    "| Appendix | Library | Entries | Revision | Dated |",
    "| --- | --- | --- | --- | --- |",
  ];

  for (const result of results) {
    lines.push(
      `| ${result.library.appendix} ` +
        `| ${result.library.title} ` +
        `| ${result.entries.length} ` +
        `| \`${result.head.shortSha}\` ` +
        `| ${result.head.committedAt ? result.head.committedAt.slice(0, 10) : "—"} |`,
    );
  }

  lines.push(
    "",
    "## Updates",
    "",
    "The download link from your purchase email resolves to the current revision of",
    "this edition. When the libraries are refreshed, the same link gives you the new",
    "bundle — there is nothing to buy again and nothing to log into.",
    "",
    "## One note on the architecture illustrations",
    "",
    "Appendix B describes a scenario image for each architecture. The images are not",
    "printed here, because each one's caption repeats the Scenario paragraph",
    "immediately above it and twenty of them would add several megabytes to a file",
    "you have to download. They are in the ZIP under `architectures/scenarios/`.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

async function main() {
  const curation = await readJson(path.join(paths.playbook, "curation.json"));
  const tmpDir = path.join(paths.build, "tmp");
  const assetsDir = path.join(paths.build, "assets");
  const appendicesDir = path.join(paths.build, "appendices");

  await fs.rm(tmpDir, { recursive: true, force: true });
  await fs.rm(assetsDir, { recursive: true, force: true });
  await fs.rm(appendicesDir, { recursive: true, force: true });
  await fs.mkdir(tmpDir, { recursive: true });

  const results = [];

  for (const library of libraries) {
    process.stdout.write(`  ${library.repo} … `);
    const head = await resolveHead(library);
    const repoRoot = await downloadRepo(library, head, tmpDir);
    const raw = await collectEntries(library, repoRoot);

    const entries = raw.map((entry) => ({
      key: entry.key,
      slug: slugify(entry.key),
      module: moduleFor(curation, library, entry),
      ...describe(entry),
    }));

    // Editable copies into the bundle, exactly as published.
    const target = path.join(assetsDir, library.id);
    await fs.cp(path.join(repoRoot, library.dir), target, { recursive: true });

    // Anything the PDF leaves out still ships, so the buyer is not missing a
    // file just because printing it was a bad trade.
    for (const extra of library.extraDirs ?? []) {
      const source = path.join(repoRoot, extra);
      const exists = await fs
        .access(source)
        .then(() => true)
        .catch(() => false);
      if (exists) {
        await fs.cp(source, path.join(target, path.basename(extra)), {
          recursive: true,
        });
      }
    }

    await writeFileEnsured(
      path.join(appendicesDir, `9${library.appendix.toLowerCase()}-appendix-${library.id}.md`),
      renderAppendix(library, head, entries, curation),
    );

    results.push({ library, head, entries });
    console.log(`${entries.length} entries at ${head.shortSha}`);
  }

  await writeFileEnsured(
    path.join(appendicesDir, "9d-appendix-usage.md"),
    renderUsage(results),
  );

  await writeFileEnsured(
    path.join(appendicesDir, "sources.json"),
    `${JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        libraries: results.map(({ library, head, entries }) => ({
          id: library.id,
          appendix: library.appendix,
          title: library.title,
          repo: head.htmlUrl,
          branch: head.branch,
          sha: head.sha,
          shortSha: head.shortSha,
          committedAt: head.committedAt,
          entryCount: entries.length,
        })),
      },
      null,
      2,
    )}\n`,
  );

  await fs.rm(tmpDir, { recursive: true, force: true });

  const total = results.reduce((sum, result) => sum + result.entries.length, 0);
  console.log(`  appendices written — ${total} entries across ${results.length} libraries`);
}

main().catch((error) => {
  console.error(`\nfetch-appendices failed: ${error.message}`);
  process.exitCode = 1;
});
