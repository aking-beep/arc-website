import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferProduct } from "@/components/playbook/offer-landing";
import { publicCheckoutConfig } from "@/lib/commerce/checkout";
import { site } from "@/lib/content";
import { offerFit, offerHref, offerTier, offerTiers } from "@/lib/offer";
import { playbookShots } from "@/lib/playbook";

export function generateStaticParams() {
  return offerTiers().map((tier) => ({ slug: tier.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tier = offerTier(params.slug);
  if (!tier) return {};
  const canonical = `${site.domain.replace(/\/+$/, "")}${offerHref(tier.slug)}`;
  const description = `${tier.productName}, ${tier.price}, one-off. ${offerFit[tier.slug]}`;
  const title = `${tier.subtitle} · ${tier.name}, ${tier.price}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      ...(tier.slug === "define"
        ? { images: [{ url: playbookShots[0].src, alt: playbookShots[0].alt }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function OfferProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const tier = offerTier(params.slug);
  if (!tier) notFound();

  return <OfferProduct tier={tier} config={publicCheckoutConfig(tier.slug)} />;
}
