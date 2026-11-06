import type { Metadata } from "next";
import { HomeHero } from "@/components/arc/home/home-hero";
import { Ecosystem } from "@/components/arc/home/ecosystem";
import { Capabilities } from "@/components/arc/home/capabilities";
import { FeaturedProducts } from "@/components/arc/home/featured-products";
import { Methodology } from "@/components/arc/home/methodology";
import { Expertise } from "@/components/arc/home/expertise";
import { LatestResearch } from "@/components/arc/home/latest-research";
import { MarketSignals } from "@/components/market-signals";
import { ClosingCta } from "@/components/arc/closing-cta";
import { arcSite } from "@/lib/arc/site";

export const metadata: Metadata = {
  // The default title in the root layout is already the homepage title, so
  // this route sets `absolute` rather than appending the site name twice.
  title: {
    absolute: "ARC Transformation Group · Make technology work",
  },
  description: arcSite.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "ARC Transformation Group · Make technology work for your business.",
    description: arcSite.metaDescription,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Ecosystem />
      <Capabilities />
      <FeaturedProducts />
      <Methodology />
      <Expertise />
      <LatestResearch />
      {/* Kept from the existing homepage. Every signal is dated and sourced,
          which is the most direct evidence on the site that the research is
          real, so it stays rather than being dropped in the redesign. */}
      <MarketSignals />
      <ClosingCta
        id="home-cta"
        title="Not sure which one you need?"
        lead="You shouldn’t have to diagnose your own technology problem before talking to someone who does this for a living. Tell us what’s happening and we’ll say whether you need a small fix, a focused project, a larger programme — or nothing from us at all."
      />
    </>
  );
}
