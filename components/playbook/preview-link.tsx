"use client";

import { trackEvent } from "@/lib/analytics";

/**
 * A link into the free preview. The click is the only thing this records;
 * the file itself is a static public PDF.
 */
export function PreviewLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent("playbook_preview_click", { target: href })}
    >
      {children}
    </a>
  );
}
