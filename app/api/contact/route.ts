import { NextResponse } from "next/server";
import { clampField, isValidEmail, type InquiryField } from "@/lib/arc/contact-payload";

export const runtime = "nodejs";

/**
 * The redesigned three-step inquiry form collects six fields the original
 * single-step form did not: `type`, `role`, `size`, `budget`, `timeline` and
 * `technical`. They are accepted here, clamped server-side like everything
 * else, and added to the notification email.
 *
 * `stage` and `topic` still work, so `components/contact-form.tsx` and the
 * `?topic=` deep links elsewhere on the site are unaffected.
 */
type ContactPayload = Partial<Record<InquiryField, string>> & {
  company_website?: string; // honeypot
};

/** Order the notification email reads in. */
const EMAIL_FIELDS: { key: InquiryField; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "company", label: "Company" },
  { key: "role", label: "Role" },
  { key: "size", label: "Company size" },
  { key: "type", label: "Project type" },
  { key: "topic", label: "Topic" },
  { key: "stage", label: "Stage" },
  { key: "budget", label: "Budget" },
  { key: "timeline", label: "Timeline" },
];

export async function POST(request: Request) {
  // Only accept JSON. Anything else is almost certainly not our form.
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans never see this one.
  // Accept-and-drop so bots get no signal that they were caught.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const fields = Object.fromEntries(
    (
      [
        "name",
        "email",
        "company",
        "role",
        "size",
        "budget",
        "timeline",
        "stage",
        "topic",
        "type",
        "message",
        "technical",
      ] as InquiryField[]
    ).map((key) => [key, clampField(body[key], key)]),
  ) as Record<InquiryField, string>;

  if (!fields.name || !fields.email) {
    return NextResponse.json(
      { error: "Name and work email are required." },
      { status: 400 },
    );
  }
  if (!isValidEmail(fields.email)) {
    return NextResponse.json({ error: "That email looks invalid." }, { status: 400 });
  }

  const label = fields.type || fields.topic;
  const subject = `ARC inquiry${label ? ` · ${label}` : ""} · ${fields.name}${
    fields.company ? ` (${fields.company})` : ""
  }`;

  const text = [
    ...EMAIL_FIELDS.filter(({ key }) => fields[key]).map(
      ({ key, label: l }) => `${l}: ${fields[key]}`,
    ),
    "",
    fields.message || "(no message)",
    ...(fields.technical ? ["", "--- Technical requirements ---", fields.technical] : []),
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  // No fallback to a hard-coded address: the recipient is configuration, and
  // an address in the repository would ship to the browser via `site`.
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "ARC Website <onboarding@resend.dev>";

  if (resendKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json(
        { error: "Could not send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  }

  // Not configured to deliver — still succeed so the UI works in local and
  // preview, and log so nothing a visitor sent is silently dropped.
  const missing = [
    resendKey ? null : "RESEND_API_KEY",
    to ? null : "CONTACT_TO_EMAIL",
  ].filter(Boolean);
  console.info(`[contact] message received (missing ${missing.join(", ")})`, {
    ...fields,
    message: fields.message.slice(0, 200),
  });

  return NextResponse.json({
    ok: true,
    warning: `Message logged. Set ${missing.join(" and ")} to deliver email.`,
  });
}

// Any method other than POST gets a clean 405 — no stack traces, no surface.
function methodNotAllowed() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export function GET() {
  return methodNotAllowed();
}

export function PUT() {
  return methodNotAllowed();
}

export function PATCH() {
  return methodNotAllowed();
}

export function DELETE() {
  return methodNotAllowed();
}
