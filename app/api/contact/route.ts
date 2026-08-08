import { NextResponse } from "next/server";
import { site } from "@/lib/content";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  stage?: string;
  message?: string;
  company_website?: string; // honeypot
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans never see this one.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const stage = (body.stage ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and work email are required." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "That email looks invalid." }, { status: 400 });
  }

  const subject = `ARC contact — ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    stage ? `Stage: ${stage}` : null,
    "",
    message || "(no message)",
  ]
    .filter((line) => line !== null)
    .join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL || "ARC Website <onboarding@resend.dev>";

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json(
        { error: "Could not send message. Try emailing us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  }

  // No Resend key — still succeed so the UI works in local/preview,
  // and log so you can wire delivery later.
  console.info("[contact] message received (no RESEND_API_KEY configured)", {
    name,
    email,
    company,
    stage,
    message,
  });

  return NextResponse.json({
    ok: true,
    warning:
      "Message logged. Set RESEND_API_KEY to deliver email in production.",
  });
}
