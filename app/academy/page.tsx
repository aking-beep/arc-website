import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { CTA } from "@/components/cta";
import { academy, academyOutcomes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Academy · Workshops",
  description:
    "ARC Academy runs hands-on workshops against your real systems and backlog, so the team leaves with owners and a next step.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        kicker="ARC Academy"
        title="Workshops that leave a next step."
        lead="Three live formats: digital readiness, a technical operator session, or a custom day built around the decision you need to make. No course catalog. No certification product."
      />

      <Section>
        <SectionHeading
          kicker="Formats"
          title="How we run them."
          lead="Every workshop is hands-on and leaves with owners. Pick the format that matches where you are."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {academy.map((a) => (
            <Link
              key={a.slug}
              href={`/academy/${a.slug}`}
              className="group block h-full"
            >
              <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Workshop
                </span>
                <h3 className="mt-4 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                  {a.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {a.text}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {a.detail}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            kicker="Outcomes"
            title="What a workshop leaves behind."
          />
          <ul className="space-y-4">
            {academyOutcomes.map((o) => (
              <li key={o} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 flex-none text-emerald-500" />
                <span className="text-base leading-relaxed text-muted-foreground">
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTA
        title="Want a workshop for your team?"
        lead="Tell us the decision the room has to make. We'll scope a half-day or two-day session against your real systems — not a generic training deck."
      />
    </>
  );
}
