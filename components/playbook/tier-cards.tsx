import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { CheckoutButton, type CheckoutConfig } from "@/components/playbook/checkout-button";
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
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tier.summary}</p>
      <ul className="mt-5 flex-1 space-y-2 border-t border-border/60 pt-5">
        {tier.includes.slice(0, 4).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <CheckoutButton
        config={checkout}
        product={tier.slug}
        priceAmount={tier.priceAmount}
        className="mt-6"
      >
        {`Get ${tier.name} — ${tier.price}`}
      </CheckoutButton>
      <Link
        href={playbookTierHref(tier.slug)}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
      >
        See what is inside
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
