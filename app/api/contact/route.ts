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

// Length caps. The client can be bypassed, so we clamp again here to block
// oversized payloads and abuse. Email cap is RFC 5321's 254 chars.
const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  stage: 200,
  message: 5000,
} as const;

function clean(value: string | undefined, max: number) {
  return (value ?? "").trim().slice(0, max);
}

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

  // Honeypot - bots fill hidden fields; humans never see this one.
  // Accept-and-drop so bots get no signal that they were caught.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const stage = clean(body.stage, LIMITS.stage);
  const message = clean(body.message, LIMITS.message);

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and work email are required." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "That email looks invalid." }, { status: 400 });
  }

  const subject = `ARC contact · ${name}${company ? ` (${company})` : ""}`;
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

  // No Resend key - still succeed so the UI works in local/preview,
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

// Any method other than POST gets a clean 405 - no stack traces, no surface.
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
