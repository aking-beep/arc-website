"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/content";
import { arkProducts } from "@/lib/ark";
import { Brand } from "@/components/brand";
import { MaturityBadge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const productRoutes = arkProducts.map((p) => `/${p.slug}`);

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (path === "/platform" && href.includes("#products")) {
    return productRoutes.some((r) => pathname === r);
  }
  if (path === "/about") {
    return ["/about", "/work", "/contact"].some((r) => pathname.startsWith(r));
  }
  return pathname === path || pathname.startsWith(path + "/");
}

function ProductMenu() {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Products
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 w-[22rem] pt-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {arkProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-accent/60"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{p.name}</span>
                  <MaturityBadge maturity={p.maturity} />
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {p.tagline}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) =>
            item.label === "Products" ? (
              <ProductMenu key={item.label} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(pathname, item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button href="/ark-control" variant="outline" size="sm" className="hidden xl:inline-flex">
            Explore ARK Control
          </Button>
          <Button href="/agent-readiness" size="sm">
            Assess agent readiness
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border/60 bg-background lg:hidden">
          <nav className="container flex flex-col py-4">
            <p className="px-2 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Products
            </p>
            {arkProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 text-sm font-medium hover:bg-accent/60"
              >
                {p.name}
                <MaturityBadge maturity={p.maturity} />
              </Link>
            ))}
            <p className="mt-4 px-2 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Company
            </p>
            {nav
              .filter((item) => item.label !== "Products")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            <Button href="/agent-readiness" className="mt-4">
              Assess agent readiness
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
