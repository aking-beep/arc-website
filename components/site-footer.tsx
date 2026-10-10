"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { Brand } from "@/components/brand";
import { ark } from "@/lib/ark";
import { arkProducts } from "@/lib/ark";
import { site } from "@/lib/content";
import { isOfferPath } from "@/lib/offer";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Modernize", href: "/services/modernize" },
      { label: "Automate", href: "/services/automate" },
      { label: "Build", href: "/services/build" },
      { label: "Operate", href: "/services/operate" },
      { label: "How we engage", href: "/advisory" },
    ],
  },
  {
    heading: "Agent infrastructure",
    links: [
      ...arkProducts.map((p) => ({ label: p.name, href: `/${p.slug}` })),
      { label: "For developers", href: "/developers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Define · $5", href: "/playbook/define" },
      { label: "Build · $10", href: "/playbook/build" },
      { label: "Ship · $20", href: "/playbook/ship" },
      { label: "Free frameworks", href: "/playbooks" },
      { label: "Labs", href: "/labs" },
      { label: "Research", href: "/research" },
      { label: "Workshops", href: "/academy" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: site.github },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  const offer = isOfferPath(usePathname());

  if (offer) {
    return (
      <footer className="border-t border-border/60">
        <div className="container flex flex-col items-start justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/playbook" className="hover:text-foreground">
              Full playbook pages
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <p className="mt-4 border-l-2 border-brand pl-3 text-sm leading-relaxed text-muted-foreground">
              {ark.explainer}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {column.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => {
                  const external =
                    link.href.startsWith("http") || link.href.startsWith("mailto:");
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex items-center gap-4">
            <span>{ark.principle}</span>
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
