import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/section";

type Scrim = "bottom" | "left" | "even";

const scrims: Record<Scrim, string> = {
  bottom: "scrim-bottom",
  left: "scrim-left",
  even: "scrim-even",
};

/**
 * A photograph that is going to carry text. The scrim is a separate layer
 * rather than a filter on the image, so the picture keeps its own contrast
 * underneath and the type stays legible over the bright parts.
 */
export function Photo({
  src,
  alt,
  scrim = "even",
  priority,
  sizes = "100vw",
  className,
  zoom,
}: {
  src: string;
  alt: string;
  scrim?: Scrim | "none";
  priority?: boolean;
  sizes?: string;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={82}
        className={cn("object-cover", zoom && "animate-slow-zoom")}
      />
      {scrim === "none" ? null : (
        <div
          className={cn("absolute inset-0", scrims[scrim])}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * A small label resting on a photograph. Glass rather than a solid fill,
 * because a solid chip over a picture reads as a sticker.
 */
export function PhotoChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-on-image",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The full-bleed opening of a page: one photograph, text sitting in its darkest
 * corner. In a light theme this makes the hero a deliberate dark island rather
 * than another white band, which is most of why it stops looking like a
 * template.
 */
export function PhotoHero({
  src,
  alt,
  eyebrow,
  title,
  lead,
  actions,
  height = "tall",
}: {
  src: string;
  alt: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  height?: "tall" | "short";
}) {
  return (
    <section
      /*
       * The marker is what the header looks for to decide whether to float
       * transparently. Self-registering, so adding a photo hero to a new page
       * needs no change to the header.
       */
      data-photo-hero=""
      className={cn(
        // Slides up under the sticky header so the photograph runs behind it
        // instead of starting below it. The top padding below clears the bar.
        "relative isolate -mt-16 flex items-end overflow-hidden",
        height === "tall"
          ? "min-h-[36rem] sm:min-h-[41rem] lg:min-h-[44rem]"
          : "min-h-[24rem] sm:min-h-[28rem]",
      )}
    >
      <Photo
        src={src}
        alt={alt}
        scrim="bottom"
        priority
        zoom
        sizes="100vw"
      />
      {/* A second pass on the left only, so the text column stays readable on
          wide screens where the bottom scrim has thinned out. */}
      <div
        className="absolute inset-0 hidden scrim-left lg:block"
        aria-hidden="true"
      />
      <Container className="relative pb-14 pt-28 sm:pb-20 sm:pt-32">
        <div className="max-w-2xl animate-fade-up text-on-image">
          {eyebrow ? <div className="mb-6">{eyebrow}</div> : null}
          <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-display text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-image/80 sm:text-xl">
              {lead}
            </p>
          ) : null}
          {actions ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

/**
 * A card whose surface is a photograph, with its content stacked in the dark
 * bottom edge. The mockup equivalent of a product tile.
 */
export function PhotoCard({
  src,
  alt,
  chips,
  children,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  chips?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl shadow-md ring-1 ring-foreground/5 transition-shadow duration-300 hover:shadow-xl",
        className,
      )}
    >
      <Photo
        src={src}
        alt={alt}
        scrim="bottom"
        sizes={sizes}
        className="transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {chips ? (
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">{chips}</div>
      ) : null}
      <div className="relative p-6 text-on-image sm:p-7">{children}</div>
    </div>
  );
}
