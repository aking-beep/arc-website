import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

import { Preview } from "@/components/playbook/preview";
import { TierCards } from "@/components/playbook/tier-cards";
import { PlaybookViewTracker } from "@/components/playbook/view-tracker";
import { FaqList } from "@/components/faq-list";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PanelLabel } from "@/components/diagram";
import { publicCheckoutConfig } from "@/lib/commerce/checkout";
import { site } from "@/lib/content";
import {
  playbookAudience,
  playbookFaqs,
  playbookLanding,
  playbookPublisher,
  playbookSlugs,
  playbookTiers,
  type PlaybookSlug,
} from "@/lib/playbook";

const canonical = `${site.domain.replace(/\/+$/, "")}/playbook`;

const description =
  "Three separate playbooks for an AI product. Define is $5, Build is $10, and Ship is $20. Each one is its own PDF and its own download.";

export const metadata: Metadata = {
  title: "Playbooks · Define $5, Build $10, Ship $20",
  description,
  alternates: { canonical },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Three playbooks. Define, Build, and Ship.",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Three playbooks. Define, Build, and Ship.",
    description,
  },
};

export default function PlaybookPage() {
  const checkouts = Object.fromEntries(
    playbookSlugs.map((slug) => [slug, publicCheckoutConfig(slug)]),
  ) as Record<PlaybookSlug, ReturnType<typeof publicCheckoutConfig>>;

  return (
    <>
      <PlaybookViewTracker source="catalog" />
      <CatalogSchema />
      <FaqSchema />

      <section className="border-b border-border/60">
        <Container className="py-16 sm:py-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {playbookLanding.kicker}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {playbookLanding.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {playbookLanding.lead}
            </p>
          </div>
        </Container>
      </section>

      <Section id="pricing" className="scroll-mt-20">
        <SectionHeading
          kicker="Prices"
          title="One checkout each. Nothing is bundled."
          lead="Paddle handles the payment. The download link for that playbook arrives by email. The charge is the price id configured for that playbook, which has to be the amount printed here."
        />
        <TierCards checkouts={checkouts} />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          All three together are $35. The free scorecard and checklists live on the{" "}
          <Link href="/playbooks" className="underline underline-offset-4">
            frameworks page
          </Link>
          .
        </p>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
          <div>
            <SectionHeading
              kicker="The split"
              title="Each playbook answers one question."
              lead="The chapters follow the order in the book. You can stop when the question you have is answered."
            />
            <ol className="mt-10 space-y-6">
              {playbookTiers.map((tier, index) => (
                <li key={tier.slug} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} · {tier.price}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {tier.name}. {tier.subtitle}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {tier.outcome}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Card className="p-6 sm:p-8">
            <PanelLabel>The rule in all three</PanelLabel>
            <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-balance">
              {playbookLanding.rule}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Use a model where interpretation, synthesis, generation, classification,
              ranking, or a conversation in ordinary language is what creates the value.
            </p>
          </Card>
        </div>
      </Section>

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
            <PanelLabel>Skip them if</PanelLabel>
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

      <Section className="bg-muted/30">
        <SectionHeading kicker="Questions" title="What people ask before buying." />
        <div className="mt-12 max-w-3xl">
          <FaqList items={[...playbookFaqs]} />
        </div>
      </Section>
    </>
  );
}

function CatalogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ARC Playbooks",
    itemListElement: playbookTiers.map((tier, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: tier.productName,
        description: tier.summary,
        brand: { "@type": "Brand", name: playbookPublisher },
        url: `${canonical}/${tier.slug}`,
        offers: {
          "@type": "Offer",
          price: String(tier.priceAmount),
          priceCurrency: tier.currency,
          availability: "https://schema.org/InStock",
          url: `${canonical}/${tier.slug}`,
        },
      },
    })),
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
