import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Required on every surface that shows simulated data. The prototype treats
 * this as non-negotiable and so does this implementation: the ARC Control
 * console and the execution visualization are both invented, and a visitor
 * must never be able to mistake either for a live system.
 */
export function DemoLabel({
  onDark = false,
  text = "Demonstration data",
  className,
}: {
  onDark?: boolean;
  text?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[11px] font-medium",
        onDark
          ? "border-warn-on-dark/35 text-warn-on-dark"
          : "border-warn/30 bg-warn-subtle text-warn",
        className,
      )}
    >
      <FlaskConical size={12} aria-hidden="true" />
      {text}
    </span>
  );
}
