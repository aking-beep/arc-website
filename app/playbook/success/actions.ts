"use server";

import { paddleConfig } from "@/lib/commerce/config";
import {
  fetchTransaction,
  isPaid,
  looksLikeTransactionId,
  withinSuccessWindow,
} from "@/lib/commerce/paddle-api";
import { rateLimit } from "@/lib/commerce/rate-limit";
import { signBundleUrl, type BundleFile } from "@/lib/commerce/store";

export type SuccessDownloadResult =
  | { ok: true; url: string; filename: string }
  | { ok: false; message: string };

const GENERIC =
  "We could not confirm that purchase from this page. Use the link in your email, or contact us.";

/**
 * Issue a signed download from the success page.
 *
 * Proof of purchase here is a live call to the Paddle API confirming the
 * transaction is paid and is for our price — not the fact that the browser
 * arrived at this URL, and not a checkout event the client reported. That
 * distinction is the whole reason this is a server action.
 *
 * It is also time-boxed. The transaction id travels in a query string, so this
 * path stays open only for the window between paying and reading the email;
 * after that the emailed token is the way in.
 */
export async function requestSuccessDownload(
  transactionId: string,
  file: BundleFile,
): Promise<SuccessDownloadResult> {
  if (!looksLikeTransactionId(transactionId)) {
    return { ok: false, message: GENERIC };
  }

  const limit = rateLimit(`success-download:${transactionId}`, {
    limit: 10,
    windowSeconds: 60,
  });
  if (!limit.allowed) {
    return {
      ok: false,
      message: "Too many download requests. Wait a minute and try again.",
    };
  }

  const paddle = paddleConfig();
  if (!paddle.configured) {
    console.error({
      scope: "playbook.success",
      message: "download requested but Paddle is not configured",
      missing: paddle.missing,
    });
    return { ok: false, message: GENERIC };
  }

  const confirmed = await fetchTransaction(transactionId);
  if (!confirmed.ok) {
    console.warn({
      scope: "playbook.success",
      message: "could not confirm transaction",
      transactionId,
      reason: confirmed.reason,
    });
    return { ok: false, message: GENERIC };
  }

  const { transaction } = confirmed;

  if (!isPaid(transaction)) {
    console.info({
      scope: "playbook.success",
      message: "transaction is not paid",
      transactionId,
      status: transaction.status,
    });
    return { ok: false, message: GENERIC };
  }

  if (
    transaction.priceIds.length > 0 &&
    !transaction.priceIds.includes(paddle.priceId)
  ) {
    return { ok: false, message: GENERIC };
  }

  if (!withinSuccessWindow(transaction)) {
    return {
      ok: false,
      message:
        "This page can only issue a download shortly after purchase. Use the link in your email.",
    };
  }

  const signed = await signBundleUrl(file);
  if (!signed.ok) {
    console.error({
      scope: "playbook.success",
      message: "could not sign bundle url",
      transactionId,
      file,
      detail: signed.detail,
    });
    return {
      ok: false,
      message: "Downloads are temporarily unavailable. Your email link still works.",
    };
  }

  console.info({
    scope: "playbook.success",
    message: "download issued from success page",
    transactionId,
    file,
  });

  return { ok: true, url: signed.data.url, filename: signed.data.filename };
}
