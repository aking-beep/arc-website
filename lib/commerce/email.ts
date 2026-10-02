// ============================================================================
// The purchase email.
//
// Raw fetch against Resend, matching /api/contact, and graceful when
// RESEND_API_KEY is absent so local and preview environments still work.
//
// One rule, and it is the reason the download link is a token path rather
// than a query string: the buyer's email address never appears in a URL.
// ============================================================================

import "server-only";

import { emailConfig, siteUrl } from "@/lib/commerce/config";
import { playbookIncludes, playbookProduct } from "@/lib/playbook";

export type SendResult =
  | { ok: true; skipped?: false; id: string | null }
  | { ok: true; skipped: true; reason: string }
  | { ok: false; detail: string };

export function downloadUrl(token: string): string {
  return `${siteUrl()}/playbook/download/${token}`;
}

export async function sendPurchaseEmail({
  to,
  token,
  transactionId,
}: {
  to: string;
  token: string;
  transactionId: string;
}): Promise<SendResult> {
  const config = emailConfig();
  const link = downloadUrl(token);

  if (!config.configured) {
    // Log the transaction, never the token: server logs are read by more
    // people than should be able to download the product.
    console.info("[playbook] purchase email skipped, email not configured", {
      transactionId,
      missing: config.missing,
    });
    return { ok: true, skipped: true, reason: `missing ${config.missing.join(", ")}` };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [to],
        ...(config.replyTo ? { reply_to: config.replyTo } : {}),
        subject: `Your ${playbookProduct.name} download`,
        text: plainText(link),
        html: html(link),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[playbook] purchase email failed", { transactionId, detail });
      return { ok: false, detail };
    }

    const payload = (await response.json()) as { id?: string };
    return { ok: true, id: payload.id ?? null };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[playbook] purchase email threw", { transactionId, detail });
    return { ok: false, detail };
  }
}

function plainText(link: string): string {
  return [
    `${playbookProduct.name} — ${playbookProduct.subtitle}`,
    "",
    "Thanks for buying the Playbook. Your download link is below. It works on",
    "more than one device and there is nothing to log into.",
    "",
    link,
    "",
    "In the bundle:",
    ...playbookIncludes.map((item) => `  - ${item}`),
    "",
    "Keep this email. The link is how you get updates to this edition.",
    "",
    "Start with module 02 if you only have an hour. Validation and evaluation",
    "are where most AI products are weakest.",
    "",
    `${playbookProduct.publisher} · ${playbookProduct.imprint}`,
  ].join("\n");
}

/**
 * Deliberately plain HTML. Inline styles only, no external CSS and no images,
 * because email clients strip all three and a receipt that renders as a wall
 * of broken boxes is worse than one that renders as text.
 */
function html(link: string): string {
  const items = playbookIncludes
    .map(
      (item) =>
        `<li style="margin:0 0 6px;">${escapeHtml(item)}</li>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f7f8;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#16191c;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e3e8ea;border-radius:10px;padding:32px;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#55606a;">
      ${escapeHtml(playbookProduct.publisher)} &middot; ${escapeHtml(playbookProduct.imprint)}
    </p>
    <h1 style="margin:0 0 4px;font-size:22px;line-height:1.25;">${escapeHtml(playbookProduct.name)}</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#0a6e7c;">${escapeHtml(playbookProduct.subtitle)}</p>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
      Thanks for buying the Playbook. Your download link is below. It works on more
      than one device, and there is nothing to log into.
    </p>

    <p style="margin:0 0 24px;">
      <a href="${escapeHtml(link)}"
         style="display:inline-block;background:#0a6e7c;color:#ffffff;text-decoration:none;
                padding:12px 22px;border-radius:6px;font-size:15px;font-weight:600;">
        Download the Playbook
      </a>
    </p>

    <p style="margin:0 0 8px;font-size:14px;font-weight:600;">In the bundle</p>
    <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.6;color:#39424a;">
      ${items}
    </ul>

    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#39424a;">
      Keep this email — the link is also how you get updates to this edition. If you
      only have an hour, start with module 02. Validation and evaluation are where
      most AI products are weakest.
    </p>

    <p style="margin:0;padding-top:20px;border-top:1px solid #e3e8ea;font-size:12px;line-height:1.6;color:#6b757d;">
      If the button does not work, paste this into your browser:<br>
      <span style="word-break:break-all;">${escapeHtml(link)}</span>
    </p>
  </div>
</body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
