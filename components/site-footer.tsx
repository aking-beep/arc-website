import Link from "next/link";
import { Github } from "lucide-react";
import { Brand } from "@/components/brand";
import { pillars, site } from "@/lib/content";

const resources = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Privacy", href: "/privacy" },
  { label: "Book a call", href: site.calendly },
  { label: "Email us", href: `mailto:${site.email}` },
  { label: "GitHub", href: site.github },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Ecosystem</h4>
            <ul className="mt-4 space-y-2.5">
              {pillars.map((p) => (
                <li key={p.id}>
                  <Link
                    href={p.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {resources.map((r) => {
                const external =
                  r.href.startsWith("http") || r.href.startsWith("mailto:");
                return (
                  <li key={r.label}>
                    {external ? (
                      <a
                        href={r.href}
                        target={r.href.startsWith("http") ? "_blank" : undefined}
                        rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {r.label}
                      </a>
                    ) : (
                      <Link
                        href={r.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {r.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. Built honestly.
          </p>
          <div className="flex items-center gap-4">
            <span>Strategy that aligns. Work that delivers.</span>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
