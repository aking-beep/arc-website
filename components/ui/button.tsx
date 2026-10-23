import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

/**
 * The button used by the routes that have not been rebuilt on the new
 * layouts. Variants restyled onto the Magic Patterns palette so a button on
 * /playbook matches one on /control.
 *
 * `text-canvas` rather than `text-white`: ink inverts in dark mode.
 */
const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-ink-2",
  secondary: "bg-paper text-ink hover:bg-line/60",
  outline: "border border-line-strong bg-canvas text-ink hover:border-ink hover:bg-paper",
  ghost: "bg-transparent text-ink hover:bg-paper",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13.5px]",
  md: "h-11 px-5 text-[14.5px]",
  lg: "h-12 px-6 text-[15.5px]",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50";

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
          {href.startsWith("http") ? (
            <span className="sr-only"> (opens in a new tab)</span>
          ) : null}
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
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
