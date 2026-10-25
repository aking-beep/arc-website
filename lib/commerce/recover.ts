/**
 * The address a buyer types to get their download again.
 *
 * Lowercased so the lookup matches however Paddle stored it.
 *
 * An earlier version rejected any address containing `%`, `_` or `*`, because
 * the lookup is a PostgREST `ilike` filter and those are wildcards there.
 * That locked out real buyers: `_` is legal and common in a local part
 * (first_last@company.com), and such an address paid for a playbook and then
 * could not recover its download. The wildcards are escaped at the query
 * instead — see `escapeLikePattern` in lib/commerce/store.ts.
 */
export function normalizeBuyerEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

/** Shown for every well-formed request, whether or not a purchase exists. */
export const recoveryAcknowledgement =
  "If that address has a playbook purchase, we emailed a fresh download link.";
