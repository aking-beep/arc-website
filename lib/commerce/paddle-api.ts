// ============================================================================
// Server-side confirmation against the Paddle API.
//
// This exists for one reason: the success page needs to know whether a
// transaction was actually paid, and the only thing it is handed is a
// transaction id in a query string that anyone can type. Asking Paddle is the
// difference between proof of purchase and a URL parameter.
// ============================================================================

import "server-only";

import { paddleConfig } from "@/lib/commerce/config";

export type TransactionStatus =
  | "draft"
  | "ready"
  | "billed"
  | "paid"
  | "completed"
  | "canceled"
  | "past_due";

export type ConfirmedTransaction = {
  id: string;
  status: TransactionStatus;
  email: string | null;
  priceIds: string[];
  billedAt: string | null;
};

export type ConfirmResult =
  | { ok: true; transaction: ConfirmedTransaction }
  | { ok: false; reason: "unconfigured" | "not_found" | "error"; detail: string };

/** Paddle transaction ids look like `txn_01h...`. Reject anything else early. */
export function looksLikeTransactionId(value: unknown): value is string {
  return typeof value === "string" && /^txn_[a-z0-9]{10,40}$/i.test(value);
}

export async function fetchTransaction(id: string): Promise<ConfirmResult> {
  const paddle = paddleConfig();
  if (!paddle.configured) {
    return { ok: false, reason: "unconfigured", detail: paddle.missing.join(", ") };
  }
  if (!looksLikeTransactionId(id)) {
    return { ok: false, reason: "not_found", detail: "malformed transaction id" };
  }

  try {
    const response = await fetch(`${paddle.apiBase}/transactions/${id}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${paddle.apiKey}`,
        "content-type": "application/json",
      },
    });

    if (response.status === 404) {
      return { ok: false, reason: "not_found", detail: "no such transaction" };
    }
    if (!response.ok) {
      return {
        ok: false,
        reason: "error",
        detail: `${response.status} ${await response.text()}`,
      };
    }

    const payload = (await response.json()) as { data?: Record<string, unknown> };
    const data = payload.data;
    if (!data || typeof data.id !== "string") {
      return { ok: false, reason: "error", detail: "unexpected response shape" };
    }

    const customer = data.customer as { email?: unknown } | undefined;
    const items = Array.isArray(data.items) ? data.items : [];

    return {
      ok: true,
      transaction: {
        id: data.id,
        status: String(data.status ?? "") as TransactionStatus,
        email:
          typeof data.customer_email === "string"
            ? data.customer_email
            : typeof customer?.email === "string"
              ? customer.email
              : null,
        priceIds: items
          .map((item) => {
            const price = (item as { price?: { id?: unknown } }).price;
            return typeof price?.id === "string" ? price.id : null;
          })
          .filter((value): value is string => value !== null),
        billedAt: typeof data.billed_at === "string" ? data.billed_at : null,
      },
    };
  } catch (error) {
    return {
      ok: false,
      reason: "error",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * How long after payment the success page will still hand out a download.
 *
 * The emailed token is the durable way in; this path only has to cover the
 * minutes between paying and reading the email. Keeping the window short
 * bounds what a leaked transaction id — which travels in a URL — is worth.
 */
export const SUCCESS_DOWNLOAD_WINDOW_HOURS = 24;

export function withinSuccessWindow(
  transaction: ConfirmedTransaction,
  now: Date = new Date(),
): boolean {
  if (!transaction.billedAt) return false;
  const billedAt = new Date(transaction.billedAt);
  if (Number.isNaN(billedAt.getTime())) return false;
  const hours = (now.getTime() - billedAt.getTime()) / 3_600_000;
  return hours >= 0 && hours <= SUCCESS_DOWNLOAD_WINDOW_HOURS;
}

/** Paddle treats both as paid; `completed` just means fulfilment ran too. */
export function isPaid(transaction: ConfirmedTransaction): boolean {
  return transaction.status === "completed" || transaction.status === "paid";
}
