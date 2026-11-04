import type { Metadata } from "next";
import { Check } from "lucide-react";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { commitments, offerLadder, pricingApproved } from "@/lib/arc/offers";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "What it costs",
  description:
    "Fixed-price AI builds for companies of 1 to 200 people. A $2,500 diagnostic that credits toward the build, automations from $6,500, and monthly proof that what we built still works.",
};

/**
 * The page the research said was missing. Every competing studio publishes a
 * price and a timeline in days; ARC published neither, which loses the
 * comparison before the sizing argument can be made. See
 * docs/STUDIO-POSITIONING-2026-11.md.
 */
export default function PricingPage() {
  return (
    <>
      <PageHero
        kicker="What it costs"
        title="Published prices, and a written scope before anything starts."
        lead="ARC is an AI studio for companies of 1 to 200 people. Every engagement below has a price, a delivery window, and a point you can stop at. Most start with the diagnostic, because it is the cheapest way to find out whether the rest is worth funding."
      />

      {!pricingApproved ? (
        <Section className="pt-0">
          <Card className="border-dashed p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Indicative
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The figures on this page are indicative while we finish costing
              the ladder. Your scope is written and priced before any work
              begins, and that written price is the one that holds.
            </p>
          </Card>
        </Section>
      ) : null}

      <Section>
        <SectionHeading
          kicker="The ladder"
          title="Six ways in, including the one where you do not hire us."
          lead="Each rung ends somewhere you can stop. Nothing here needs the next thing bought to be worth having."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {offerLadder.map((offer) => (
            <Card key={offer.slug} className="flex h-full flex-col p-6 sm:p-7">
              <h3 className="text-lg font-semibold leading-snug tracking-tight">
                {offer.situation}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {offer.name}
              </p>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-2xl font-semibold tracking-tight">
                  {offer.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {offer.timeline}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {offer.summary}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                    <Check
                      aria-hidden
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                {offer.stopPoint}
              </p>

              {offer.answers ? (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Why this rung exists: {offer.answers}
                </p>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="After it ships"
          title="Most studios hand over a working automation and a hosting plan."
          lead="Four weeks later the model drifts, or a webhook returns success for work it never did, and nobody notices until a customer calls. Webhook deliveries fail about 5.8% of the time at peak, and 3.8% of those failures report success anyway. On five hundred events a day that is roughly nineteen lost every day."
        />
        <Card className="mt-10 p-6 sm:p-8">
          <p className="text-base leading-relaxed">
            Outcome Assurance reconciles what your automations reported against
            what changed in the systems they touched. When the two disagree you
            hear it from us, with the evidence, before a customer finds it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This is the part of the work the rest of the market leaves to you.
            Of fifty failed agency engagements audited in 2026, sixty per cent
            had no accuracy tracking and no monitoring for drift. The automation
            might have been working, or it might have been producing nonsense
            for a month.
          </p>
        </Card>
      </Section>

      <Section>
        <SectionHeading
          kicker="Terms"
          title="What holds on every engagement."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {commitments.map((commitment) => (
            <Card key={commitment.heading} className="p-6 sm:p-7">
              <h3 className="text-base font-semibold tracking-tight">
                {commitment.heading}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {commitment.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CTA
        title="Start with the diagnostic."
        lead="Five days, a ranked list with the hours behind each item, and the fee comes off the first build. If the answer is that you do not need us, that is the answer you get."
        topic="diagnostic"
      />
    </>
  );
}
