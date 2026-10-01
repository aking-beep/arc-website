import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { StatusBadge } from "@/components/ui/badge";
import { PanelLabel, Takeaway } from "@/components/diagram";
import { FaqList } from "@/components/faq-list";
import { CTA } from "@/components/cta";
import { ark } from "@/lib/ark";
import { digitalTransformation, faqs, pillars, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company · Who ARC is and how ARK fits",
  description:
    "ARC Transformation Group is a senior-led technology practice. ARK is the product and research ecosystem it builds. Twenty years of Fortune 100 and 500 delivery behind both.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Company"
        title="A senior-led practice, and the technology it builds."
        lead="ARC Transformation Group helps people and organizations understand, adopt, build and operate the technologies modern systems run on. ARK is the product and research ecosystem we are building for the layer where software starts acting on its own."
      />

      <Section>
        <SectionHeading
          kicker="Brand architecture"
          title="ARC is the company. ARK is what ARC builds."
          lead="Two names, because they answer two different questions and conflating them makes both harder to trust."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <PanelLabel>ARC Transformation Group</PanelLabel>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-balance">
              {site.question}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The company, the commercial relationship, and the transformation
              and advisory capability. Architecture, data, cloud, security,
              software, delivery and AI — diagnosed, designed, delivered and
              operated.
            </p>
          </Card>
          <Card className="border-brand/30 bg-brand-subtle/50 p-6 sm:p-8">
            <PanelLabel>ARK</PanelLabel>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-balance">
              {ark.question}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The technology and product ecosystem. Agent readiness, outcome
              assurance, the fit assessments that decide where AI belongs, and
              the open protocol and runtime work underneath them.
            </p>
          </Card>
        </div>
        <Takeaway className="mt-12 max-w-3xl">{ark.principle}</Takeaway>
      </Section>

      <Section className="bg-muted/30">
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
                <Button href="/contact" size="sm">
                  Get in touch
                </Button>
                <Button href="/work" variant="outline" size="sm">
                  See the work
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

      <Section>
        <SectionHeading
          kicker="The practice"
          title="Four parts. Same standard."
          lead="Advisory for the commercial work. ARK for the products. Labs for the open and experimental. Learn so you can use the method without us."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link key={p.id} href={p.href} className="group block h-full">
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-accent text-foreground">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  {p.status !== "live" ? <StatusBadge status={p.status} /> : null}
                </div>
                <h3 className="mt-5 flex items-center gap-1.5 text-base font-semibold">
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.detail}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="What changes together"
          title="Technology change is never only technology."
          lead="A platform migration that ignores process, data trust, security or the people expected to run it is not a migration. It is a bill."
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
          kicker="FAQ"
          title="Straight answers."
          lead="The questions that come up on almost every call."
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} />
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            kicker="Next"
            title="Start wherever is cheapest for you."
            lead="The free tools and playbooks exist so you can judge the thinking before you talk to anyone."
          />
          <Link
            href="/playbooks"
            className="inline-flex flex-none items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
          >
            Start learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CTA
        title="Thirty minutes. No deck."
        lead="We will listen, ask the hard questions, and tell you whether ARC is the right next step — including when it is not."
      />
    </>
  );
}
