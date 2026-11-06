"use client";

import * as React from "react";
import Script from "next/script";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

import { Button, buttonClassName, type ButtonProps } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { PlaybookSlug } from "@/lib/playbook";

/**
 * Opens checkout: Gumroad when the playbook has a Gumroad link, otherwise
 * Paddle's hosted checkout overlay.
 *
 * Gumroad is a plain link to the product's payment step. Gumroad's script
 * turns it into an overlay on this page; if the script is blocked, the link
 * still works and the buyer pays on gumroad.com.
 *
 * What reaches the browser is only the client token and the price id, both of
 * which Paddle publishes as public values. The API key, the webhook secret and
 * everything else stay server-side — see lib/commerce/config.ts.
 *
 * Paddle.js is loaded on first interaction rather than on mount. It is a
 * third-party script on a page most visitors will read and leave, and the
 * handful of milliseconds it costs the buyer is a better trade than the
 * script tax on everyone else.
 */
export type CheckoutConfig = {
  configured: boolean;
  /** Gumroad product link. When set, Paddle is not used for this playbook. */
  gumroadUrl: string | null;
  clientToken: string | null;
  priceId: string | null;
  environment: "sandbox" | "production";
};

type State = "idle" | "loading" | "opening" | "error";

const label: Record<State, (idle: string) => string> = {
  idle: (idle) => idle,
  loading: () => "Opening checkout…",
  opening: () => "Opening checkout…",
  error: () => "Checkout could not open",
};

export function CheckoutButton({
  config,
  product,
  priceAmount,
  children,
  size = "lg",
  variant = "primary",
  className,
}: {
  config: CheckoutConfig;
  product: PlaybookSlug;
  priceAmount: number;
  children?: React.ReactNode;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const [state, setState] = React.useState<State>("idle");
  const paddleRef = React.useRef<Paddle | null>(null);
  const completedRef = React.useRef(false);

  const idleLabel = typeof children === "string" ? children : `Get ${product}`;

  if (config.gumroadUrl) {
    return (
      <GumroadLink
        url={config.gumroadUrl}
        product={product}
        priceAmount={priceAmount}
        label={idleLabel}
        size={size}
        variant={variant}
        className={className}
      />
    );
  }

  if (!config.configured || !config.clientToken || !config.priceId) {
    return (
      <div className={className}>
        <Button size={size} variant="outline" disabled>
          Checkout is not configured yet
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          <a className="underline underline-offset-4" href="/contact?topic=playbook">
            Contact us
          </a>{" "}
          and we will send a payment link.
        </p>
      </div>
    );
  }

  async function open() {
    if (state === "loading" || state === "opening") return;

    try {
      setState("loading");
      trackEvent("playbook_checkout_start", {
        product,
        price: priceAmount,
        environment: config.environment,
      });

      if (!paddleRef.current) {
        const paddle = await initializePaddle({
          token: config.clientToken!,
          environment: config.environment,
          eventCallback: (event) => {
            // A client event is a UI signal, never proof of payment. The
            // webhook is what grants the entitlement.
            if (event.name === "checkout.completed") {
              completedRef.current = true;
              trackEvent("playbook_purchase_complete", {
                product,
                price: priceAmount,
                transaction_id: event.data?.transaction_id,
              });
              return;
            }
            if (event.name === "checkout.closed" && !completedRef.current) {
              trackEvent("playbook_checkout_abandon", { product });
              return;
            }
            if (
              event.name === "checkout.error" ||
              event.name === "checkout.failed" ||
              event.name === "checkout.payment.failed" ||
              event.name === "checkout.payment.error"
            ) {
              trackEvent("playbook_checkout_error", { product });
            }
          },
        });
        if (!paddle) throw new Error("Paddle failed to initialize");
        paddleRef.current = paddle;
      }

      setState("opening");
      paddleRef.current.Checkout.open({
        items: [{ priceId: config.priceId!, quantity: 1 }],
        settings: {
          successUrl: `${window.location.origin}/playbook/success`,
          displayMode: "overlay",
          theme: "light",
        },
      });

      // The overlay is Paddle's from here. Put the button back so a buyer who
      // closes it can reopen without reloading the page.
      setState("idle");
    } catch (error) {
      console.error("[playbook] checkout failed to open", error);
      setState("error");
    }
  }

  return (
    <div className={className}>
      <Button
        size={size}
        variant={variant}
        onClick={open}
        disabled={state === "loading" || state === "opening"}
      >
        {label[state](idleLabel)}
      </Button>
      {state === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground" role="alert">
          Checkout could not open.{" "}
          <a className="underline underline-offset-4" href="/contact?topic=playbook">
            Contact us
          </a>{" "}
          and we will send a payment link.
        </p>
      ) : null}
    </div>
  );
}

function GumroadLink({
  url,
  product,
  priceAmount,
  label,
  size,
  variant,
  className,
}: {
  url: string;
  product: PlaybookSlug;
  priceAmount: number;
  label: string;
  size: ButtonProps["size"];
  variant: ButtonProps["variant"];
  className?: string;
}) {
  return (
    <div className={className}>
      <Script src="https://gumroad.com/js/gumroad.js" strategy="lazyOnload" />
      <a
        href={url}
        className={buttonClassName(variant, size)}
        onClick={() =>
          trackEvent("playbook_checkout_start", {
            product,
            price: priceAmount,
            environment: "gumroad",
          })
        }
      >
        {label}
      </a>
    </div>
  );
}
