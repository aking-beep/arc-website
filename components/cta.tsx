import { ClosingCta } from "@/components/arc/closing-cta";

/**
 * The closing band on the routes that have not been rebuilt on the new
 * layouts. It delegates to the redesigned `ClosingCta`, so every page on the
 * site — redesigned or not — ends on the same band.
 */
export function CTA({
  title = "Want this standard of work on your problem?",
  lead = "Most work starts with a scoped review. A 30-minute call is enough to tell you whether that is the right first step, and what size of engagement the problem needs.",
  topic,
  id = "page-cta",
}: {
  title?: string;
  lead?: string;
  /** Carries context into the contact page when a page has a specific ask. */
  topic?: string;
  id?: string;
}) {
  return (
    <ClosingCta
      id={id}
      title={title}
      lead={lead}
      primary={{
        label: "Talk to ARC",
        href: topic ? `/contact?topic=${topic}` : "/contact",
      }}
    />
  );
}
