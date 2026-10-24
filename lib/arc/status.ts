// ---------------------------------------------------------------------------
// The one way maturity is shown anywhere on the site.
//
// The prototype shipped its own `Status` union in `data/products`. Running two
// taxonomies would let the same tool show one status on /labs and another on
// /labs/[slug], so this keeps the repository's `Maturity` (lib/content.ts) and
// gives it the prototype's labels and styling.
//
// Labels are deliberately literal. A visitor should never mistake an
// experiment for a product.
// ---------------------------------------------------------------------------

import type { Maturity } from "@/lib/content";

export type MaturityStyle = {
  label: string;
  /** Classes for a light surface. */
  light: string;
  /** Classes for a permanently dark panel. */
  dark: string;
  /** The dot. */
  dot: string;
};

export const maturityStyles: Record<Maturity, MaturityStyle> = {
  available: {
    label: "Available",
    light: "border-ok/25 bg-ok-subtle text-ok",
    dark: "border-ok-on-dark/30 text-ok-on-dark",
    dot: "bg-ok",
  },
  // The tools are live and free to use; the site no longer links their
  // repositories, so the label does not claim code a visitor cannot see.
  "open-source": {
    label: "Live",
    light: "border-ok/25 bg-ok-subtle text-ok",
    dark: "border-ok-on-dark/30 text-ok-on-dark",
    dot: "bg-ok",
  },
  alpha: {
    label: "Alpha",
    light: "border-warn/25 bg-warn-subtle text-warn",
    dark: "border-warn-on-dark/30 text-warn-on-dark",
    dot: "bg-warn",
  },
  experiment: {
    label: "Experiment",
    light: "border-line-strong bg-paper text-ink-2",
    dark: "border-night-line text-mist-2",
    dot: "bg-ink-3",
  },
  "design-partners": {
    label: "Design-partner development",
    light: "border-brand/25 bg-brand-subtle text-brand",
    dark: "border-brand-on-dark/30 text-brand-on-dark",
    dot: "bg-brand",
  },
  "in-development": {
    label: "In development · not public",
    light: "border-line-strong bg-paper text-ink-2",
    dark: "border-night-line text-mist-2",
    dot: "bg-ink-3",
  },
  research: {
    label: "Research",
    light: "border-line-strong bg-paper text-ink-2",
    dark: "border-night-line text-mist-2",
    dot: "bg-ink-3",
  },
};

export function maturityStyle(maturity: Maturity): MaturityStyle {
  return maturityStyles[maturity];
}

/**
 * True when a visitor can go and use the thing right now. Used for the
 * "usable today" count on /labs, so the number cannot overstate the catalogue.
 */
export function isUsableToday(maturity: Maturity): boolean {
  return maturity !== "in-development" && maturity !== "research";
}
