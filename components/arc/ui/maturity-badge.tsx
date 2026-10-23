import { cn } from "@/lib/utils";
import type { Maturity } from "@/lib/content";
import { maturityStyle } from "@/lib/arc/status";

/**
 * The prototype's `ui/StatusBadge`, over the repository's `Maturity` union.
 * This is the only place maturity is rendered on the redesigned routes.
 */
export function ArcMaturityBadge({
  maturity,
  onDark = false,
  className,
}: {
  maturity: Maturity;
  onDark?: boolean;
  className?: string;
}) {
  const s = maturityStyle(maturity);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11.5px] font-medium",
        onDark ? s.dark : s.light,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}
