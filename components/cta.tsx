import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

export function CTA({
  title = "Want this standard of work on your problem?",
  lead = "Most Studio work starts with a diagnostic. A 30-minute call is enough to tell you whether that is the right first step, and what size of engagement the problem actually needs.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <Section className="bg-muted/30">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {lead}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={site.calendly} size="lg">
            Book a 30-min discovery call
          </Button>
          <Button href={`mailto:${site.email}`} variant="outline" size="lg">
            Email Andrew directly
          </Button>
        </div>
      </div>
    </Section>
  );
}
