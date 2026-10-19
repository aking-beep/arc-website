import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CTA } from "@/components/cta";
import { CaseStudyGroup, ProductProof, proofDisclaimer } from "@/components/proof";

export const metadata: Metadata = {
  title: "Work · What changed, and what it was worth",
  description:
    "ARC's own engagements, kept separate from the Fortune 100 and Fortune 500 programmes our team delivered in prior roles. Where the client cannot be named, the scale is.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Work"
        title="What changed, and what it was worth."
        lead="Two different kinds of evidence, kept apart. What ARC has delivered as ARC, and what our team delivered before ARC existed. Conflating them would be the easiest lie on this site."
      />

      <CaseStudyGroup
        kind="arc"
        title="Delivered as ARC."
        lead="Engagements run under this name. There is one, it is recent, and the list grows at the rate the work happens."
      />

      <CaseStudyGroup
        kind="career"
        className="bg-muted/30"
        title="Delivered by our team, before ARC."
        lead="Fortune 100 and Fortune 500 programmes from prior roles. The experience is why the assessments are worth buying; it is not a customer list."
        disclaimer={proofDisclaimer}
      />

      <ProductProof />

      <CTA
        variant="talk"
        title="Want work of this shape on your problem?"
        lead="Thirty minutes is enough to tell you whether this is a scoped review, a focused project, or nothing from us at all."
      />
    </>
  );
}
