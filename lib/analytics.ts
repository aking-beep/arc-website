// ============================================================================
// Product analytics.
//
// The site already ships @vercel/analytics (see app/layout.tsx) and there is
// no GA4 or GTM container, so custom events go through its track(). Wrapping
// it here does two things a bare call does not: the event names live in one
// place where they can be read as a set, and the payload types stop a rename
// in one component from silently splitting an event into two.
//
// Event names are snake_case, matching the names in the Playbook brief.
// Renaming one after it has history makes the history useless, so treat this
// list as append-only.
// ============================================================================

"use client";

import { track } from "@vercel/analytics";

export type PlaybookEvents = {
  playbook_view: { source?: string };
  playbook_checkout_start: { price: number; environment: string };
  /** Client-side signal only. The webhook is the record of a sale. */
  playbook_purchase_complete: { transaction_id?: string };
  playbook_download_view: { status: string };
  playbook_download_start: { file: string };
  playbook_download_success: { file: string };
  playbook_download_error: { file: string; reason: string };
};

export function trackEvent<K extends keyof PlaybookEvents>(
  name: K,
  properties?: PlaybookEvents[K],
) {
  // Vercel's track() accepts flat primitives only, and undefined values show
  // up as the string "undefined" in the dashboard. Drop them instead.
  const payload = Object.fromEntries(
    Object.entries(properties ?? {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean>;

  track(name, payload);
}
