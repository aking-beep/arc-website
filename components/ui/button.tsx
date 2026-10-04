import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "glass"
  | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-lift hover:-translate-y-0.5 hover:shadow-xl",
  secondary: "bg-accent text-accent-foreground hover:bg-accent/70",
  outline:
    "ring-1 ring-inset ring-border bg-card/60 hover:bg-card hover:shadow-sm",
  ghost: "bg-transparent hover:bg-accent/60",
  // Sits on photography. Reads as a control without punching a hole in the image.
  glass: "glass text-on-image hover:bg-on-image/20",
  /*
   * The one bright element on a dark photograph. Its colour is fixed rather
   * than themed, because the surface underneath is a picture in both themes.
   */
  light:
    "bg-[hsl(76_30%_97%)] text-[hsl(165_40%_8%)] shadow-lift hover:-translate-y-0.5 hover:shadow-xl",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
};

/* Fully round. A 6px radius on a button is the default nobody chose. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as { href: string } & Omit<
      React.ComponentProps<typeof Link>,
      "href" | "className"
    >;
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
