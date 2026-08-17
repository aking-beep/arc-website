import type { Metadata } from "next";
import { Github } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CTA } from "@/components/cta";
import { labGroups, labs, labsProof, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Labs · Free & open-source tools",
  description:
    "Free ARC Labs tools: scanners, catalogs, and utilities you can run yourself. Most need no account. No paid tiers.",
};

export default function LabsPage() {
  return (
    <>
      <PageHero
        kicker="ARC Labs"
        title="Free tools you can run today."
        lead={`${labsProof.tools} free tools, grouped by the job they do. Most need no account. TokenLoop uses a free signup so keys stay encrypted. ${labsProof.note}`}
      >
        <Button href={site.github} variant="outline">
          <Github className="h-4 w-4" />
          Browse the GitHub org
        </Button>
      </PageHero>

      {labGroups.map((group, i) => {
        const products = group.slugs
          .map((slug) => labs.find((p) => p.slug === slug))
          .filter((p): p is (typeof labs)[number] => Boolean(p));
        if (products.length === 0) return null;
        return (
          <Section key={group.id} id={group.id} className={`scroll-mt-24${i % 2 === 1 ? " bg-muted/30" : ""}`}>
            <SectionHeading title={group.name} lead={group.lead} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} basePath="/labs" />
              ))}
            </div>
          </Section>
        );
      })}

      <CTA
        title="Want ARC to help remediate this?"
        lead="Labs is the front door. Studio is the remediation plan: prioritized fixes, named owners, and work that survives contact with your stack. Book a 30-minute call."
      />
    </>
  );
}
