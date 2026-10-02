/** Shared helpers for the Playbook build scripts. */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");

export const paths = {
  root,
  playbook: path.join(root, "playbook"),
  manuscript: path.join(root, "playbook", "manuscript"),
  theme: path.join(root, "playbook", "theme"),
  build: path.join(root, "playbook", "build"),
};

/**
 * Minimal YAML front matter reader.
 *
 * Deliberately not a YAML parser. The front matter in this repo and in the
 * three libraries is flat keys, inline `[a, b]` lists and two-space nested
 * maps, so a hundred lines here is cheaper than a dependency that would then
 * need keeping current.
 */
export function parseFrontMatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  let nested = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indented = /^\s{2,}(\S[^:]*):\s*(.*)$/.exec(line);
    if (indented && nested) {
      nested.target[indented[1].trim()] = coerce(indented[2]);
      continue;
    }

    const top = /^([A-Za-z0-9_.-]+):\s*(.*)$/.exec(line);
    if (!top) continue;

    const [, key, value] = top;
    if (value === "") {
      const target = {};
      data[key] = target;
      nested = { key, target };
    } else {
      data[key] = coerce(value);
      nested = null;
    }
  }

  return { data, body: raw.slice(match[0].length) };
}

function coerce(value) {
  const trimmed = value.trim().replace(/\s+#\s.*$/, "");
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => unquote(item.trim()))
      .filter(Boolean);
  }
  return unquote(trimmed);
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

export async function writeFileEnsured(file, contents) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, contents);
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Chrome locations, in the order worth trying. CHROME_PATH wins. */
export async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/local/bin/google-chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try the next one
    }
  }

  throw new Error(
    "No Chrome found. Install Chrome or set CHROME_PATH to its executable.",
  );
}
