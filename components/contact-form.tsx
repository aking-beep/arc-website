"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const stageOptions = [
  "Discover: we have a hunch, not a plan yet.",
  "Align: we know the problem, need a strategy.",
  "Deliver: ready to build and ship.",
  "Measure: already shipped, need to prove outcomes.",
  "Sustain: it works, now we need it to keep working.",
  "Honestly not sure. That's why we're reaching out.",
];

export function ContactForm({
  topic,
  defaultMessage,
}: {
  topic?: string;
  defaultMessage?: string;
}) {
  const [sent, setSent] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const formId = React.useId();
  const stageId = `${formId}-stage`;
  const messageId = `${formId}-message`;

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
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          stage: data.get("stage"),
          topic,
          message: data.get("message"),
          company_website: data.get("company_website"),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setError(payload.error || "Something went wrong. Try emailing us directly.");
        return;
      }

      setSent(true);
      form.reset();
    } catch {
      setError("Network error. Try emailing us directly.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-lg border border-border bg-muted/40 p-8 text-center">
        <h3 className="text-lg font-semibold">Thanks. Message received.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A person writes back within one business day. No marketing list, no
          drip campaign.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required maxLength={120} autoComplete="name" />
        <Field
          label="Work email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
        />
      </div>
      <Field label="Company" name="company" maxLength={160} />

      <div>
        <label htmlFor={stageId} className="mb-1.5 block text-sm font-medium">
          Which stage best describes where you are?
        </label>
        <select
          id={stageId}
          name="stage"
          defaultValue=""
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <option value="" disabled>
            Optional: helps us prep for the call.
          </option>
          {stageOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={messageId} className="mb-1.5 block text-sm font-medium">
          What&rsquo;s on your mind?
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          maxLength={5000}
          defaultValue={defaultMessage}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send →"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        No marketing list, no drip campaign. A person replies.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
}) {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? <span className="text-muted-foreground"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
    </div>
  );
}
