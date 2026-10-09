import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { OfferBuy } from "@/components/playbook/offer-buy";
import { PlaybookViewTracker } from "@/components/playbook/view-tracker";
import { PreviewLink } from "@/components/playbook/preview-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/section";
import type { CheckoutConfig } from "@/components/playbook/checkout-button";
import { site } from "@/lib/content";
import {
  offerAudience,
  offerCatalog,
  offerDelivery,
  offerFit,
  offerHref,
  offerRefund,
  offerTiers,
} from "@/lib/offer";
import {
  playbookPreviewPdf,
  playbookPublisher,
  playbookShots,
  type PlaybookSlug,
  type PlaybookTier,
} from "@/lib/playbook";

const cover = playbookShots[0];

export function OfferCatalog({
  checkouts,
}: {
  checkouts: Record<PlaybookSlug, CheckoutConfig>;
}) {
  const tiers = offerTiers();
  const base = site.domain.replace(/\/+$/, "");

  return (
    <>
      <PlaybookViewTracker source="offer" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: offerCatalog.title,
            itemListElement: tiers.map((tier, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${base}${offerHref(tier.slug)}`,
              name: `${tier.productName} · ${tier.price}`,
            })),
          }),
        }}
      />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <Container className="relative py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {offerCatalog.kicker}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {offerCatalog.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {offerCatalog.lead}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {offerAudience}
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.slug} className="flex flex-col p-6 sm:p-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {tier.name} · {tier.part}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
                {tier.subtitle}
              </h2>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{tier.price}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tier.priceNote}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tier.summary}
              </p>
              <div className="mt-6">
                <OfferBuy tier={tier} config={checkouts[tier.slug]} />
              </div>
              <Link
                href={offerHref(tier.slug)}
                className="mt-4 text-sm font-medium underline underline-offset-4"
              >
                See what is in {tier.name}
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          All three together are $35, paid as three purchases. {offerDelivery} {offerRefund}
        </p>
      </Container>
    </>
  );
}

export function OfferProduct({
  tier,
  config,
}: {
  tier: PlaybookTier;
  config: CheckoutConfig;
}) {
  const others = offerTiers().filter((item) => item.slug !== tier.slug);
  const showPreview = tier.slug === "define";
  const url = `${site.domain.replace(/\/+$/, "")}${offerHref(tier.slug)}`;

  return (
    <>
      <PlaybookViewTracker source={`offer-${tier.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: tier.productName,
            description: tier.summary,
            brand: { "@type": "Brand", name: playbookPublisher },
            url,
            offers: {
              "@type": "Offer",
              price: String(tier.priceAmount),
              priceCurrency: tier.currency,
              availability: "https://schema.org/InStock",
              url,
            },
          }),
        }}
      />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <Container className="relative py-12 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {tier.name} · {tier.price} · {tier.part}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {tier.subtitle}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {offerFit[tier.slug]}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed">
                {tier.summary}
              </p>
              <div className="mt-8">
                <OfferBuy tier={tier} config={config} />
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {tier.format}. {tier.priceNote}.
              </p>
            </div>

            {showPreview ? (
              <figure className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-[3/4] bg-muted">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 22rem, 100vw"
                    className="object-contain object-top"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  <PreviewLink href={playbookPreviewPdf} className="underline underline-offset-4">
                    Read the first six pages
                  </PreviewLink>
                  <span className="mt-1 block">
                    The opening of Define, through the first page of Module 01.
                  </span>
                </figcaption>
              </figure>
            ) : (
              <Card className="p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  You leave with
                </p>
                <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-balance">
                  {tier.outcome}
                </p>
              </Card>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What is in the file</h2>
            <ul className="mt-6 space-y-3">
              {tier.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {offerDelivery} {offerRefund}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              The other two
            </h2>
            <ul className="mt-4 space-y-4">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={offerHref(item.slug)} className="group block">
                    <span className="block text-sm text-muted-foreground">
                      {item.name} · {item.price}
                    </span>
                    <span className="mt-1 block font-medium group-hover:underline">
                      {item.subtitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {offerAudience} Each playbook stands on its own.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
