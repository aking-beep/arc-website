import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex flex-none items-center gap-2.5", className)}
    >
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
        A
      </span>
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight">
        ARC{" "}
        <span className="font-normal text-muted-foreground">
          Transformation Group
        </span>
      </span>
    </Link>
  );
}
