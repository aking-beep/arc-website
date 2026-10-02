import "server-only";

import { paddleConfig } from "@/lib/commerce/config";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";

/**
 * The only commerce values a server component may hand to the browser.
 *
 * Paddle publishes the client token and the price id as public values — the
 * checkout overlay cannot work without them. Everything else in paddleConfig()
 * is a secret, so this function exists to make the boundary one explicit
 * mapping rather than a judgement call at each call site.
 */
export function publicCheckoutConfig(): CheckoutConfig {
  const paddle = paddleConfig();

  if (!paddle.configured) {
    return {
      configured: false,
      clientToken: null,
      priceId: null,
      environment: paddle.environment,
    };
  }

  return {
    configured: true,
    clientToken: paddle.clientToken,
    priceId: paddle.priceId,
    environment: paddle.environment,
  };
}
