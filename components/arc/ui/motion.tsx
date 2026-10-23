"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Wraps the animated sections so they honour `prefers-reduced-motion`.
 *
 * framer-motion animates through inline styles and the Web Animations API, so
 * the `prefers-reduced-motion` block in app/globals.css — which only reaches
 * CSS animations and transitions — cannot stop it. `reducedMotion="user"`
 * does, by holding every animation at its end state.
 *
 * This lives in its own component rather than in the root layout so
 * framer-motion stays out of the bundle for the routes that do not animate.
 */
export function ArcMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
