/**
 * The address a buyer types to get their download again.
 *
 * Lowercased so the lookup matches however Paddle stored it. Percent, star,
 * and underscore are rejected because the lookup is a case-insensitive match
 * and those characters are wildcards there.
 */
export function normalizeBuyerEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (/[%_*]/.test(email)) return null;
  return email;
}

/** Shown for every well-formed request, whether or not a purchase exists. */
export const recoveryAcknowledgement =
  "If that address has a playbook purchase, we emailed a fresh download link.";
