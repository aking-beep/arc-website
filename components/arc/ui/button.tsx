import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ArcButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onDark"
  | "onDarkOutline";

/**
 * Ported from the prototype's `ui/Button`. Two changes:
 *
 * - `to` becomes `href` on a next/link; an http(s) href still renders an
 *   anchor that opens in a new tab and says so to a screen reader.
 * - `text-white` on the ink-filled variant becomes `text-canvas`, because ink
 *   inverts in dark mode and white-on-light would be unreadable.
 */
const variants: Record<ArcButtonVariant, string> = {
  primary: "bg-ink text-canvas hover:bg-ink-2",
  secondary: "border border-line-strong bg-canvas text-ink hover:border-ink hover:bg-paper",
  ghost: "px-0 text-ink hover:text-brand",
  onDark: "bg-mist text-night hover:bg-white",
  onDarkOutline: "border border-night-line text-mist hover:border-mist-2 hover:bg-night-2",
};

const base =
  "group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 text-[14.5px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

export function ArcButton({
  href,
  children,
  variant = "primary",
  arrow = false,
  onClick,
  type = "button",
  disabled,
  className,
  "aria-controls": ariaControls,
  "aria-expanded": ariaExpanded,
}: {
  href?: string;
  children: ReactNode;
  variant?: ArcButtonVariant;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
}) {
  const classes = cn(base, variants[variant], className);
  const external = Boolean(href && /^https?:/.test(href));
  const icon = arrow ? (
    external ? (
      <ArrowUpRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-150 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    ) : (
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5"
      />
    )
  ) : null;

  /**
   * A path ending in a file extension is a file in `public/`, not a route.
   *
   * `next/link` cannot client-side navigate to one: it fetches the target as
   * an RSC payload, that fetch fails, and Next falls back to a full
   * navigation — so the link works but every render of this page fires a
   * failed `?_rsc=` request at a static file. It also makes the one link that
   * matters most on the ARC Control page depend on a fallback path rather
   * than on a plain anchor doing the obvious thing.
   *
   * This was fixed once and lost in a later refactor, so there is now a test
   * pinning it: `tests/ark-control-console.test.ts`.
   */
  const staticFile = /\.[a-z0-9]{2,5}$/i.test((href ?? "").split(/[?#]/)[0] ?? "");

  if (href && !external && !staticFile && !href.startsWith("mailto:")) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
        {icon}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
    >
      {children}
      {icon}
    </button>
  );
}
