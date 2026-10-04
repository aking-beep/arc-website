import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  /** Set when the brand is sitting on a photograph rather than on the page. */
  onImage,
}: {
  className?: string;
  onImage?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-none items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "flex h-8 w-8 flex-none items-center justify-center rounded-lg text-sm font-bold",
          onImage
            ? "glass-strong text-on-image"
            : "bg-primary text-primary-foreground",
        )}
      >
        A
      </span>
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight">
        ARC{" "}
        <span
          className={cn(
            "font-normal",
            onImage ? "text-on-image/70" : "text-muted-foreground",
          )}
        >
          Transformation Group
        </span>
      </span>
    </Link>
  );
}
