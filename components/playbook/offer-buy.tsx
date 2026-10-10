import { CheckoutButton, type CheckoutConfig } from "@/components/playbook/checkout-button";
import { Button } from "@/components/ui/button";
import type { PlaybookTier } from "@/lib/playbook";

/**
 * The purchase action on an ad page.
 *
 * When Paddle is configured for this playbook, the button opens checkout.
 * When it is not, the button goes to the contact form for a payment link.
 * The price on the button is the price printed on the page either way.
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
