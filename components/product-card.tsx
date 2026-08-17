import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { type Product } from "@/lib/content";

export function ProductCard({
  product,
  basePath,
}: {
  product: Product;
  basePath: string;
}) {
  const href = `${basePath}/${product.slug}`;
  return (
    <Link href={href} className="group block h-full">
      <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
        <div className="flex items-center justify-between gap-3">
          {product.status !== "live" ? (
            <StatusBadge status={product.status} />
          ) : (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.badge ?? "Free"}
            </span>
          )}
        </div>
        <h3 className="mt-4 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
          {product.name}
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {product.tagline}
        </p>
        {product.ctaLabel ? (
          <p className="mt-4 text-sm font-medium text-foreground">
            {product.ctaLabel}
            <span className="text-muted-foreground"> →</span>
          </p>
        ) : null}
      </Card>
    </Link>
  );
}
