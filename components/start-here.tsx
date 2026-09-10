import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { startHere } from "@/lib/content";
import { cn } from "@/lib/utils";

export function StartHere({ className }: { className?: string }) {
  return (
    <Section className={cn("scroll-mt-24", className)} id="start">
      <SectionHeading
        kicker="Start here"
        title="Three ways in. Pick the one that matches where you are."
        lead="You do not have to talk to anyone to get value out of ARC. Most people run a tool first and call us later, if at all."
      />
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {startHere.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <li key={item.step}>
              <Card className="flex h-full flex-col p-6">
                <span className="font-mono text-sm text-muted-foreground">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
                {external ? (
                  <a
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
                  >
                    {item.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all hover:gap-2.5"
                  >
                    {item.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </Card>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
