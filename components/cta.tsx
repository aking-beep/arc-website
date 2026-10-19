import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";
import { assessment } from "@/lib/ark";

/**
 * The closing ask, by intent.
 *
 * This used to be one component with default copy, rendered at the foot of
 * twenty pages — one of which called it with no props at all, so the case
 * study index closed with the same sentence as the home page. A page now has
 * to say which conversation it is ending, and `title`/`lead` are required so
 * a bare <CTA /> fails typecheck instead of shipping.
 */
export type CtaVariant = "scan" | "assessment" | "tool" | "talk";

const actions: Record<
  CtaVariant,
  { primary: { label: string; href: string }; secondary: { label: string; href: string } }
> = {
  scan: {
    primary: { label: "Run the free scan", href: "/labs/arc-agent-governance" },
    secondary: { label: `See the assessment — ${assessment.price?.amount}`, href: "/assessment" },
  },
  assessment: {
    primary: { label: "Book 30 minutes", href: site.calendly },
    secondary: { label: "Send a note instead", href: "/contact?topic=assessment" },
  },
  tool: {
    primary: { label: "Run the free scan", href: "/labs/arc-agent-governance" },
    secondary: { label: "Browse all tools", href: "/labs" },
  },
  talk: {
    primary: { label: "Book 30 minutes", href: site.calendly },
    secondary: { label: "Send a note instead", href: "/contact" },
  },
};

export function CTA({
  title,
  lead,
  variant = "talk",
  topic,
}: {
  title: string;
  lead: string;
  variant?: CtaVariant;
  /** Carries context into the contact page when a page has a specific ask. */
  topic?: string;
}) {
  const action = actions[variant];
  const secondaryHref =
    topic && action.secondary.href.startsWith("/contact")
      ? `/contact?topic=${topic}`
      : action.secondary.href;

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
          <Button href={action.primary.href} size="lg">
            {action.primary.label}
          </Button>
          <Button href={secondaryHref} variant="outline" size="lg">
            {action.secondary.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
