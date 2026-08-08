import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/cta";
import { platformCapabilities, site } from "@/lib/content";

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
            In active development — join the early-access list.
          </span>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          kicker="What it does"
          title="AI operating intelligence."
          lead="Built on the same shared design system, auth, scoring, and reporting as every ARC product — so it reads like one system, not a bolt-on."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {platformCapabilities.map((c) => (
            <Card key={c.name} className="p-6">
              <h3 className="text-lg font-semibold tracking-tight">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Want early access?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We&rsquo;re onboarding a small group of design partners. If you&rsquo;ve
            already run an ARC diagnostic, the Platform is the natural next step.
          </p>
          <div className="mt-8">
            <Button href={site.calendly} size="lg">
              Talk to us about early access
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
