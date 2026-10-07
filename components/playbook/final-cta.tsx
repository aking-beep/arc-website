import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CheckoutButton } from "@/components/playbook/checkout-button";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";
import { Section } from "@/components/ui/section";
import { playbookClosing, playbookHero, playbookProduct } from "@/lib/playbook";

export function FinalCTA({ checkout }: { checkout: CheckoutConfig }) {
  return (
    <Section className="bg-muted/30">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {playbookClosing.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {playbookClosing.lead}
        </p>
        <div className="mt-8 flex justify-center">
          <CheckoutButton config={checkout}>
            {`${playbookHero.ctaLabel} — ${playbookProduct.price}`}
          </CheckoutButton>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Rather have us run it on your product?{" "}
          <Link
            href="/advisory"
            className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-4"
          >
            Talk to ARC Advisory
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>
    </Section>
  );
}
