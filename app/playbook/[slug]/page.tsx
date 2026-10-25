import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { OfferBuy } from "@/components/playbook/offer-buy";
import { Paywall } from "@/components/playbook/paywall";
import { PlaybookViewTracker } from "@/components/playbook/view-tracker";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PanelLabel } from "@/components/diagram";
import { publicCheckoutConfig } from "@/lib/commerce/checkout";
import { site } from "@/lib/content";
import {
  getPlaybookTier,
  playbookPublisher,
  playbookTierHref,
  playbookTiers,
} from "@/lib/playbook";

export function generateStaticParams() {
  return playbookTiers.map((tier) => ({ slug: tier.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tier = getPlaybookTier(params.slug);
  if (!tier) return {};
  const canonical = `${site.domain.replace(/\/+$/, "")}${playbookTierHref(tier.slug)}`;
  const description = `${tier.productName} is ${tier.price}, one-off. ${tier.summary}`;
  return {
    title: `${tier.productName} · ${tier.price}`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${tier.productName} · ${tier.subtitle}`,
      description,
    },
  };
}

export default function PlaybookTierPage({
  params,
}: {
  params: { slug: string };
}) {
  const tier = getPlaybookTier(params.slug);
  if (!tier) notFound();

  const checkout = publicCheckoutConfig(tier.slug);
  const others = playbookTiers.filter((item) => item.slug !== tier.slug);
  const canonical = `${site.domain.replace(/\/+$/, "")}${playbookTierHref(tier.slug)}`;

  return (
    <>
      <PlaybookViewTracker source={tier.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: tier.productName,
            description: tier.summary,
            brand: { "@type": "Brand", name: playbookPublisher },
            url: canonical,
            offers: {
              "@type": "Offer",
              price: String(tier.priceAmount),
              priceCurrency: tier.currency,
              availability: "https://schema.org/InStock",
              url: canonical,
            },
          }),
        }}
      />

      <section className="border-b border-border/60">
        <Container className="py-16 sm:py-24">
          <Link
            href="/playbook"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All three playbooks
          </Link>
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {tier.part}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {tier.name}
              </h1>
              <p className="mt-4 text-xl leading-relaxed">{tier.subtitle}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {tier.summary}
              </p>
              <p className="mt-8 flex items-baseline gap-3">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                <span className="text-sm text-muted-foreground">
                  {tier.currency} · {tier.priceNote}
                </span>
              </p>
              <OfferBuy tier={tier} config={checkout} className="mt-6" />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {tier.format}. One payment, then a private download link.
              </p>
            </div>

            <Card className="p-6 sm:p-8">
              <PanelLabel>You leave with</PanelLabel>
              <p className="mt-4 text-lg font-medium leading-snug">{tier.outcome}</p>
              <p className="mt-4 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                {tier.part}. {tier.format}.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <Section>
        <Paywall product={tier.name} price={tier.price} file={`${tier.part}. ${tier.format}.`}>
          <OfferBuy tier={tier} config={checkout} />
        </Paywall>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="The other two"
          title="Sold separately."
          lead="This page is only this playbook. The other two cover different modules and different files."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {others.map((other) => (
            <Link key={other.slug} href={playbookTierHref(other.slug)} className="group block">
              <Card className="h-full p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {other.part}
                  </p>
                  <p className="text-lg font-semibold">{other.price}</p>
                </div>
                <h3 className="mt-3 flex items-center gap-1.5 text-xl font-semibold tracking-tight">
                  {other.name}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-2 text-sm font-medium">{other.subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {other.summary}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
