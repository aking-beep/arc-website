/**
 * The address a buyer types to get their download again.
 *
 * Lowercased so the lookup matches however Paddle stored it.
 *
 * An earlier version rejected any address containing `%`, `_` or `*`, because
 * the lookup is a PostgREST `ilike` filter and those are wildcards there.
 * That locked out real buyers: `_` is legal and common in a local part
 * (first_last@company.com), and such an address paid for a playbook and then
 * could not recover its download. `_` and `%` are escaped at the query
 * instead — see `escapeLikePattern` in lib/commerce/store.ts.
 *
 * `*` is still refused, and cannot be escaped the same way: PostgREST rewrites
 * `*` to `%` while parsing the filter value, before SQL sees it, so a
 * backslash in front of it is simply dropped. An accepted `*` would therefore
 * search a wider pattern than the address typed — and because the token is
 * minted against whichever purchase that pattern matches while the mail goes
 * to the address as typed, it could create an entitlement token against
 * someone else's purchase and spend one of their recovery links. No mail
 * provider issues a local part containing `*`, so refusing it costs nothing
 * real; accepting it silently would not.
 */
export function normalizeBuyerEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (email.includes("*")) return null;
  return email;
}

/** Shown for every well-formed request, whether or not a purchase exists. */
export const recoveryAcknowledgement =
  "If that address has a playbook purchase, we emailed a fresh download link.";
