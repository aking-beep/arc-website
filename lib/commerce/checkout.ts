import "server-only";

import { paddleConfig, readPlaybookBuyUrl } from "@/lib/commerce/config";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";
import type { PlaybookSlug } from "@/lib/playbook";

/**
 * The only commerce values a server component may hand to the browser.
 *
 * Paddle publishes the client token and the price id as public values — the
 * checkout overlay cannot work without them. Everything else in paddleConfig()
 * is a secret, so this function exists to make the boundary one explicit
 * mapping rather than a judgement call at each call site.
 *
 * One call per playbook. A missing price id leaves that playbook unconfigured
 * even when the other two can be bought.
 *
 * `buyUrl` is the hosted-storefront fallback. It is a public product URL, so
 * it crosses this boundary safely. Paddle is preferred when both are set,
 * because the overlay keeps the buyer on the site.
 */
export function publicCheckoutConfig(slug: PlaybookSlug): CheckoutConfig {
  const paddle = paddleConfig();
  const priceId = paddle.prices[slug] ?? null;
  const buyUrl = readPlaybookBuyUrl(slug) ?? null;

  if (!paddle.configured || !priceId) {
    return {
      configured: false,
      clientToken: null,
      priceId: null,
      buyUrl,
      environment: paddle.environment,
    };
  }

  return {
    configured: true,
    clientToken: paddle.clientToken,
    priceId,
    buyUrl,
    environment: paddle.environment,
  };
}
