// ============================================================================
// Best-effort rate limiting for the sensitive endpoints.
//
// In-memory, fixed window, per serverless instance. Be clear about what that
// is and is not: it will not stop a distributed attack, because a request that
// lands on a cold instance starts from zero. It does stop the realistic abuse
// — one script hammering one token or one IP — at a cost of zero dependencies
// and zero latency.
//
// The durable protection is elsewhere and does not depend on this: the
// download count is incremented in Postgres, so a hard limit per entitlement
// is enforced regardless of which instance served the request.
//
// If this ever needs to hold across instances, the change is to swap the Map
// for Upstash or Supabase; the call sites do not change.
// ============================================================================

import "server-only";

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

/** Bound the map so a flood of distinct keys cannot grow it without limit. */
const MAX_TRACKED_KEYS = 10_000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. Sent as Retry-After when blocked. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number },
  now: number = Date.now(),
): RateLimitResult {
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    if (windows.size >= MAX_TRACKED_KEYS) sweep(now);
    windows.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, remaining: limit - 1, retryAfter: windowSeconds };
  }

  existing.count += 1;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfter,
  };
}

function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
  // Still full of live windows: drop the oldest rather than stop limiting.
  if (windows.size >= MAX_TRACKED_KEYS) {
    const oldest = [...windows.entries()]
      .sort((a, b) => a[1].resetAt - b[1].resetAt)
      .slice(0, Math.floor(MAX_TRACKED_KEYS / 4));
    for (const [key] of oldest) windows.delete(key);
  }
}

/**
 * Proxies append to x-forwarded-for, so the client is the first entry. On
 * Vercel this is set by the platform and cannot be spoofed past the edge; off
 * Vercel treat it as a hint, which is all a fixed-window limiter needs.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Exported for tests, which need a clean slate between cases. */
export function resetRateLimits() {
  windows.clear();
}
