import type { Metadata } from "next";
import { Calendar, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { PanelLabel } from "@/components/diagram";
import { site } from "@/lib/content";
import { getPlaybookTier } from "@/lib/playbook";

export const metadata: Metadata = {
  title: "Contact · Thirty minutes, no deck",
  description:
    "Book a 30-minute call with the senior person who would do the work, email us, or send a note. A person replies within one business day.",
};

/** Known entry points, so a product CTA arrives with context attached. */
const topics: Record<string, { label: string; lead: string }> = {
  "ark-control": {
    label: "Agent Control design partnership",
    lead: "Agent Control is in design-partner development. If you are running agents against production systems and cannot currently verify what they changed, that is exactly the conversation we want.",
  },
  "agent-readiness": {
    label: "Agent Readiness assessment",
    lead: "The assessment runs two to three weeks against your actual systems: the inventory, the blast-radius ranking, the approval gates and a hardening plan with named owners.",
  },
  "ai-fit-teams": {
    label: "AI Fit Teams assessment",
    lead: "A three-to-four week assessment of whether your teams, workflows, governance and habits can carry what you are planning to build.",
  },
  advisory: {
    label: "Advisory engagement",
    lead: "Most advisory work starts as a scoped review of two to seven weeks that ends in a plan with named owners.",
  },
  playbook: {
    label: "Playbook",
    lead: "Tell us which playbook you want. We email a payment link for that file. Define is $5, Build is $10, and Ship is $20.",
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { topic?: string; product?: string };
}) {
  const key = searchParams?.topic ?? "";
  const topic = topics[key];
  const playbook = key === "playbook" ? getPlaybookTier(searchParams?.product ?? "") : undefined;
  const topicLabel = playbook ? `${playbook.productName} · ${playbook.price}` : topic?.label;
  const topicLead = playbook
    ? `You asked about ${playbook.name}, ${playbook.price}, one-off. Send a note and we email a payment link for that file.`
    : topic?.lead;

  return (
    <>
      <PageHero
        kicker={topicLabel ?? "Contact"}
        title={playbook ? `A payment link for ${playbook.name}.` : "Thirty minutes. No deck."}
        lead={
          topicLead
            ? topicLead
            : "We will listen, ask the hard questions, and tell you whether ARC is the right next step — including when it is not."
        }
      />

      {playbook ? (
        <Section>
          <div className="mx-auto max-w-xl">
            <Card className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Send a note</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A person writes back within one business day with a payment link for {playbook.name}, {playbook.price}.
              </p>
              <div className="mt-6">
                <ContactForm
                  topic={topicLabel}
                  defaultMessage={`I want ${playbook.productName}, ${playbook.price}.`}
                />
              </div>
            </Card>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Or email{" "}
              <a className="underline underline-offset-4" href={`mailto:${site.email}?subject=${encodeURIComponent(topicLabel ?? playbook.productName)}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </Section>
      ) : (
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              kicker="Get in touch"
              title="Three ways, all of them to a person."
              lead="No sales team, no qualification gauntlet. The senior person who would do the work is the one on the call."
            />
            <div className="mt-8 flex flex-col gap-3">
              <Button href={site.calendly} size="lg">
                <Calendar className="h-4 w-4" />
                Book a 30-min discovery call
              </Button>
              <Button
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  topicLabel ?? "Discovery call request",
                )}`}
                variant="outline"
                size="lg"
              >
                <Mail className="h-4 w-4" />
                Email us
              </Button>
            </div>

            <div className="mt-10 grid gap-4">
              {[
                {
                  heading: "Before you book",
                  text: "You do not have to talk to anyone to get value out of ARC. The scorecard and the Labs tools are free and need no account. A playbook is a separate purchase.",
                },
                {
                  heading: "What happens on the call",
                  text: "You describe the problem. We tell you which stage of work it is, and whether a scoped review, a workshop or nothing at all is the answer.",
                },
                {
                  heading: "What does not happen",
                  text: "No marketing list, no drip sequence, no deck sent afterwards that restates what you already told us.",
                },
              ].map((item) => (
                <div key={item.heading} className="rounded-lg border border-border bg-card p-5">
                  <PanelLabel>{item.heading}</PanelLabel>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Send a note</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A person writes back within one business day.
            </p>
            {topicLabel ? (
              <p className="mt-4 rounded-md border border-brand/30 bg-brand-subtle/60 px-4 py-2.5 text-sm">
                Topic: <span className="font-medium">{topicLabel}</span>
              </p>
            ) : null}
            <div className="mt-6">
              <ContactForm topic={topicLabel} />
            </div>
          </Card>
        </div>
      </Section>
      )}
    </>
  );
}
