import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

import { OfferBuy } from "@/components/playbook/offer-buy";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";
import { Card } from "@/components/ui/card";
import {
  playbookTierHref,
  playbookTiers,
  type PlaybookSlug,
  type PlaybookTier,
} from "@/lib/playbook";

export function TierCards({
  checkouts,
}: {
  checkouts: Record<PlaybookSlug, CheckoutConfig>;
}) {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-3">
      {playbookTiers.map((tier) => (
        <TierCard key={tier.slug} tier={tier} checkout={checkouts[tier.slug]} />
      ))}
    </div>
  );
}

function TierCard({
  tier,
  checkout,
}: {
  tier: PlaybookTier;
  checkout: CheckoutConfig;
}) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {tier.part}
        </p>
        <p className="text-2xl font-semibold tracking-tight">{tier.price}</p>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight">{tier.name}</h3>
      <p className="mt-2 text-base font-medium">{tier.subtitle}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{tier.summary}</p>
      <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-3.5 w-3.5" aria-hidden />
        Paid file. It arrives by email after payment.
      </p>
      <OfferBuy tier={tier} config={checkout} className="mt-6" />
      <Link
        href={playbookTierHref(tier.slug)}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
      >
        Open {tier.name}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
