import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The prototype's shell width. Every redesigned section sits inside one. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-shell px-5 sm:px-8", className)}>{children}</div>
  );
}
