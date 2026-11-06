import "server-only";

import { paddleConfig } from "@/lib/commerce/config";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";
import { playbookGumroadEnv, type PlaybookSlug } from "@/lib/playbook";

/**
 * A Gumroad product link, or null. Only https links on Gumroad's own hosts
 * pass, so a typo in the environment cannot send a buyer somewhere else.
 */
export function gumroadProductUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  const gumroad = host === "gumroad.com" || host.endsWith(".gumroad.com") || host === "gum.co";
  if (url.protocol !== "https:" || !gumroad) return null;
  // Skip the product page and open the payment step directly.
  url.searchParams.set("wanted", "true");
  return url.toString();
}

/**
 * The only commerce values a server component may hand to the browser.
 *
 * A Gumroad product link is a public URL. Paddle publishes the client token and the price id as public values — the
 * checkout overlay cannot work without them. Everything else in paddleConfig()
 * is a secret, so this function exists to make the boundary one explicit
 * mapping rather than a judgement call at each call site.
 *
 * One call per playbook. A Gumroad link wins over Paddle. Without either,
 * that playbook is unconfigured even when the other two can be bought.
 */
export function publicCheckoutConfig(slug: PlaybookSlug): CheckoutConfig {
  const paddle = paddleConfig();
  const gumroadUrl = gumroadProductUrl(process.env[playbookGumroadEnv[slug]]);

  if (gumroadUrl) {
    return {
      configured: true,
      gumroadUrl,
      clientToken: null,
      priceId: null,
      environment: paddle.environment,
    };
  }

  const priceId = paddle.prices[slug] ?? null;

  if (!paddle.configured || !priceId) {
    return {
      configured: false,
      gumroadUrl: null,
      clientToken: null,
      priceId: null,
      environment: paddle.environment,
    };
  }

  return {
    configured: true,
    gumroadUrl: null,
    clientToken: paddle.clientToken,
    priceId,
    environment: paddle.environment,
  };
}
