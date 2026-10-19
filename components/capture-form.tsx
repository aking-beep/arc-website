"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

/**
 * One field, one button.
 *
 * The scan runs free and complete before this appears — the email buys the
 * permanent link and the PDF, not the result. That distinction is the whole
 * reason this does not break the "no email gate" promise the free frameworks
 * make, and the copy says it out loud rather than relying on the reader to
 * notice.
 */
export function CaptureForm({
  topic,
  label = "Email me this report",
  note = "One email with the report. No list, no drip campaign, and we do not pass it on.",
}: {
  topic: string;
  label?: string;
  note?: string;
}) {
  const [sent, setSent] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fieldId = React.useId();
  const errorId = `${fieldId}-error`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "capture",
          email: data.get("email"),
          topic,
          company_website: data.get("company_website"),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(payload.error || "Could not send that. Try again in a moment.");
        return;
      }

      trackEvent("report_email_captured", { topic });
      setSent(true);
      form.reset();
    } catch {
      setError("Network error. Try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <p
        role="status"
        className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed"
      >
        On its way. A person sends it, so give it a few minutes.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <label htmlFor={fieldId} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={fieldId}
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="you@company.com"
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-1"
        />
        <Button type="submit" disabled={pending} className="sm:flex-none">
          {pending ? "Sending…" : "Send it"}
        </Button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
      <p className="text-xs leading-relaxed text-muted-foreground">{note}</p>
    </form>
  );
}
