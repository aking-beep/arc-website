import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { type Pillar } from "@/lib/content";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link href={pillar.href} className="group block h-full">
      <Card className="flex h-full flex-col p-6 transition-all hover:border-foreground/20 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-foreground">
            <Icon name={pillar.icon} className="h-5 w-5" />
          </span>
        </div>
        <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
          {pillar.name}
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {pillar.kicker}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {pillar.detail}
        </p>
      </Card>
    </Link>
  );
}
