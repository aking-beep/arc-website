import type { Metadata } from "next";
import { Calendar, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { pillars, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About & contact",
  description:
    "ARC Transformation Group is a five-pillar ecosystem: free tools, advisory, software, research, and education. Get in touch for a 30-minute discovery call.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="One honest partner across strategy, build, and scale."
        lead="ARC started as an advisory practice and grew into an ecosystem. The through-line never changed: name the stage, show the work, and build for the world you're actually in — small budgets, stretched teams, ROI that has to show up fast."
      />

      <Section>
        <SectionHeading
          kicker="Why an ecosystem"
          title="Every part feeds the next."
          lead="Free tools build trust. Trust creates advisory work. Advisory reveals repeatable patterns. Patterns become software and research. Education makes all of it stick. That flywheel is much harder to copy than any single service."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <div key={p.id} className="rounded-lg border border-border p-5">
              <h3 className="text-sm font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              kicker="Get in touch"
              title="Let's see if there's a fit."
              lead="A 30-minute discovery call. No pitch deck, no commitment. We'll listen, ask the hard questions, and tell you straight up whether ARC is the right partner — even if the answer is no."
            />
            <div className="mt-8 flex flex-col gap-3">
              <Button href={site.calendly} size="lg">
                <Calendar className="h-4 w-4" />
                Book a 30-min discovery call
              </Button>
              <Button
                href={`mailto:${site.email}?subject=Discovery%20call%20request`}
                variant="outline"
                size="lg"
              >
                <Mail className="h-4 w-4" />
                Email Andrew directly
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Send a quick note</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We read every message. A real human writes back within one business
              day.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
