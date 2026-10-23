import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/arc/ui/container";
import { ResearchLibrary } from "@/components/arc/research/research-library";
import { ClosingCta } from "@/components/arc/closing-cta";
import {
  featuredResearch,
  formatResearchDate,
  frameworks,
  researchIndex,
  researchThemes,
} from "@/lib/arc/research";
import { arcSite } from "@/lib/arc/site";
import { jsonLdScript } from "@/lib/arc/json-ld";

const title = "Research and insights · AI agent infrastructure, MCP security and AI governance";
const description =
  "Dated, cited technical briefs and frameworks on AI agent infrastructure, agent reliability, MCP security, AI governance, workflow automation and cloud modernization. Updated when the facts change.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ARC Transformation Group` },
  description,
  alternates: { canonical: "/research" },
  openGraph: { title, description, url: "/research", type: "website" },
  twitter: { title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ARC Research and Insights",
  url: `${arcSite.domain}/research`,
  description,
  hasPart: researchIndex.map((r) => ({
    "@type": "Article",
    headline: r.title,
    datePublished: r.date,
    about: r.topic,
    abstract: r.summary,
    url: `${arcSite.domain}${r.href}`,
    author: { "@type": "Organization", name: arcSite.name },
    publisher: { "@type": "Organization", name: arcSite.name, url: arcSite.domain },
  })),
};

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <section aria-labelledby="research-title" className="border-b border-line">
        <Container className="py-16 sm:py-20">
          <p className="font-mono text-[13px] text-brand">Research and insights</p>
          <h1
            id="research-title"
            className="mt-5 max-w-[820px] font-serif text-[42px] leading-[1.06] tracking-[-0.02em] text-balance text-ink sm:text-[56px]"
          >
            The reasoning and the sources, not a summary of a summary.
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-pretty text-ink-2">
            Technical briefs, frameworks and architecture guidance. Dated, cited, and updated when
            the facts change. Where a claim is ours rather than a source’s, it says so.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {researchThemes.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[12px] text-ink-2"
              >
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="featured-title" className="border-b border-line bg-paper">
        <Container className="grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <h2 id="featured-title" className="font-mono text-[12px] text-ink-3">
              Featured · {featuredResearch.kind}
            </h2>
            <Link href={featuredResearch.href} className="group mt-3 block">
              <span className="block font-serif text-[30px] leading-[1.15] text-ink transition-colors duration-150 group-hover:text-brand sm:text-[36px]">
                {featuredResearch.title}
              </span>
              <span className="mt-4 block text-[16.5px] leading-relaxed text-ink-2">
                {featuredResearch.summary}
              </span>
              <span className="mt-4 block text-[13.5px] text-ink-3">
                {formatResearchDate(featuredResearch.date)} · {featuredResearch.minutes} min read ·{" "}
                {featuredResearch.sources} cited sources · {featuredResearch.findings} key findings
              </span>
            </Link>
          </div>
          <div className="border-t border-line-strong pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="text-[14px] font-semibold text-ink">Free frameworks</h3>
            <p className="mt-1 text-[13px] text-ink-3">
              Published in full on the page. No email gate.
            </p>
            <ul className="mt-3 divide-y divide-line">
              {frameworks.map((f) => (
                <li key={f.slug}>
                  <Link href={f.href} className="group block py-3">
                    <span className="block text-[15.5px] font-semibold text-ink group-hover:text-brand">
                      {f.name}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-2">
                      {f.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="library-title" className="py-14 sm:py-16">
        <Container>
          <ResearchLibrary />
        </Container>
      </section>

      <ClosingCta
        id="research-cta"
        title="Want this applied to your estate?"
        lead="The briefs describe what changed. Working out what it means for the systems you actually run is an engagement, and usually a short one."
      />
    </>
  );
}
