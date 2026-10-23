import { Container } from "@/components/arc/ui/container";
import { ArcButton } from "@/components/arc/ui/button";
import { arcSite } from "@/lib/arc/site";

/**
 * The dark closing band every redesigned page ends on. Ported from the
 * prototype's `ClosingCta`. The heading id is per-instance so two sections on
 * one page cannot collide.
 */
export function ClosingCta({
  id = "cta-title",
  title,
  lead,
  primary = { label: "Talk to ARC", href: "/contact" },
}: {
  id?: string;
  title: string;
  lead: string;
  primary?: { label: string; href: string };
}) {
  return (
    <section
      aria-labelledby={id}
      className="dark-surface bg-night py-20 text-mist sm:py-24"
    >
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2
            id={id}
            className="font-serif text-[34px] leading-[1.1] tracking-[-0.015em] text-balance sm:text-[44px]"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-mist-2">{lead}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex flex-wrap gap-3">
            <ArcButton href={primary.href} variant="onDark" arrow>
              {primary.label}
            </ArcButton>
            <ArcButton href={arcSite.calendly} variant="onDarkOutline">
              Book 30 minutes
            </ArcButton>
          </div>
          <p className="text-[14px] text-mist-2">
            Or email{" "}
            <a
              href={`mailto:${arcSite.email}`}
              className="text-mist underline underline-offset-2 hover:text-white"
            >
              {arcSite.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
