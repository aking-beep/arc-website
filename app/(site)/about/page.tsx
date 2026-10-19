import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PanelLabel } from "@/components/diagram";
import { FaqList } from "@/components/faq-list";
import { CTA } from "@/components/cta";
import { ark } from "@/lib/ark";
import { digitalTransformation, faqs, site } from "@/lib/content";
import { playbookTiers } from "@/lib/playbook";

export const metadata: Metadata = {
  title: "About · Who does the work",
  description:
    "ARC Transformation Group is a senior-led technology practice. Twenty years of Fortune 100 and 500 delivery, and the person on your first call stays on the work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="The person on your first call stays on the work."
        lead="ARC is a senior-led technology practice. Twenty years of Fortune 100 and Fortune 500 programme delivery, applied to companies that cannot afford a consulting army or a year of discovery."
      />

      {/*
        Who does the work, and what they have done, comes before anything about
        how ARC is organised. It is the only part a buyer cannot get elsewhere.
      */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="Who we are"
              title={site.team.title}
              lead={site.team.lead}
            />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="text-base leading-relaxed text-muted-foreground">
                {site.team.bio}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {site.team.scope.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-background/60 px-4 py-3"
                  >
                    <div className="text-lg font-semibold tracking-tight">
                      {item.metric}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/work" size="sm">
                  See the work
                </Button>
                <Button href="/contact" variant="outline" size="sm">
                  Get in touch
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {site.team.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-lg border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="How we think about it"
          title="A migration that ignores the people running it is not a migration."
          lead="Most technology work fails somewhere other than the technology. These are the parts we expect to move together, because a change to one of them usually breaks another."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {digitalTransformation.map((item) => (
            <div key={item.name} className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker="One company"
          title="The work, the playbooks, and the tools carry the same name."
          lead="ARC Transformation Group is who you contract with. The pages for agents, and the three playbooks, are published by that same practice."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Card className="p-6 sm:p-8">
            <PanelLabel>Services</PanelLabel>
            <p className="mt-4 text-xl font-semibold tracking-tight text-balance">
              {site.question}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Modernize, automate, build, and operate. Architecture, data, cloud,
              security, software, and AI, reviewed and delivered by the person on
              the first call.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
            >
              What we help with
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
          <Card className="p-6 sm:p-8">
            <PanelLabel>Playbooks</PanelLabel>
            <p className="mt-4 text-xl font-semibold tracking-tight text-balance">
              {playbookTiers.map((tier) => `${tier.name} ${tier.price}`).join(" · ")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Three separate PDFs for the product work. Define asks whether it
              should exist. Build asks how the system should be made. Ship asks
              whether it is ready, and includes the files you build with.
            </p>
            <Link
              href="/playbook"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
            >
              See the playbooks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
          <Card className="p-6 sm:p-8">
            <PanelLabel>Agent infrastructure</PanelLabel>
            <p className="mt-4 text-xl font-semibold tracking-tight text-balance">
              {ark.question}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              the Agent Access Assessment, the Agent Control research, and the free
              Labs tools. {ark.principle}
            </p>
            <Link
              href="/agents"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
            >
              Agent infrastructure
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="FAQ"
          title="The questions that come up on almost every call."
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <CTA
        title="Thirty minutes. No deck."
        lead="We will listen, ask the hard questions, and tell you whether ARC is the right next step — including when it is not."
      />
    </>
  );
}
