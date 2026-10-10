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
import { getPlaybookTier, playbookPublisher, type PlaybookSlug } from "@/lib/playbook";

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
  slug,
  again = false,
}: {
  to: string;
  token: string;
  transactionId: string;
  slug: PlaybookSlug;
  /** A recovery link. The original purchase email is left as it was. */
  again?: boolean;
}): Promise<SendResult> {
  const config = emailConfig();
  const link = downloadUrl(token);
  const tier = getPlaybookTier(slug);
  if (!tier) {
    console.error("[playbook] purchase email skipped, unknown playbook", {
      transactionId,
      slug,
    });
    return { ok: false, detail: `unknown playbook ${slug}` };
  }

  if (!config.configured) {
    // Log the transaction, never the token: server logs are read by more
    // people than should be able to download the product.
    console.info("[playbook] purchase email skipped, email not configured", {
      transactionId,
      slug,
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
        subject: again
          ? `Your ${tier.productName} download link`
          : `Your ${tier.productName} download`,
        text: plainText(link, tier, again),
        html: html(link, tier, again),
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

function plainText(
  link: string,
  tier: NonNullable<ReturnType<typeof getPlaybookTier>>,
  again: boolean,
): string {
  return [
    `${tier.productName} — ${tier.subtitle}`,
    "",
    again
      ? "Here is a fresh download link for the playbook you already bought. It works on"
      : "Thanks for buying this playbook. Your download link is below. It works on",
    "more than one device and there is nothing to log into.",
    "",
    link,
    "",
    "In this download:",
    ...tier.includes.map((item) => `  - ${item}`),
    "",
    "Keep this email. The link is how you get updates to this edition.",
    "It covers this playbook only. The other two are separate purchases.",
    "",
    playbookPublisher,
  ].join("\n");
}

/**
 * Deliberately plain HTML. Inline styles only, no external CSS and no images,
 * because email clients strip all three and a receipt that renders as a wall
 * of broken boxes is worse than one that renders as text.
 */
function html(
  link: string,
  tier: NonNullable<ReturnType<typeof getPlaybookTier>>,
  again: boolean,
): string {
  const items = tier.includes
    .map(
      (item) =>
        `<li style="margin:0 0 6px;">${escapeHtml(item)}</li>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f7f8;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#16191c;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e3e8ea;border-radius:10px;padding:32px;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#55606a;">
      ${escapeHtml(playbookPublisher)}
    </p>
    <h1 style="margin:0 0 4px;font-size:22px;line-height:1.25;">${escapeHtml(tier.productName)}</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#0a6e7c;">${escapeHtml(tier.subtitle)}</p>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
      ${
        again
          ? "Here is a fresh download link for the playbook you already bought. It works on more than one device, and there is nothing to log into."
          : "Thanks for buying this playbook. Your download link is below. It works on more than one device, and there is nothing to log into."
      }
    </p>

    <p style="margin:0 0 24px;">
      <a href="${escapeHtml(link)}"
         style="display:inline-block;background:#0a6e7c;color:#ffffff;text-decoration:none;
                padding:12px 22px;border-radius:6px;font-size:15px;font-weight:600;">
        Download ${escapeHtml(tier.name)}
      </a>
    </p>

    <p style="margin:0 0 8px;font-size:14px;font-weight:600;">In this download</p>
    <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.6;color:#39424a;">
      ${items}
    </ul>

    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#39424a;">
      Keep this email. The link is also how you get updates to this edition.
      It covers this playbook only. The other two are separate purchases.
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
