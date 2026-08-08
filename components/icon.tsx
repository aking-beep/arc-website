import {
  FlaskConical,
  Compass,
  LayoutDashboard,
  LineChart,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  FlaskConical,
  Compass,
  LayoutDashboard,
  LineChart,
  GraduationCap,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = icons[name] ?? Compass;
  return <Cmp className={className} aria-hidden />;
}
