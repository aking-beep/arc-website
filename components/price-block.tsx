import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PanelLabel } from "@/components/diagram";
import { cn } from "@/lib/utils";
import type { ArkProduct } from "@/lib/ark";

/**
 * A price, where a buyer can see it without asking.
 *
 * There was nowhere for a price to live in the design system, which is part
 * of why nothing above $20 had one. A product page without this component is
 * a brochure.
 */
export function PriceBlock({
  price,
  className,
  children,
}: {
  price: NonNullable<ArkProduct["price"]>;
  className?: string;
  /** The purchase action. Passed in so this component owns no CTA policy. */
  children?: React.ReactNode;
}) {
  return (
    <Card className={cn("p-6 sm:p-8", className)}>
      <PanelLabel>What it costs</PanelLabel>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-4xl font-semibold tracking-tight">
          {price.amount}
        </span>
        <span className="text-sm text-muted-foreground">{price.unit}</span>
      </div>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {price.duration}
      </p>

      <ul className="mt-6 grid gap-2.5 border-t border-border/60 pt-5">
        {price.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
            <Check className="mt-0.5 h-4 w-4 flex-none text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        {price.note}
      </p>

      {children ? <div className="mt-6">{children}</div> : null}
    </Card>
  );
}
