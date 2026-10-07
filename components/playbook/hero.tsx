import Image from "next/image";

import { CheckoutButton } from "@/components/playbook/checkout-button";
import { PreviewLink } from "@/components/playbook/preview-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";
import { playbookHero, playbookProduct } from "@/lib/playbook";

export function PlaybookHero({ checkout }: { checkout: CheckoutConfig }) {
  return (
    <section className="border-b border-border/60">
      <Container className="py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-fade-up">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {playbookHero.kicker}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {playbookHero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {playbookHero.lead}
            </p>

            <p className="mt-8 flex items-baseline gap-3">
              <span className="text-4xl font-semibold tracking-tight">
                {playbookProduct.price}
              </span>
              <span className="text-sm text-muted-foreground">
                {playbookHero.priceLabel} · {playbookProduct.currency} ·{" "}
                {playbookProduct.priceNote}
              </span>
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
              <CheckoutButton config={checkout}>
                {playbookHero.ctaLabel}
              </CheckoutButton>
              <Button href="#preview" variant="outline" size="lg">
                {playbookHero.secondaryCtaLabel}
              </Button>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {playbookHero.microcopy}{" "}
              <PreviewLink href="/playbook/preview.pdf" className="underline underline-offset-4">
                Or read the free preview.
              </PreviewLink>
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/playbook/cover.png"
                  alt="Cover of the ARC AI Product Playbook"
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 80vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
