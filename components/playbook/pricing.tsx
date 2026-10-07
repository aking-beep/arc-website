import { Check } from "lucide-react";

import { CheckoutButton } from "@/components/playbook/checkout-button";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { playbookIncludes, playbookProduct } from "@/lib/playbook";

export function Pricing({ checkout }: { checkout: CheckoutConfig }) {
  return (
    <Section id="pricing" className="bg-muted/30 scroll-mt-20">
      <SectionHeading
        kicker="Price"
        title={`${playbookProduct.price}, once.`}
        lead="No subscription, no seats, no account. Paddle handles the payment. The download link arrives by email."
      />
      <Card className="mt-12 max-w-xl p-6 ring-1 ring-brand/20 sm:p-8">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold tracking-tight">{playbookProduct.price}</span>
          <span className="text-sm text-muted-foreground">
            {playbookProduct.currency} · {playbookProduct.priceNote}
          </span>
        </div>
        <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-6">
          {playbookIncludes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
              <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <CheckoutButton config={checkout} className="mt-7" />
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Secure checkout by Paddle. The paid files stay in private storage and are
          delivered only after the payment is confirmed. 30-day refund.
        </p>
      </Card>
    </Section>
  );
}
