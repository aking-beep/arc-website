"use client";

import * as React from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * Fires playbook_view once per mount.
 *
 * The page itself stays a server component — this is the smallest possible
 * client island, so prerendering and the rest of the page are unaffected.
 */
export function PlaybookViewTracker({ source }: { source?: string } = {}) {
  const fired = React.useRef(false);

  React.useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent("playbook_view", { source });
  }, [source]);

  return null;
}
