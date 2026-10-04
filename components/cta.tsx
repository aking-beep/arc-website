import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

export function CTA({
  title = "Want this standard of work on your problem?",
  lead = "Most work starts with a scoped review. A 30-minute call is enough to tell you whether that is the right first step, and what size of engagement the problem needs.",
  topic,
}: {
  title?: string;
  lead?: string;
  /** Carries context into the contact page when a page has a specific ask. */
  topic?: string;
}) {
  return (
    /*
     * The closing moment is a deep surface rather than another pale band, so
     * the page has a dark bookend to match the hero and the final ask is the
     * brightest thing on screen.
     */
    <Section className="pb-20 pt-4 sm:pb-28 sm:pt-8">
      <div className="relative isolate overflow-hidden rounded-3xl bg-panel px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bloom" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-display text-balance text-on-image sm:text-[2.75rem]">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-on-image/70">{lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.calendly} variant="light" size="lg">
              Book a 30-min discovery call
            </Button>
            <Button
              href={topic ? `/contact?topic=${topic}` : "/contact"}
              variant="glass"
              size="lg"
            >
              Send a note instead
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
