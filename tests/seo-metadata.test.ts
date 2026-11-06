import { describe, expect, it } from "vitest";

import { caseStudies, labs, site } from "@/lib/content";
import { research } from "@/lib/research";
import { serviceAreas } from "@/lib/services";
import { arcSite } from "@/lib/arc/site";

/**
 * Guards the lengths that search results actually display.
 *
 * Google truncates a title around 60 characters and a description around
 * 155. Before this, 45 of 61 pages had an over-long title and 36 an
 * over-long description, so the distinguishing half of each was cut off.
 *
 * The fix was not to shorten the headings. `title` on an article is the
 * <h1>, written to be read; `metaTitle` is the shorter one for the <title>
 * tag. These assert the meta variants stay short, so the next person adding
 * an article finds out here rather than in Search Console.
 */

/** " · ARC" is appended by the root metadata template. */
const SUFFIX = " · ARC".length;
const TITLE_MAX = 60;
const DESC_MAX = 155;

describe("meta titles leave room for the brand suffix", () => {
  it("every research metaTitle fits once the suffix is added", () => {
    for (const a of research) {
      if (!a.metaTitle) continue;
      expect(
        a.metaTitle.length + SUFFIX,
        `${a.slug}: "${a.metaTitle}" is ${a.metaTitle.length + SUFFIX} rendered`,
      ).toBeLessThanOrEqual(TITLE_MAX);
    }
  });

  it("every case-study metaTitle fits with its own ' · Work · ARC'", () => {
    const route = " · Work".length + SUFFIX;
    for (const c of caseStudies) {
      if (!c.metaTitle) continue;
      expect(
        c.metaTitle.length + route,
        `${c.slug}: "${c.metaTitle}" is ${c.metaTitle.length + route} rendered`,
      ).toBeLessThanOrEqual(TITLE_MAX);
    }
  });

  it("an article long enough to need a metaTitle has one", () => {
    for (const a of research) {
      if (a.title.length + SUFFIX > TITLE_MAX) {
        expect(a.metaTitle, `${a.slug} needs a metaTitle: its title is ${a.title.length}`).toBeTruthy();
      }
    }
  });
});

describe("meta descriptions fit what a search result shows", () => {
  const sets: [string, { slug: string; metaDescription?: string }[]][] = [
    ["research", research],
    ["caseStudies", caseStudies],
    ["labs", labs],
    ["serviceAreas", serviceAreas],
  ];

  for (const [name, items] of sets) {
    it(`${name} metaDescriptions are within ${DESC_MAX} characters`, () => {
      for (const item of items) {
        if (!item.metaDescription) continue;
        expect(
          item.metaDescription.length,
          `${name}/${item.slug} is ${item.metaDescription.length}`,
        ).toBeLessThanOrEqual(DESC_MAX);
      }
    });
  }

  it("anything long enough to need a metaDescription has one", () => {
    for (const a of research) {
      if (a.summary.length > DESC_MAX) {
        expect(a.metaDescription, `${a.slug} needs one: summary is ${a.summary.length}`).toBeTruthy();
      }
    }
    for (const p of labs) {
      if (p.description.length > DESC_MAX) {
        expect(p.metaDescription, `${p.slug} needs one: description is ${p.description.length}`).toBeTruthy();
      }
    }
    for (const c of caseStudies) {
      if (c.summary.length > DESC_MAX) {
        expect(c.metaDescription, `${c.slug} needs one: summary is ${c.summary.length}`).toBeTruthy();
      }
    }
    for (const s of serviceAreas) {
      if (s.body.length > DESC_MAX) {
        expect(s.metaDescription, `${s.slug} needs one: body is ${s.body.length}`).toBeTruthy();
      }
    }
  });

  it("the site-wide default description fits, since pages inherit it", () => {
    expect(arcSite.metaDescription.length).toBeLessThanOrEqual(DESC_MAX);
  });
});

describe("the heading is not sacrificed to the search result", () => {
  it("keeps the full descriptive title on the page", () => {
    // The point of the metaTitle field: /research/cloud-… has a 91-character
    // heading and a 50-character <title>. Shortening the h1 to fit a SERP
    // would be the wrong trade, so assert the long ones survived.
    const long = research.filter((a) => a.title.length > TITLE_MAX);
    expect(long.length, "expected some headings to be longer than a SERP title").toBeGreaterThan(0);
    for (const a of long) {
      expect(a.metaTitle!.length).toBeLessThan(a.title.length);
    }
  });

  it("still has a name to fall back on", () => {
    expect(site.name).toBe("ARC Transformation Group");
  });
});
