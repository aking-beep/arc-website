import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Ported unchanged from the prototype's `ui/SectionIntro`. */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  onDark = false,
  id,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  onDark?: boolean;
  id?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-[720px]", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "font-mono text-[12.5px] font-medium",
            onDark ? "text-brand-on-dark" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "mt-3 font-serif text-[32px] leading-[1.12] tracking-[-0.015em] text-balance sm:text-[40px]",
          onDark ? "text-mist" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-relaxed text-pretty",
            onDark ? "text-mist-2" : "text-ink-2",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
