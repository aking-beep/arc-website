import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";

import { FinalCTA } from "@/components/playbook/final-cta";
import { PlaybookHero } from "@/components/playbook/hero";
import { Preview } from "@/components/playbook/preview";
import { Pricing } from "@/components/playbook/pricing";
import { ProductRoadmap } from "@/components/playbook/product-roadmap";
import { Toolkit } from "@/components/playbook/toolkit";
import { PlaybookViewTracker } from "@/components/playbook/view-tracker";
import { WhatsIncluded } from "@/components/playbook/whats-included";
import { FaqList } from "@/components/faq-list";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { PanelLabel } from "@/components/diagram";
import { publicCheckoutConfig } from "@/lib/commerce/checkout";
import { site } from "@/lib/content";
import { playbookAudience, playbookFaqs, playbookProduct } from "@/lib/playbook";

const canonical = `${site.domain.replace(/\/+$/, "")}/playbook`;

const description =
  "A practical system for taking an AI idea through fifteen decisions to a product people can use, with skills, reference architectures, workflow templates, and the checklists you fill in while you build. One-time purchase.";

export const metadata: Metadata = {
  title: `${playbookProduct.name} · ${playbookProduct.subtitle}`,
  description,
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: `${playbookProduct.name} · ${playbookProduct.subtitle}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${playbookProduct.name} · ${playbookProduct.subtitle}`,
    description,
  },
};

export default function PlaybookPage() {
  const checkout = publicCheckoutConfig();

  return (
    <>
      <PlaybookViewTracker />
      <ProductSchema />
      <FaqSchema />

      <PlaybookHero checkout={checkout} />
      <WhatsIncluded />
      <ProductRoadmap />
      <Toolkit />
      <Preview />

      <Section>
        <SectionHeading
          kicker="Who it is for"
          title="Written for the person making the product decisions."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <PanelLabel>This is for you if you are</PanelLabel>
            <ul className="mt-5 space-y-3">
              {playbookAudience.forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-muted/40 p-6 sm:p-8">
            <PanelLabel>Skip it if</PanelLabel>
            <ul className="mt-5 space-y-3">
              {playbookAudience.notForYou.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <Minus className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Pricing checkout={checkout} />

      <Section>
        <SectionHeading kicker="Questions" title="What people ask before buying." />
        <div className="mt-12 max-w-3xl">
          <FaqList items={[...playbookFaqs]} />
        </div>
      </Section>

      <FinalCTA checkout={checkout} />
    </>
  );
}

function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: playbookProduct.name,
    description,
    brand: { "@type": "Brand", name: playbookProduct.publisher },
    image: `${canonical.replace(/\/playbook$/, "")}/playbook/cover.png`,
    url: canonical,
    offers: {
      "@type": "Offer",
      price: String(playbookProduct.priceAmount),
      priceCurrency: playbookProduct.currency,
      availability: "https://schema.org/InStock",
      url: canonical,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: playbookFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
