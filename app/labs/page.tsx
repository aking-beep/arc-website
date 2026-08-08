import type { Metadata } from "next";
import { Github } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CTA } from "@/components/cta";
import { labs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Labs — Free & open-source tools",
  description:
    "ARC Labs builds free, open-source scanners and utilities that make the invisible visible. Run them yourself, no strings attached.",
};

export default function LabsPage() {
  return (
    <>
      <PageHero
        kicker="ARC Labs"
        title="Free tools that make the invisible visible."
        lead="Open-source scanners and utilities anyone can run. No signup wall, no sales call. They're the most honest way to meet ARC — you get value before we ever talk about an invoice."
      >
        <Button href={site.github} variant="outline">
          <Github className="h-4 w-4" />
          Browse the GitHub org
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          kicker="The toolbox"
          title="What we've shipped and what's next."
          lead="Everything here shares the same stack, so new tools land fast and behave consistently."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {labs.map((p) => (
            <ProductCard key={p.slug} product={p} basePath="/labs" />
          ))}
        </div>
      </Section>

      <CTA
        title="Found a tool useful?"
        lead="The tools are the front door. If you want a human read on what they surfaced — or help fixing it — that's what ARC Studio is for. Start with a 30-minute call."
      />
    </>
  );
}
