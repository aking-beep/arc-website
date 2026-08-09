import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for the ${site.name} website.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Terms of use"
        lead="Plain-language terms for using this website and the public Labs tools linked from it."
      />
      <Container className="max-w-2xl space-y-10 py-16 sm:py-20">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">The short version</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This site is informational. Free Labs tools are provided as-is under
            their own licenses. Paid Studio and Academy work is governed
            by a separate engagement agreement, not these website terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Website content</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You may browse and share links to public pages. Don&rsquo;t scrape the
            site in a way that degrades service, misrepresent ARC, or use our
            marks to imply endorsement without written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Labs tools</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Open-source tools linked from ARC Labs carry their own licenses
            (typically MIT) and disclaimers. Run them at your own risk; validate
            findings before you change production systems.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">No professional advice warranty</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Articles, benchmarks, and marketing copy are not a substitute for an
            engagement. Outcomes depend on your people, data, and constraints. We
            don&rsquo;t guarantee results from reading the site alone.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Questions about these terms:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            . Last updated: August 9, 2026.
          </p>
        </section>
      </Container>
    </>
  );
}
