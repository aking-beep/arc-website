import { describe, expect, it } from "vitest";

import { commitments, getOffer, offerLadder, pricingApproved } from "@/lib/arc/offers";
import { secondaryRoutes } from "@/lib/content";
import { arcFooterColumns, arcSite } from "@/lib/arc/site";

/**
 * The research behind this ladder (docs/STUDIO-POSITIONING-2026-11.md) found
 * that all eleven competing studios publish a price and a timeline, and ARC
 * published neither. These tests exist so the ladder cannot regress back to
 * that state one well-meaning edit at a time.
 */

const everyString = [
  ...offerLadder.flatMap((offer) => [
    offer.situation,
    offer.name,
    offer.price,
    offer.timeline,
    offer.summary,
    offer.stopPoint,
    offer.answers ?? "",
    ...offer.includes,
  ]),
  ...commitments.flatMap((c) => [c.heading, c.text]),
  arcSite.positioning,
  arcSite.metaDescription,
];

describe("the engagement ladder", () => {
  it("gives every rung a price and a delivery window", () => {
    for (const offer of offerLadder) {
      expect(offer.price.trim(), `${offer.slug} has no price`).not.toBe("");
      expect(offer.timeline.trim(), `${offer.slug} has no timeline`).not.toBe("");
      expect(offer.includes.length, `${offer.slug} lists nothing`).toBeGreaterThan(0);
      expect(offer.stopPoint.trim(), `${offer.slug} has no stop point`).not.toBe("");
    }
  });

  it("leads each rung with the buyer's situation rather than the contract name", () => {
    // docs/WRITING.md: name the situation the buyer is in, not the discipline.
    for (const offer of offerLadder) {
      expect(offer.situation.length, `${offer.slug} situation is too terse to be a sentence`)
        .toBeGreaterThan(20);
      expect(offer.situation).not.toBe(offer.name);
    }
  });

  it("keeps a rung where the recommendation is that you do not hire ARC", () => {
    // The 2026 buyer's guide names "what would you NOT automate" as the test
    // question for a vendor. This rung is the answer, and it is the single
    // most credible thing on the page for this buyer.
    const nothing = getOffer("nothing");
    expect(nothing).toBeDefined();
    expect(nothing?.price).toBe("$0");
  });

  it("keeps the rung no competitor offers", () => {
    const assurance = getOffer("outcome-assurance");
    expect(assurance).toBeDefined();
    expect(assurance?.price).toMatch(/month/);
    // Reconciliation is the differentiator. Hosting and uptime are not.
    expect(assurance?.summary.toLowerCase()).toContain("reconcile");
  });

  it("has unique slugs and resolves each one", () => {
    const slugs = offerLadder.map((o) => o.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(getOffer(slug)?.slug).toBe(slug);
  });

  it("returns undefined for a slug that does not exist", () => {
    expect(getOffer("no-such-rung")).toBeUndefined();
  });

  it("flags the prices as unapproved until ARC sets them", () => {
    // Benchmarked from competitors, not costed by ARC. The page renders an
    // "indicative" banner while this is false, so a draft number is never
    // presented as a quote.
    expect(pricingApproved).toBe(false);
  });
});

describe("positioning", () => {
  it("names the company size it serves", () => {
    expect(arcSite.positioning).toMatch(/1 to 200/);
    expect(arcSite.metaDescription).toMatch(/1 to 200/);
  });

  it("no longer sells 'enterprise' to a market of 1 to 200 people", () => {
    expect(arcSite.metaDescription.toLowerCase()).not.toContain("enterprise");
  });

  it("publishes the pricing route in the sitemap and the footer", () => {
    expect(secondaryRoutes).toContain("/pricing");
    const footerHrefs = arcFooterColumns.flatMap((c) => c.links.map((l) => l.href));
    expect(footerHrefs).toContain("/pricing");
  });
});

describe("the copy holds to docs/WRITING.md", () => {
  // The retired-constructions table. These are the fingerprints the writing
  // guide bans, and this copy was written in one pass, so it gets checked.
  const retired: { label: string; pattern: RegExp }[] = [
    { label: "`actually`", pattern: /\bactually\b/i },
    { label: "`real X`", pattern: /\breal (systems?|constraints?|number|work|time)\b/i },
    { label: "`honest X`", pattern: /\bhonest\b/i },
    { label: "`not another X`", pattern: /\bnot another\b/i },
    { label: "`no buzzwords` / `plain language`", pattern: /plain language|no buzzwords/i },
    { label: "the em-dash reversal", pattern: /is(?:n't| not) just .*—.*it(?:'s| is)/i },
  ];

  for (const { label, pattern } of retired) {
    it(`uses no ${label}`, () => {
      const offenders = everyString.filter((text) => pattern.test(text));
      expect(offenders, `retired construction ${label} in: ${offenders.join(" | ")}`).toEqual([]);
    });
  }

  it("substantiates every statistic it quotes", () => {
    // WRITING.md: only publish a number that can be substantiated. Every
    // figure in this copy traces to a source named in
    // docs/STUDIO-POSITIONING-2026-11.md.
    const withNumbers = everyString.filter((t) => /\d+(\.\d+)?\s?%/.test(t));
    expect(withNumbers.length).toBeGreaterThan(0);
    for (const text of withNumbers) {
      expect(
        /70%|60%|3\.8%|42%|17%|30%/.test(text),
        `unsourced percentage in: ${text}`
      ).toBe(true);
    }
  });
});
