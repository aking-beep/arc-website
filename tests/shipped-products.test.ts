import { describe, expect, it } from "vitest";

import { getShippedProduct, shippedProducts } from "@/lib/arc/shipped";
import { arcSite } from "@/lib/arc/site";
import { secondaryRoutes } from "@/lib/content";
import { arkProducts, getArkProduct } from "@/lib/ark";

/**
 * The site drifted two months behind the build once already: Fit Teams shipped
 * with a billing portal on 2 November and the site still sent buyers to a
 * contact form. These tests pin the published figures to the values read from
 * the app's own plan config, so the next drift fails a build instead of
 * quietly costing money.
 *
 * Source of truth: aifit-engine, apps/teams/src/design/config.ts
 */

const EXPECTED_PLANS: Record<string, { name: string; price: string; cadence: string }[]> = {
  "fit-teams": [
    { name: "Assessment", price: "$149", cadence: "one-time" },
    { name: "Blueprint", price: "$399", cadence: "one-time" },
    { name: "Workspace", price: "$199", cadence: "month" },
  ],
  // Fit lists ONLY Free. ark-ai-fit.vercel.app serves the older consumer app
  // from the `ark` repo, which has no accounts and no paid tier; the $12 Pro
  // in aifit-engine is not on that deployment. Selling it would charge for
  // something the URL does not offer.
  fit: [{ name: "Free", price: "$0", cadence: "month" }],
};

describe("shipped products", () => {
  it("publishes exactly the plans the apps charge for", () => {
    for (const [slug, expected] of Object.entries(EXPECTED_PLANS)) {
      const product = getShippedProduct(slug);
      expect(product, `${slug} is missing`).toBeDefined();
      expect(
        product?.plans.map((p) => ({ name: p.name, price: p.price, cadence: p.cadence })),
        `${slug} plans drifted from apps/teams/src/design/config.ts`
      ).toEqual(expected);
    }
  });

  it("sends buyers to https URLs only", () => {
    for (const product of shippedProducts) {
      expect(product.url.startsWith("https://"), `${product.slug} is not https`).toBe(true);
    }
  });

  it("gives every plan something to show for the money", () => {
    for (const product of shippedProducts) {
      for (const plan of product.plans) {
        expect(plan.features.length, `${product.slug}/${plan.name} lists no features`)
          .toBeGreaterThan(0);
      }
    }
  });

  it("does not sell a Fit tier that is not on the deployment", () => {
    const fit = getShippedProduct("fit");
    expect(fit?.plans.map((p) => p.name)).toEqual(["Free"]);
    expect(fit?.plans.some((p) => p.price !== "$0"), "Fit has no paid tier live").toBe(false);
    expect(fit?.note).toMatch(/not on this deployment/i);
  });

  it("keeps Fit's separation from Fit Teams on the record", () => {
    // ADR-0008 and ADR-0009 both refuse an AI Fit -> Teams funnel. If that
    // note disappears the page starts implying a funnel the products refuse.
    expect(getShippedProduct("fit")?.note).toMatch(/does not feed/i);
  });

  it("publishes the products route", () => {
    expect(secondaryRoutes).toContain("/products");
  });

  it("resolves a known slug and rejects an unknown one", () => {
    expect(getShippedProduct("fit-teams")?.name).toBe("Fit Teams");
    expect(getShippedProduct("nope")).toBeUndefined();
  });
});

describe("ARC Control stays honest about what is built", () => {
  const control = getArkProduct("ark-control");

  it("is still labelled design-partner, because no outside team has used it", () => {
    // ADR-0009: "no customer outside this repository has instrumented
    // production". Promoting this label before that changes would be a claim
    // about deployment status ARC has not earned.
    expect(control?.maturity).toBe("design-partners");
  });

  it("says plainly that it cannot escalate to a person yet", () => {
    // apps/control/src/lib/receipts.ts: "there is no approval service".
    // guard.ts stops the action on require_approval.
    expect(control?.today).toMatch(/approval service is not/i);
    expect(control?.today).toMatch(/allow and deny but cannot ask/i);
  });

  it("leads on the action question rather than a capability list", () => {
    expect(control?.tagline).toMatch(/may this agent take this action/i);
  });

  it("keeps Control out of the request path in the copy", () => {
    expect(control?.intro.join(" ")).toMatch(/out of the request path/i);
  });

  it("does not claim a product you can buy", () => {
    expect(control?.today).toMatch(/not something you can buy yet/i);
  });
});

describe("positioning", () => {
  it("describes an AI and development studio", () => {
    expect(arcSite.positioning).toMatch(/AI and development studio/i);
    expect(arcSite.metaDescription).toMatch(/AI and development studio/i);
  });

  it("still names the market it serves", () => {
    expect(arcSite.positioning).toMatch(/1 to 200/);
  });

  it("names the studio's disciplines, not just AI", () => {
    const text = `${arcSite.positioning} ${arcSite.metaDescription}`.toLowerCase();
    for (const discipline of ["automation", "infrastructure", "software"]) {
      expect(text, `positioning never mentions ${discipline}`).toContain(discipline);
    }
  });

  it("keeps every ark product's maturity label from being overstated", () => {
    const allowed = new Set(["design-partners", "available", "research", "alpha", "experiment"]);
    for (const p of arkProducts) {
      expect(allowed.has(p.maturity), `${p.slug} has maturity ${p.maturity}`).toBe(true);
    }
  });
});

describe("the products page shows the whole Labs estate", () => {
  it("does not hide the alpha and experiment tools", async () => {
    // An earlier draft filtered to open-source only, which showed 3 of 9 and
    // undersold the estate. Showing all of them with an honest maturity label
    // is better than hiding six working tools.
    const { labProducts } = await import("@/lib/arc/products");
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile("app/products/page.tsx", "utf8")
    );
    expect(labProducts.length).toBeGreaterThanOrEqual(9);
    expect(source).toContain("labProducts.map");
    expect(source, "maturity must be labelled, never implied").toContain("maturityLabel[tool.maturity]");
    expect(source).not.toContain('maturity === "open-source"');
  });
});
