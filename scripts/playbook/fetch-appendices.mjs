/**
 * Pull the three open-source libraries and turn them into Playbook appendices.
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
 *   playbook/build/assets/<id>/      raw catalog + LICENSE, for the ZIP
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
    license: repoInfo.license?.spdx_id ?? library.license,
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

function describe(entry) {
  const { data, body } = parseFrontMatter(entry.raw);
  const title =
    data.title ||
    (data.name && titleCase(data.name)) ||
    titleCase(entry.key.split("/").pop());

  // Skills put a usable summary in `description`. The architectures and
  // templates do not, so take the first real sentence of the body instead.
  let summary = data.description || "";
  if (!summary) {
    const firstParagraph = body
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .find(
        (block) =>
          block &&
          !block.startsWith("#") &&
          !block.startsWith("!") &&
          !block.startsWith("```") &&
          !block.startsWith("_"),
      );
    summary = firstParagraph ? firstParagraph.replace(/\s+/g, " ") : "";
  }
  if (summary.length > 260) summary = `${summary.slice(0, 257).trimEnd()}…`;

  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string"
      ? data.tags.split(",").map((tag) => tag.trim())
      : [];

  return {
    title,
    summary,
    category: data.category || entry.category || "",
    difficulty: data.difficulty || "",
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

function renderAppendix(library, head, entries, curation) {
  const byModule = new Map();
  for (const entry of entries) {
    const key = entry.module ?? "unsorted";
    if (!byModule.has(key)) byModule.set(key, []);
    byModule.get(key).push(entry);
  }
  const moduleKeys = [...byModule.keys()].sort();

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
    `**${entries.length} entries**, grouped by the module that sends you to them. ` +
      `The full text of every entry is in the ZIP that came with this PDF, under ` +
      `\`${library.id}/\`. This appendix is the index.`,
    "",
    `*Pulled from \`${library.owner}/${library.repo}\` at \`${head.shortSha}\`` +
      (head.committedAt ? ` (${head.committedAt.slice(0, 10)})` : "") +
      `. ${head.license} licensed — see appendix D.*`,
    "",
  ];

  for (const key of moduleKeys) {
    const heading =
      key === "unsorted"
        ? "Not yet placed"
        : `Module ${key} · ${curation.modules[key] ?? ""}`.trim();
    lines.push(`## ${heading}`, "");
    for (const entry of byModule.get(key)) {
      const meta = [entry.category, entry.difficulty].filter(Boolean).join(" · ");
      lines.push('<div class="entry">', "");
      lines.push(`### ${entry.title}`, "");
      lines.push(
        `<p class="entry-meta">${escapeHtml(entry.key)}${meta ? ` — ${escapeHtml(meta)}` : ""}</p>`,
        "",
      );
      if (entry.summary) lines.push(entry.summary, "");
      lines.push("</div>", "");
    }
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function renderLicences(results) {
  const lines = [
    "---",
    "section: appendix",
    "title: Licences and attribution",
    'appendix: "D"',
    "---",
    "",
    "# Appendix D · Licences and attribution",
    "",
    "Appendices A, B and C are published openly by ARC Transformation Group under",
    "the MIT licence. They are free to take from GitHub, and this page tells you",
    "exactly where and at which revision.",
    "",
    "What this Playbook adds is the method they attach to, and the ordering: every",
    "entry in those appendices is filed under the module where you would actually",
    "reach for it. If you only want the raw catalogs, the links below are the whole",
    "answer and you owe us nothing for them.",
    "",
    "## Revisions in this edition",
    "",
    "| Library | Repository | Revision | Entries | Licence |",
    "| --- | --- | --- | --- | --- |",
  ];

  for (const result of results) {
    lines.push(
      `| Appendix ${result.library.appendix} — ${result.library.title} ` +
        `| ${result.head.htmlUrl} ` +
        `| \`${result.head.shortSha}\` ` +
        `| ${result.entries.length} ` +
        `| ${result.head.license} |`,
    );
  }

  lines.push(
    "",
    "## MIT licence",
    "",
    "The licence text below applies to the content of appendices A, B and C and to",
    "the corresponding directories in the accompanying ZIP. It does not apply to the",
    "Playbook text or the worksheets.",
    "",
    "```",
    results[0]?.licenseText?.trim() ?? "See the LICENSE file in each repository.",
    "```",
    "",
    "## The Playbook itself",
    "",
    "The Playbook text, the worksheets and the five-step system are © ARC",
    "Transformation Group. Your purchase covers use by you and your team, including",
    "filling in and adapting the worksheets for your own products. It does not cover",
    "redistribution or use as paid training material for other organisations — email",
    "us for that and we will sort out a licence.",
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

    // Raw catalog and licence into the bundle, exactly as published.
    const target = path.join(assetsDir, library.id);
    await fs.cp(path.join(repoRoot, library.dir), target, { recursive: true });
    const licenseText = await fs
      .readFile(path.join(repoRoot, "LICENSE"), "utf8")
      .catch(() => "");
    if (licenseText) {
      await fs.writeFile(path.join(target, "LICENSE"), licenseText);
    }

    await writeFileEnsured(
      path.join(appendicesDir, `9${library.appendix.toLowerCase()}-appendix-${library.id}.md`),
      renderAppendix(library, head, entries, curation),
    );

    results.push({ library, head, entries, licenseText });
    console.log(`${entries.length} entries at ${head.shortSha}`);
  }

  await writeFileEnsured(
    path.join(appendicesDir, "9d-appendix-licences.md"),
    renderLicences(results),
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
          license: head.license,
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
