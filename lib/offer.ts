// Ad destinations for the three playbooks.
//
// /playbook is the catalog inside the site. /offer is the page an ad should
// open: one decision, one price, and the site navigation taken off so the
// visit stays on the purchase. Copy here is the ad layer. Prices, modules,
// and file lists stay in lib/playbook.ts.

import {
  getPlaybookTier,
  playbookSlugs,
  playbookTiers,
  type PlaybookSlug,
  type PlaybookTier,
} from "@/lib/playbook";

export function offerHref(slug?: PlaybookSlug): string {
  return slug ? `/offer/${slug}` : "/offer";
}

export function isOfferPath(pathname: string): boolean {
  return pathname === "/offer" || pathname.startsWith("/offer/");
}

export const offerCatalog = {
  kicker: "Playbooks",
  title: "Buy the playbook for the part of the work you are in.",
  lead: "Define is whether the product should exist. Build is how the system is put together. Ship is whether it is ready to launch. Each file is a separate purchase.",
};

export const offerAudience =
  "For a founder or a product lead deciding, building, or launching a product that uses a model.";

export const offerDelivery =
  "One payment. The PDF and the files for that playbook arrive by email. There is no account and no subscription.";

export const offerRefund =
  "Ask us within 30 days and we refund the playbook you bought.";

/** The situation the ad should match. The product subtitle is the headline. */
export const offerFit: Record<PlaybookSlug, string> = {
  define:
    "You have an idea for a product that uses a model, and you have not written the line that would make you stop.",
  build:
    "The product decision is made. You are drawing the system, or a prototype already runs and the boundary is still unclear.",
  ship: "Something runs. You need a number that means working, and a plan for the first people who use it.",
};

export function offerTiers(): readonly PlaybookTier[] {
  return playbookTiers;
}

export function offerTier(slug: string): PlaybookTier | undefined {
  if (!playbookSlugs.includes(slug as PlaybookSlug)) return undefined;
  return getPlaybookTier(slug);
}
