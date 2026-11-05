import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { shippedProducts } from "@/lib/arc/shipped";
import { labProducts } from "@/lib/arc/products";
import { maturityLabel } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/products" },
  title: "Products you can buy today",
  description:
    "Fit Teams gives a defensible verdict on one workload from $149, with a $199/month workspace. Fit is free for a person, $12/month for Pro. The ARC Labs scanners are free.",
};

/**
 * The shipped software, separated from the studio engagements on /pricing.
 * These have prices because they are products; the engagements are scoped per
 * client. See docs/WEDGE-AND-PRODUCTS-2026-11.md for why this page exists.
 */
export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="Products"
        title="The software you can buy without talking to us."
        lead="ARC is a studio, so most of what we do is built for one client. These are the exceptions: products that run on their own, priced, with no call in the way. The engagements are on the pricing page."
      />

      {shippedProducts.map((product) => (
        <Section key={product.slug}>
          <SectionHeading
            kicker={product.name}
            title={product.tagline}
            lead={product.summary}
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {product.plans.map((plan) => (
              <Card key={plan.name} className="flex h-full flex-col p-6 sm:p-7">
                <h3 className="text-base font-semibold tracking-tight">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-2xl font-semibold tracking-tight">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">
                    {plan.cadence === "month" ? "/ month" : "one-time"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {plan.tagline}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm leading-relaxed">
                      <Check
                        aria-hidden
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.limits ? (
                  <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    {plan.limits}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
              href={product.url}
              target="_blank"
              rel="noreferrer"
            >
              Open {product.name}
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            </a>
            {product.note ? (
              <p className="text-sm text-muted-foreground">{product.note}</p>
            ) : null}
          </div>
        </Section>
      ))}

      <Section>
        <SectionHeading
          kicker="ARC Labs"
          title="The free tools."
          lead="Every one of these is free to use and running now. They carry the label they have earned: open source where the code is yours, alpha and experiment where it is early. We build them because they are the fastest way to find out whether a thing is broken."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {labProducts.map((tool) => (
            <Card key={tool.slug} className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold tracking-tight">{tool.name}</h3>
                <span className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {maturityLabel[tool.maturity]}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {tool.tagline}
              </p>
              <a
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
                href={tool.href}
              >
                About this tool
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            </Card>
          ))}
        </div>
      </Section>

      <CTA
        title="Need something built around one of these?"
        lead="The products answer a bounded question on their own. When the answer is that something has to be built, integrated or run, that is the studio, and it starts with a scoped diagnostic."
        topic="products"
      />
    </>
  );
}
