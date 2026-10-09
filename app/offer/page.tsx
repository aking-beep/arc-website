import type { Metadata } from "next";

import { OfferCatalog } from "@/components/playbook/offer-landing";
import { publicCheckoutConfig } from "@/lib/commerce/checkout";
import { site } from "@/lib/content";
import { offerCatalog, offerHref } from "@/lib/offer";
import { playbookSlugs, type PlaybookSlug } from "@/lib/playbook";

const canonical = `${site.domain.replace(/\/+$/, "")}${offerHref()}`;

const description =
  "Define is $5, Build is $10, and Ship is $20. Three separate playbooks. Buy the one for the decision in front of you.";

export const metadata: Metadata = {
  title: "Buy the playbook for the part of the work you are in",
  description,
  alternates: { canonical },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: canonical,
    title: offerCatalog.title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: offerCatalog.title,
    description,
  },
};

export default function OfferPage() {
  const checkouts = Object.fromEntries(
    playbookSlugs.map((slug) => [slug, publicCheckoutConfig(slug)]),
  ) as Record<PlaybookSlug, ReturnType<typeof publicCheckoutConfig>>;

  return <OfferCatalog checkouts={checkouts} />;
}
