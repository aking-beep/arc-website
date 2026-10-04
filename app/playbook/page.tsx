import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";

import { CheckoutButton } from "@/components/playbook/checkout-button";
import { PlaybookViewTracker } from "@/components/playbook/view-tracker";
import { FlowChain, Panel, PanelLabel, Takeaway } from "@/components/diagram";
import { FaqList } from "@/components/faq-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { publicCheckoutConfig } from "@/lib/commerce/checkout";
import { site } from "@/lib/content";
import {
  playbookAudience,
  playbookBundle,
  playbookClosing,
  playbookFaqs,
  playbookHero,
  playbookIncludes,
  playbookModules,
  playbookPreview,
  playbookProblem,
  playbookProduct,
  playbookSystem,
  playbookSystemChain,
} from "@/lib/playbook";

const canonical = `${site.domain.replace(/\/+$/, "")}/playbook`;

const description =
  "A $39 playbook for turning an AI idea into a product people can use. Eight modules across validation, definition, architecture, evaluation, production readiness and launch — plus 20 agent skills, 20 reference architectures and 16 workflow templates as editable assets.";

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

      {/* 1 · Hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bloom opacity-70" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div className="animate-fade-up">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {playbookHero.kicker}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                You built it with AI.
                <br />
                Now make it real.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {playbookHero.lead}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
                <CheckoutButton config={checkout}>
                  {`${playbookHero.ctaLabel} — ${playbookProduct.price}`}
                </CheckoutButton>
                <Button href="#inside" variant="outline" size="lg">
                  {playbookHero.secondaryCtaLabel}
                </Button>
              </div>

              <div className="mt-10 border-t border-border/60 pt-6">
                <PanelLabel>The system</PanelLabel>
                <FlowChain steps={playbookSystemChain} className="mt-4" highlightLast />
              </div>
            </div>

            <PriceCard checkout={checkout} />
          </div>
        </Container>
      </section>

      {/* 2 · The problem ------------------------------------------------ */}
      <Section>
        <SectionHeading
          kicker={playbookProblem.kicker}
          title={playbookProblem.title}
          lead={playbookProblem.lead}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-4 text-base leading-relaxed">
            {playbookProblem.openers.map((line, index) => (
              <p
                key={line}
                className={index === 1 ? "font-medium" : "text-muted-foreground"}
              >
                {line}
              </p>
            ))}
            <Takeaway className="!mt-8">{playbookProblem.takeaway}</Takeaway>
          </div>

          <Panel>
            <PanelLabel>Still unanswered</PanelLabel>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {playbookProblem.questions.map((question) => (
                <li
                  key={question}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-muted-foreground/50" />
                  {question}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </Section>

      {/* 3 · What you get ----------------------------------------------- */}
      <Section id="inside" className="bg-muted/30 scroll-mt-20">
        <SectionHeading
          kicker="In the bundle"
          title="A method, and the assets to run it."
          lead="One download. The Playbook itself, the worksheets you fill in while you build, and three libraries printed in full and attached to the module where you would reach for them."
        />

        <div className="mt-12 overflow-hidden rounded-xl bg-card shadow-xs ring-1 ring-border/70 dark:ring-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">Size</th>
                <th className="px-5 py-3 font-medium">Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {playbookBundle.map((item) => (
                <tr key={item.id} className="align-top">
                  <td className="px-5 py-4">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <p className="mt-1.5 max-w-prose leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-4 font-mono text-xs text-muted-foreground sm:table-cell">
                    {item.count ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">
                    {item.format}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Takeaway className="mt-10 max-w-3xl">
          The three libraries are printed in full, not summarised, and every entry is
          filed under the module that sends you to it. So you are not browsing a
          catalog of fifty-six things hoping one applies &mdash; you reach module 04,
          and the architectures that answer module 04 are the ones in front of you.
        </Takeaway>
      </Section>

      {/* 4 · The five-step system --------------------------------------- */}
      <Section>
        <SectionHeading
          kicker="The system"
          title="Five steps, in the order that makes each one cheaper."
          lead="Every step is cheaper than the one after it. That is the whole argument for doing them in this order."
        />

        <ol className="mt-12 grid gap-5 lg:grid-cols-5">
          {playbookSystem.map((step) => (
            <li key={step.step}>
              <Card className="flex h-full flex-col p-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {step.name}
                </h3>
                <p className="mt-2 text-sm font-medium leading-snug">{step.question}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
                <p className="mt-5 border-t border-border/60 pt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {step.modules.join(" · ")}
                </p>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-12 overflow-hidden rounded-xl bg-card shadow-xs ring-1 ring-border/70 dark:ring-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="w-16 px-5 py-3 font-medium">#</th>
                <th className="px-5 py-3 font-medium">Module</th>
                <th className="hidden px-5 py-3 font-medium md:table-cell">
                  What it decides
                </th>
                <th className="px-5 py-3 font-medium">Step</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {playbookModules.map((module) => (
                <tr key={module.number} className="align-top">
                  <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">
                    {module.number}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-medium">
                    {module.name}
                  </td>
                  <td className="hidden max-w-prose px-5 py-3.5 leading-relaxed text-muted-foreground md:table-cell">
                    {module.text}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-muted-foreground">
                    {module.step}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 5 · Preview ----------------------------------------------------- */}
      <Section className="bg-muted/30">
        <SectionHeading
          kicker="From inside"
          title="Four pages, before you pay for the rest."
          lead="If these are not useful on their own, the rest of the book will not save it."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {playbookPreview.map((card) => (
            <Card key={card.title} className="flex h-full flex-col p-6">
              <PanelLabel>{card.label}</PanelLabel>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-balance">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6 · Who it is for ----------------------------------------------- */}
      <Section>
        <SectionHeading
          kicker="Fit"
          title={`Worth ${playbookProduct.price} to you, or not.`}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <PanelLabel>This is for you if you are</PanelLabel>
            <ul className="mt-5 space-y-3">
              {playbookAudience.forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-brand" />
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
                  <Minus className="mt-0.5 h-4 w-4 flex-none" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* 7 · Pricing ------------------------------------------------------ */}
      <Section id="pricing" className="bg-muted/30 scroll-mt-20">
        <SectionHeading
          kicker="Price"
          title={`${playbookProduct.price}, once.`}
          lead="No subscription, no seats, no upsell sequence."
        />
        <div className="mt-12 max-w-xl">
          <PriceCard checkout={checkout} />
        </div>
      </Section>

      {/* 8 · FAQ ---------------------------------------------------------- */}
      <Section>
        <SectionHeading kicker="Questions" title="What people ask before buying." />
        <div className="mt-12 max-w-3xl">
          <FaqList items={[...playbookFaqs]} />
        </div>
      </Section>

      {/* 9 · Final CTA ---------------------------------------------------- */}
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
    </>
  );
}

function PriceCard({ checkout }: { checkout: ReturnType<typeof publicCheckoutConfig> }) {
  return (
    <Card className="p-6 shadow-sm ring-1 ring-brand/20 sm:p-8">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight">
          {playbookProduct.price}
        </span>
        <span className="text-sm text-muted-foreground">
          {playbookProduct.currency} · {playbookProduct.priceNote}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {playbookProduct.format}. One payment, a private download link, nothing to log
        into.
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-6">
        {playbookIncludes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
            <Check className="mt-0.5 h-4 w-4 flex-none text-brand" />
            {item}
          </li>
        ))}
      </ul>

      <CheckoutButton config={checkout} className="mt-7" />

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Secure checkout by Paddle. Instant download link by email. 30-day refund, no
        argument.
      </p>
    </Card>
  );
}

/**
 * Product structured data. Price and currency come from lib/playbook.ts, the
 * same values the page renders, so the markup cannot drift from the visible
 * price — which is both a Google requirement and the arrangement we offer.
 */
function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: playbookProduct.name,
    description,
    brand: { "@type": "Brand", name: playbookProduct.publisher },
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

/** Mirrors the FAQ section exactly; both read playbookFaqs. */
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
