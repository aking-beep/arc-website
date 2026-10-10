import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

import { OfferBuy } from "@/components/playbook/offer-buy";
import { Paywall } from "@/components/playbook/paywall";
import { PlaybookViewTracker } from "@/components/playbook/view-tracker";
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
  playbookCover,
  playbookPublisher,
  type PlaybookSlug,
  type PlaybookTier,
} from "@/lib/playbook";

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
        <Container className="relative py-10 sm:py-14">
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

      <Container className="py-10 sm:py-14">
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
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-3.5 w-3.5" aria-hidden />
                Paid file. Payment emails the download.
              </p>
              <div className="mt-5">
                <OfferBuy tier={tier} config={checkouts[tier.slug]} />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tier.summary}
              </p>
              <Link
                href={offerHref(tier.slug)}
                className="mt-4 text-sm font-medium underline underline-offset-4"
              >
                Open {tier.name}
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

            {tier.slug === "define" ? (
              <figure className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-[3/4] bg-muted">
                  <Image
                    src={playbookCover.src}
                    alt={playbookCover.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 22rem, 100vw"
                    className="object-contain object-top"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  {playbookCover.caption}
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
            <Paywall product={tier.name} price={tier.price} file={`${tier.part}. ${tier.format}.`}>
              <OfferBuy tier={tier} config={config} />
            </Paywall>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
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
