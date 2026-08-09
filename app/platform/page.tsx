import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductVisualPanel } from "@/components/product-visual";
import { CTA } from "@/components/cta";
import {
  platformCapabilities,
  platformPrinciples,
  platformRoadmap,
  site,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Platform — Productized operating intelligence",
  description:
    "ARC Platform turns the recurring work — diagnostics, governance, reporting — into AI operating intelligence your team runs continuously.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        kicker="ARC Platform"
        title="The diagnostic, running continuously."
        lead="The best consulting findings go stale the day after they're delivered. ARC Platform productizes the recurring work — so the read on your architecture, data, and AI is live instead of a snapshot."
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status="building" />
          <span className="text-sm text-muted-foreground">
            In active development — design partners welcome.
          </span>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <SectionHeading
            kicker="What it does"
            title="AI operating intelligence."
            lead="Built on the same shared design system, auth, scoring, and reporting as every ARC product — so it reads like one system, not a bolt-on."
          />
          <ProductVisualPanel visual="conformance" />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {platformCapabilities.map((c) => (
            <Card key={c.name} className="p-6 transition-all hover:border-foreground/20">
              <h3 className="text-lg font-semibold tracking-tight">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          kicker="Design principles"
          title="How Platform stays honest."
          lead="Same rules as Studio — just running every week instead of every engagement."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {platformPrinciples.map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-base font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            kicker="Roadmap"
            title="What's shipping next."
            lead="We're building with a small design-partner group. Priorities shift with real usage, not a slide deck."
          />
          <ul className="space-y-3">
            {platformRoadmap.map((r) => (
              <li key={r.label} className="flex items-center gap-3">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border">
                  {r.done ? <Check className="h-3 w-3 text-emerald-500" /> : null}
                </span>
                <span className="text-sm text-foreground">{r.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Want early access?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            If you&rsquo;ve already run an ARC diagnostic, Platform is the natural
            next step. We&rsquo;re onboarding a small group of design partners.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.calendly} size="lg">
              Talk to us about early access
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/about#contact" variant="outline" size="lg">
              Send a note
            </Button>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
