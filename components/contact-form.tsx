"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const stageOptions = [
  "Discover — we have a hunch, not a plan yet.",
  "Align — we know the problem, need a strategy.",
  "Deliver — ready to build and ship something real.",
  "Measure — already shipped, need to prove outcomes.",
  "Sustain — it works, now we need it to keep working.",
  "Honestly not sure. That's why we're reaching out.",
];

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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
      <div className="rounded-lg border border-border bg-muted/40 p-8 text-center">
        <h3 className="text-lg font-semibold">Thanks — message received.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A real human writes back within one business day. No marketing list, no
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
        <Field label="Your name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
      </div>
      <Field label="Company" name="company" />

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Which stage best describes where you are?
        </label>
        <select
          name="stage"
          defaultValue=""
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="" disabled>
            Optional — helps us prep for the call.
          </option>
          {stageOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          What&rsquo;s on your mind?
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
        No marketing list. No drip campaign. Just a real reply from a real person.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? <span className="text-muted-foreground"> *</span> : null}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
