import {
  Boxes,
  FlaskConical,
  Compass,
  LayoutDashboard,
  Layers,
  LineChart,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons = {
  Boxes,
  FlaskConical,
  Compass,
  LayoutDashboard,
  Layers,
  LineChart,
  GraduationCap,
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
