import {
  Boxes,
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/** Compass is the fallback, so every other entry has to earn its place. */
const icons = {
  Boxes,
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = (icons as Record<string, LucideIcon>)[name] ?? Compass;
  return <Cmp className={className} aria-hidden />;
}
