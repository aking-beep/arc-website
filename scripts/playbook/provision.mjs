/**
 * Create the Paddle prices and upload the private files, when the accounts exist.
 *
 *   node scripts/playbook/provision.mjs
 *
 * Reads .env.local. Does not invent price ids, bucket names, or secrets.
 * Sandbox is the default. Production prices are created only when
 * PADDLE_ENVIRONMENT=production and --confirm-production is passed.
 *
 * What this can do with a key:
 *   - find or create one one-time USD price per playbook
 *   - write that price id into .env.local
 *   - create a private Storage bucket named by PLAYBOOK_STORAGE_BUCKET
 *   - upload the six built objects and write their paths
 *
 * What this cannot mint, and will say so:
 *   - the Paddle client-side token
 *   - the webhook secret (unless --create-webhook and a public https site URL)
 *   - the Resend API key
 *   - the purchases table (that is the SQL migration)
 */

import fs from "node:fs/promises";
import path from "node:path";

import { editions, priceMatchesEdition } from "./editions.mjs";
import { loadEnvFile, upsertEnv } from "./env-file.mjs";
import { paths } from "./util.mjs";

const envFile = path.join(paths.root, ".env.local");
const confirmProduction = process.argv.includes("--confirm-production");
const createWebhook = process.argv.includes("--create-webhook");

function paddleBase() {
  return process.env.PADDLE_ENVIRONMENT === "production"
    ? "https://api.paddle.com"
    : "https://sandbox-api.paddle.com";
}

function fail(message) {
  console.error(`\nprovision failed: ${message}`);
  process.exitCode = 1;
}

async function paddle(method, pathname, body) {
  const response = await fetch(`${paddleBase()}${pathname}`, {
    method,
    headers: {
      authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
      "content-type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }
  if (!response.ok) {
    const detail = payload?.error?.detail || text.slice(0, 400);
    throw new Error(`Paddle ${method} ${pathname} returned ${response.status}: ${detail}`);
  }
  return payload;
}

async function listAll(pathname) {
  const items = [];
  let next = pathname;
  while (next) {
    const payload = await paddle("GET", next);
    items.push(...(payload.data ?? []));
    const link = payload.meta?.pagination?.next;
    if (!link) break;
    next = link.startsWith(paddleBase()) ? link.slice(paddleBase().length) : link;
    if (next.startsWith("http")) break;
  }
  return items;
}

function productMatches(product, edition) {
  return (
    product?.custom_data?.playbook === edition.slug || product?.name === edition.productName
  );
}

async function ensurePrice(edition) {
  const envName = {
    define: "PLAYBOOK_DEFINE_PADDLE_PRICE_ID",
    build: "PLAYBOOK_BUILD_PADDLE_PRICE_ID",
    ship: "PLAYBOOK_SHIP_PADDLE_PRICE_ID",
  }[edition.slug];

  const existingId = process.env[envName];
  if (existingId) {
    const payload = await paddle("GET", `/prices/${existingId}`);
    const price = payload.data;
    if (!priceMatchesEdition(price, edition)) {
      throw new Error(
        `${envName} is ${existingId}, and that price is not a one-time USD ${(Number(edition.amountCents) / 100).toFixed(2)} charge. Refusing to replace it.`,
      );
    }
    console.log(`  ${edition.slug}: price already set and matches`);
    return existingId;
  }

  const products = await listAll("/products?per_page=200&status=active");
  let product = products.find((item) => productMatches(item, edition));

  if (!product) {
    const created = await paddle("POST", "/products", {
      name: edition.productName,
      tax_category: "digital-goods",
      description: edition.lede,
      type: "standard",
      custom_data: { playbook: edition.slug },
    });
    product = created.data;
    console.log(`  ${edition.slug}: created product ${product.id}`);
  } else {
    console.log(`  ${edition.slug}: using product ${product.id}`);
  }

  const prices = await listAll(`/prices?per_page=200&product_id=${product.id}&status=active`);
  let price = prices.find((item) => priceMatchesEdition(item, edition));

  if (!price) {
    const created = await paddle("POST", "/prices", {
      product_id: product.id,
      description: `${edition.productName}, one-time`,
      name: edition.name,
      unit_price: {
        amount: edition.amountCents,
        currency_code: "USD",
      },
      quantity: { minimum: 1, maximum: 1 },
      custom_data: { playbook: edition.slug },
    });
    price = created.data;
    if (!priceMatchesEdition(price, edition)) {
      throw new Error(
        `Paddle created ${price?.id ?? "a price"} for ${edition.slug}, and it did not come back as one-time USD ${edition.amountCents}.`,
      );
    }
    console.log(`  ${edition.slug}: created price ${price.id}`);
  } else {
    console.log(`  ${edition.slug}: reusing price ${price.id}`);
  }

  process.env[envName] = price.id;
  await upsertEnv(envFile, { [envName]: price.id });
  return price.id;
}

async function maybeCreateWebhook() {
  if (process.env.PADDLE_WEBHOOK_SECRET) {
    console.log("  webhook secret already set");
    return;
  }
  if (!createWebhook) {
    console.log(
      "  webhook secret missing. Pass --create-webhook with NEXT_PUBLIC_SITE_URL set to the public https origin, or paste the secret from Paddle → Notifications.",
    );
    return;
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL;
  let destination;
  try {
    const url = new URL(site ?? "");
    if (url.protocol !== "https:" || url.hostname === "localhost") {
      throw new Error("site URL must be public https");
    }
    destination = `${url.origin}/api/paddle/webhook`;
  } catch {
    throw new Error(
      "--create-webhook needs NEXT_PUBLIC_SITE_URL to be a public https origin. No webhook was created.",
    );
  }

  const created = await paddle("POST", "/notification-settings", {
    description: "ARC playbook purchases",
    type: "url",
    destination,
    active: true,
    api_version: 1,
    subscribed_events: [{ name: "transaction.completed" }, { name: "transaction.paid" }],
  });

  const secret = created.data?.endpoint_secret_key;
  if (!secret) {
    throw new Error(
      "Paddle created a notification destination and did not return an endpoint secret. Check the dashboard.",
    );
  }
  process.env.PADDLE_WEBHOOK_SECRET = secret;
  await upsertEnv(envFile, { PADDLE_WEBHOOK_SECRET: secret });
  console.log(`  webhook destination created for ${destination}`);
}

function supabaseHeaders(contentType) {
  return {
    authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    ...(contentType ? { "content-type": contentType } : {}),
  };
}

async function supabase(method, pathname, body, contentType) {
  const root = process.env.SUPABASE_URL.replace(/\/+$/, "");
  const response = await fetch(`${root}${pathname}`, {
    method,
    headers: supabaseHeaders(contentType),
    body,
  });
  const text = await response.text();
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }
  return { ok: response.ok, status: response.status, payload };
}

async function ensureBucket() {
  const bucket = process.env.PLAYBOOK_STORAGE_BUCKET;
  const created = await supabase("POST", "/storage/v1/bucket", JSON.stringify({
    id: bucket,
    name: bucket,
    public: false,
  }), "application/json");

  if (!created.ok && created.status !== 400 && created.status !== 409) {
    const detail = typeof created.payload === "string" ? created.payload : JSON.stringify(created.payload);
    throw new Error(`Could not create storage bucket (${created.status}): ${detail.slice(0, 300)}`);
  }

  const info = await supabase("GET", `/storage/v1/bucket/${encodeURIComponent(bucket)}`);
  if (!info.ok) {
    throw new Error(`Storage bucket "${bucket}" is not readable (${info.status}).`);
  }
  if (info.payload?.public === true) {
    const locked = await supabase(
      "PUT",
      `/storage/v1/bucket/${encodeURIComponent(bucket)}`,
      JSON.stringify({ public: false }),
      "application/json",
    );
    if (!locked.ok) {
      throw new Error(
        `Bucket "${bucket}" is public. Downloads require a private bucket, and locking it failed (${locked.status}).`,
      );
    }
    console.log(`  bucket ${bucket}: was public, now private`);
  } else {
    console.log(`  bucket ${bucket}: private`);
  }
}

async function uploadFile(bucket, objectPath, file, contentType) {
  const bytes = await fs.readFile(file);
  const encoded = objectPath.split("/").map(encodeURIComponent).join("/");
  const root = process.env.SUPABASE_URL.replace(/\/+$/, "");
  const response = await fetch(
    `${root}/storage/v1/object/${encodeURIComponent(bucket)}/${encoded}`,
    {
      method: "POST",
      headers: {
        ...supabaseHeaders(contentType),
        "x-upsert": "true",
      },
      body: bytes,
    },
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed for ${objectPath} (${response.status}): ${text.slice(0, 300)}`);
  }
}

async function uploadEditions() {
  const bucket = process.env.PLAYBOOK_STORAGE_BUCKET;
  await ensureBucket();

  const updates = {};
  for (const edition of editions) {
    const dir = path.join(paths.build, edition.slug);
    const pdf = path.join(dir, edition.pdfFile);
    const zip = path.join(dir, edition.zipFile);
    await fs.access(pdf);
    await fs.access(zip);

    const pdfObject = process.env[pdfEnv(edition.slug)] || edition.pdfObject;
    const zipObject = process.env[zipEnv(edition.slug)] || edition.zipObject;
    await uploadFile(bucket, pdfObject, pdf, "application/pdf");
    await uploadFile(bucket, zipObject, zip, "application/zip");
    updates[pdfEnv(edition.slug)] = pdfObject;
    updates[zipEnv(edition.slug)] = zipObject;
    console.log(`  uploaded ${edition.slug}`);
  }

  await upsertEnv(envFile, updates);
  Object.assign(process.env, updates);
}

function pdfEnv(slug) {
  return `PLAYBOOK_${slug.toUpperCase()}_PDF_OBJECT`;
}

function zipEnv(slug) {
  return `PLAYBOOK_${slug.toUpperCase()}_ZIP_OBJECT`;
}

async function purchasesTableExists() {
  const root = process.env.SUPABASE_URL.replace(/\/+$/, "");
  const response = await fetch(`${root}/rest/v1/playbook_purchases?select=paddle_transaction_id&limit=1`, {
    headers: {
      ...supabaseHeaders(),
      accept: "application/json",
    },
  });
  if (response.status === 401 || response.status === 403) {
    throw new Error("Supabase rejected the service-role key while checking playbook_purchases.");
  }
  return response.ok;
}

function report(lines) {
  console.log("\nStill required before a buyer can pay and download:");
  if (lines.length === 0) {
    console.log("  nothing in this checklist");
    return;
  }
  for (const line of lines) console.log(`  - ${line}`);
}

async function builtFilesMissing() {
  const missing = [];
  for (const edition of editions) {
    for (const file of [edition.pdfFile, edition.zipFile]) {
      const full = path.join(paths.build, edition.slug, file);
      try {
        await fs.access(full);
      } catch {
        missing.push(path.relative(paths.root, full));
      }
    }
  }
  return missing;
}

async function main() {
  await loadEnvFile(envFile);
  await loadEnvFile(path.join(paths.root, ".env"));

  const environment = process.env.PADDLE_ENVIRONMENT === "production" ? "production" : "sandbox";
  console.log(`Paddle environment: ${environment}`);

  if (environment === "production" && process.env.PADDLE_API_KEY && !confirmProduction) {
    fail(
      "PADDLE_ENVIRONMENT=production. Pass --confirm-production to create live prices. Nothing was created.",
    );
    return;
  }

  const gaps = [];
  const missingFiles = await builtFilesMissing();

  if (!process.env.PADDLE_API_KEY) {
    gaps.push("PADDLE_API_KEY — server key from Paddle → Developer tools → Authentication");
  } else {
    console.log("\nPrices");
    for (const edition of editions) {
      await ensurePrice(edition);
    }
    await maybeCreateWebhook();
  }

  if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
    gaps.push(
      "NEXT_PUBLIC_PADDLE_CLIENT_TOKEN — client-side token from the same Authentication page. The API does not mint this.",
    );
  }
  if (!process.env.PADDLE_WEBHOOK_SECRET) {
    gaps.push(
      "PADDLE_WEBHOOK_SECRET — notification destination for /api/paddle/webhook, event transaction.completed",
    );
  }

  const storageReady =
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.PLAYBOOK_STORAGE_BUCKET;

  if (!process.env.SUPABASE_URL) gaps.push("SUPABASE_URL");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) gaps.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!process.env.PLAYBOOK_STORAGE_BUCKET) {
    gaps.push("PLAYBOOK_STORAGE_BUCKET — the name of a private bucket you choose. No name is assumed.");
  }

  if (storageReady) {
    if (missingFiles.length > 0) {
      throw new Error(
        `Built files are missing (${missingFiles.join(", ")}). Run npm run playbook:build before uploading.`,
      );
    }
    console.log("\nStorage");
    await uploadEditions();
    const table = await purchasesTableExists();
    if (!table) {
      gaps.push(
        "purchases table — run supabase/migrations/0001_playbook_purchases.sql in the Supabase SQL editor",
      );
    }
  }

  if (!process.env.RESEND_API_KEY) gaps.push("RESEND_API_KEY — so the download link can be emailed");
  if (!process.env.PLAYBOOK_FROM_EMAIL) gaps.push("PLAYBOOK_FROM_EMAIL — a verified sender");

  if (missingFiles.length > 0 && !storageReady) {
    gaps.push(`built files — run npm run playbook:build (missing ${missingFiles.join(", ")})`);
  }

  report(gaps);
}

main().catch((error) => {
  fail(error.message);
});
