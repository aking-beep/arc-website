// ============================================================================
// Commerce configuration.
//
// Every integration the Playbook sells through is read here and nowhere else,
// so there is one place to check what is wired and one place that decides what
// happens when something is not.
//
// Three rules this file exists to enforce:
//
//   1. No identifier is invented. There are no fallback price IDs, bucket
//      names or API hosts for the paid path. If a value is absent the feature
//      reports itself as unconfigured rather than guessing.
//   2. Only PADDLE_* values prefixed NEXT_PUBLIC_ may reach the browser.
//      Everything else in here is server-only and must never be imported into
//      a client component.
//   3. Sandbox and production are separate configurations selected by
//      PADDLE_ENVIRONMENT, so a test key can never be read as a live one.
// ============================================================================

import "server-only";

import {
  playbookPdfEnv,
  playbookPriceEnv,
  playbookSlugs,
  playbookZipEnv,
  type PlaybookSlug,
} from "@/lib/playbook";

function read(name: string): string | undefined {
  const value = process.env[name];
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

/** Collects what is missing so a caller can log it once, specifically. */
function missing(required: Record<string, string | undefined>): string[] {
  return Object.entries(required)
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

// ---------------------------------------------------------------------------
// Paddle
// ---------------------------------------------------------------------------

export type PaddleEnvironment = "sandbox" | "production";

export type PlaybookPrices = Partial<Record<PlaybookSlug, string>>;

export type PaddleConfig =
  | {
      configured: true;
      environment: PaddleEnvironment;
      apiKey: string;
      clientToken: string;
      /** One public price id per playbook. A missing entry means that playbook cannot be bought yet. */
      prices: PlaybookPrices;
      webhookSecret: string | undefined;
      apiBase: string;
    }
  | {
      configured: false;
      environment: PaddleEnvironment;
      missing: string[];
      prices: PlaybookPrices;
    };

/**
 * `sandbox` is the default on purpose. Charging real money has to be an
 * explicit act of configuration, not what happens when a variable is unset.
 */
export function paddleEnvironment(): PaddleEnvironment {
  return read("PADDLE_ENVIRONMENT") === "production" ? "production" : "sandbox";
}

/**
 * Reads the three price ids. There is no fallback and no shared id: the old
 * single-product variable is ignored on purpose, because it was a different
 * product at a different price.
 */
export function readPlaybookPrices(): PlaybookPrices {
  const prices: PlaybookPrices = {};
  for (const slug of playbookSlugs) {
    const id = read(playbookPriceEnv[slug]);
    if (id) prices[slug] = id;
  }
  return prices;
}

export function playbookSlugForPriceId(priceId: string): PlaybookSlug | null {
  const prices = readPlaybookPrices();
  for (const slug of playbookSlugs) {
    if (prices[slug] === priceId) return slug;
  }
  return null;
}

export function paddleConfig(): PaddleConfig {
  const environment = paddleEnvironment();
  const apiKey = read("PADDLE_API_KEY");
  const clientToken = read("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN");
  const webhookSecret = read("PADDLE_WEBHOOK_SECRET");
  const prices = readPlaybookPrices();

  const gaps = missing({
    PADDLE_API_KEY: apiKey,
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN: clientToken,
  });

  if (gaps.length > 0) {
    return { configured: false, environment, missing: gaps, prices };
  }

  return {
    configured: true,
    environment,
    apiKey: apiKey!,
    clientToken: clientToken!,
    prices,
    webhookSecret,
    apiBase:
      environment === "production"
        ? "https://api.paddle.com"
        : "https://sandbox-api.paddle.com",
  };
}

// ---------------------------------------------------------------------------
// Supabase — purchases and the private bundle bucket
// ---------------------------------------------------------------------------

export type SupabaseConfig =
  | {
      configured: true;
      url: string;
      serviceRoleKey: string;
      restUrl: string;
      storageUrl: string;
    }
  | { configured: false; missing: string[] };

/**
 * The service-role key bypasses row-level security, so it is server-only and
 * every call site must already have decided the request is allowed.
 */
export function supabaseConfig(): SupabaseConfig {
  const url = read("SUPABASE_URL")?.replace(/\/+$/, "");
  const serviceRoleKey = read("SUPABASE_SERVICE_ROLE_KEY");

  const gaps = missing({
    SUPABASE_URL: url,
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
  });
  if (gaps.length > 0) return { configured: false, missing: gaps };

  return {
    configured: true,
    url: url!,
    serviceRoleKey: serviceRoleKey!,
    restUrl: `${url}/rest/v1`,
    storageUrl: `${url}/storage/v1`,
  };
}

// ---------------------------------------------------------------------------
// Storage — where the bundle objects live inside the bucket
// ---------------------------------------------------------------------------

export type StorageConfig =
  | {
      configured: true;
      bucket: string;
      pdfPath: string;
      zipPath: string;
      signedUrlTtlSeconds: number;
    }
  | { configured: false; missing: string[] };

/** Signed links are for immediate use, not for pasting into a chat. */
const DEFAULT_SIGNED_URL_TTL = 300;

/**
 * Storage for one playbook. The bucket is shared. Each playbook has its own
 * PDF and ZIP, and a missing path fails that playbook closed rather than
 * serving another playbook's file.
 */
export function storageConfig(slug: PlaybookSlug): StorageConfig {
  // No default bucket name. A wrong guess here either 404s in production or,
  // worse, resolves to some other bucket that happens to exist.
  const bucket = read("PLAYBOOK_STORAGE_BUCKET");
  const pdfPath = read(playbookPdfEnv[slug]);
  const zipPath = read(playbookZipEnv[slug]);

  const gaps = missing({
    PLAYBOOK_STORAGE_BUCKET: bucket,
    [playbookPdfEnv[slug]]: pdfPath,
    [playbookZipEnv[slug]]: zipPath,
  });
  if (gaps.length > 0) return { configured: false, missing: gaps };

  const ttl = Number(read("PLAYBOOK_SIGNED_URL_TTL") ?? DEFAULT_SIGNED_URL_TTL);

  return {
    configured: true,
    bucket: bucket!,
    pdfPath: pdfPath!,
    zipPath: zipPath!,
    signedUrlTtlSeconds:
      Number.isFinite(ttl) && ttl > 0 && ttl <= 3600 ? ttl : DEFAULT_SIGNED_URL_TTL,
  };
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

export type EmailConfig =
  | { configured: true; apiKey: string; from: string; replyTo: string | undefined }
  | { configured: false; missing: string[] };

export function emailConfig(): EmailConfig {
  const apiKey = read("RESEND_API_KEY");
  const from = read("PLAYBOOK_FROM_EMAIL");

  const gaps = missing({ RESEND_API_KEY: apiKey, PLAYBOOK_FROM_EMAIL: from });
  if (gaps.length > 0) return { configured: false, missing: gaps };

  return {
    configured: true,
    apiKey: apiKey!,
    from: from!,
    replyTo: read("PLAYBOOK_REPLY_TO_EMAIL"),
  };
}

// ---------------------------------------------------------------------------
// Site URL — needed server-side to build the download link in the email
// ---------------------------------------------------------------------------

/**
 * Vercel injects VERCEL_URL per deployment, which is right for previews and
 * wrong for production, where the canonical domain is what a buyer should see
 * in their inbox. NEXT_PUBLIC_SITE_URL wins when set.
 */
export function siteUrl(): string {
  const configured = read("NEXT_PUBLIC_SITE_URL");
  if (configured) return configured.replace(/\/+$/, "");
  const vercel = read("VERCEL_URL");
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

// ---------------------------------------------------------------------------
// One answer for "can we actually sell this right now"
// ---------------------------------------------------------------------------

export type CommerceReadiness = {
  checkout: boolean;
  fulfillment: boolean;
  download: boolean;
  email: boolean;
  environment: PaddleEnvironment;
  missing: string[];
};

export function commerceReadiness(): CommerceReadiness {
  const paddle = paddleConfig();
  const supabase = supabaseConfig();
  const storage = playbookSlugs.map((slug) => storageConfig(slug));
  const email = emailConfig();
  const anyPrice = playbookSlugs.some((slug) => Boolean(paddle.prices[slug]));
  const anyFiles = storage.some((item) => item.configured);

  return {
    checkout: paddle.configured && anyPrice,
    fulfillment: paddle.configured && anyPrice && supabase.configured,
    download: supabase.configured && anyFiles,
    email: email.configured,
    environment: paddleEnvironment(),
    missing: [
      ...(paddle.configured ? [] : paddle.missing),
      ...(anyPrice
        ? []
        : playbookSlugs.map((slug) => playbookPriceEnv[slug])),
      ...(supabase.configured ? [] : supabase.missing),
      ...storage.flatMap((item) => (item.configured ? [] : item.missing)),
      ...(email.configured ? [] : email.missing),
    ],
  };
}
