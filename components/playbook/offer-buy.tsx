import { CheckoutButton, type CheckoutConfig } from "@/components/playbook/checkout-button";
import { Button } from "@/components/ui/button";
import type { PlaybookTier } from "@/lib/playbook";

/**
 * The purchase action on an ad page.
 *
 * Three states, in order of preference:
 *
 *   Paddle configured      the button opens the checkout overlay in place.
 *   A storefront URL set   the button goes to that storefront, which takes
 *                          payment, hosts the file and sends the receipt.
 *   Neither                the button goes to the contact form.
 *
 * The price on the button is the price printed on the page in all three.
 *
 * This component — not CheckoutButton — is what the paywall and the ad pages
 * render, and it short-circuits before CheckoutButton when Paddle is
 * unconfigured. So the storefront case has to be handled here as well, or it
 * is unreachable on every page that actually sells something.
 */
export function OfferBuy({
  tier,
  config,
  className,
  note = true,
}: {
  tier: PlaybookTier;
  config: CheckoutConfig;
  className?: string;
  note?: boolean;
}) {
  const label = `Get ${tier.name} — ${tier.price}`;

  if (!config.configured || !config.clientToken || !config.priceId) {
    if (config.buyUrl) {
      return (
        <div className={className}>
          <Button href={config.buyUrl} size="lg">
            {label}
          </Button>
          {note ? (
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Secure checkout, then the download straight away. {tier.price}, once.
            </p>
          ) : null}
        </div>
      );
    }

    return (
      <div className={className}>
        <Button href={`/contact?topic=playbook&product=${tier.slug}`} size="lg">
          {label}
        </Button>
        {note ? (
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            We email a payment link. The price is {tier.price}, once.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <CheckoutButton
      config={config}
      product={tier.slug}
      priceAmount={tier.priceAmount}
      size="lg"
      className={className}
    >
      {label}
    </CheckoutButton>
  );
}
