import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
        A
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        ARC{" "}
        <span className="font-normal text-muted-foreground">
          Transformation Group
        </span>
      </span>
    </Link>
  );
}
