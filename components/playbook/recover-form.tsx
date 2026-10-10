"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { recoveryAcknowledgement } from "@/lib/commerce/recover";

export function RecoverForm() {
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/playbook/recover", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          company_website: data.get("company_website"),
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };
      if (!response.ok) {
        setError(payload.error || "Something went wrong. Try again shortly.");
        return;
      }
      setMessage(payload.message || recoveryAcknowledgement);
      setEmail("");
    } catch {
      setError("Something went wrong. Try again shortly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="recover-email">
          Email address used at checkout
        </label>
        <input
          id="recover-email"
          name="email"
          type="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Email my download link"}
      </Button>
      {message ? (
        <p className="text-sm leading-relaxed text-muted-foreground" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
