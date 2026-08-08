import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { CTA } from "@/components/cta";
import { academy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Academy — Courses, certifications & workshops",
  description:
    "ARC Academy turns ARC's operating principles into skills your team keeps after we leave: courses, certifications, and hands-on workshops.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        kicker="ARC Academy"
        title="Make it stick after we leave."
        lead="The best engagement is one you don't need to repeat. ARC Academy turns our operating principles — name the stage, land on four axes, ship the boring thing — into skills your team keeps."
      />

      <Section>
        <SectionHeading kicker="Coming soon" title="How we'll teach it." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {academy.map((a) => (
            <Card key={a.name} className="flex flex-col p-6">
              <StatusBadge status={a.status} />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {a.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CTA
        title="Want early access to Academy?"
        lead="We're shaping the first cohort now. Tell us what your team needs to learn and we'll factor it in."
      />
    </>
  );
}
