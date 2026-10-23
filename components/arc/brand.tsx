import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The wordmark. An arc over a point: the thing being watched, and the control
 * drawn over it. Ported from the prototype's `Brand`.
 *
 * The prototype hardcoded the stroke and dot fills per theme. Here they use
 * `currentColor` and the token colours so the mark follows the page theme
 * rather than assuming a light page.
 */
export function ArcBrand({
  onDark = false,
  href = "/",
  className,
}: {
  onDark?: boolean;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="ARC Transformation Group, home"
      className={cn(
        "inline-flex items-center gap-2.5",
        onDark ? "text-mist" : "text-ink",
        className,
      )}
    >
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" className="shrink-0">
        <rect x="0.5" y="0.5" width="25" height="25" rx="5" fill="currentColor" />
        <path
          d="M6.5 19 A6.5 6.5 0 0 1 19.5 19"
          fill="none"
          stroke={onDark ? "hsl(var(--night))" : "hsl(var(--canvas))"}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="13" cy="12.5" r="1.8" fill="hsl(var(--brand))" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">ARC</span>
        <span
          className={cn(
            "mt-0.5 text-[10.5px] font-medium",
            onDark ? "text-mist-2" : "text-ink-3",
          )}
        >
          Transformation Group
        </span>
      </span>
    </Link>
  );
}
