/**
 * Read and update a local env file without printing values.
 *
 * Existing process environment wins over the file, so a shell export is not
 * overwritten by a stale .env.local. Writes replace one key or append it.
 * Other lines, including secrets this script did not set, stay as they were.
 */

import fs from "node:fs/promises";

/** @param {string} text @returns {Record<string, string>} */
export function parseEnv(text) {
  /** @type {Record<string, string>} */
  const values = {};
  for (const line of text.split(/\r?\n/)) {
    const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
    if (!match) continue;
    values[match[1]] = unquote(match[2]);
  }
  return values;
}

export async function loadEnvFile(file, env = process.env) {
  const text = await fs.readFile(file, "utf8").catch((error) => {
    if (error && error.code === "ENOENT") return null;
    throw error;
  });
  if (text === null) return {};

  const values = parseEnv(text);
  for (const [key, value] of Object.entries(values)) {
    if (env[key] === undefined) env[key] = value;
  }
  return values;
}

/**
 * Set keys on an env file. Values are written unquoted when they are a single
 * token, and double-quoted otherwise. Returns the keys that changed.
 */
export async function upsertEnv(file, updates) {
  const text = await fs.readFile(file, "utf8").catch((error) => {
    if (error && error.code === "ENOENT") return "";
    throw error;
  });

  let next = text;
  if (next.length > 0 && !next.endsWith("\n")) next += "\n";

  const changed = [];
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === null || value === "") continue;
    const rendered = `${key}=${quote(String(value))}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    if (pattern.test(next)) {
      const replaced = next.replace(pattern, rendered);
      if (replaced !== next) changed.push(key);
      next = replaced;
    } else {
      if (!next.endsWith("\n") && next.length > 0) next += "\n";
      next += `${rendered}\n`;
      changed.push(key);
    }
  }

  if (changed.length > 0) {
    await fs.writeFile(file, next, { mode: 0o600 });
  }
  return changed;
}

function unquote(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function quote(value) {
  if (/^[A-Za-z0-9_./:@+-]+$/.test(value)) return value;
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
