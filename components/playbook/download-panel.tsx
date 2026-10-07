"use client";

import * as React from "react";
import { Download, FileText, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

type FileKey = "pdf" | "zip";

const files: {
  key: FileKey;
  name: string;
  text: string;
  icon: typeof FileText;
}[] = [
  {
    key: "pdf",
    name: "The Playbook (PDF)",
    text: "The full Playbook, print-ready: the sequence from idea to a product in use.",
    icon: FileText,
  },
  {
    key: "zip",
    name: "Editable assets (ZIP)",
    text: "Skills, architectures, workflow templates, and the product, evaluation, security, and launch worksheets as editable files.",
    icon: Package,
  },
];

/**
 * Asks the server for a short-lived signed URL, then navigates to it.
 *
 * The signed URL is never rendered into the page and never stored. It is
 * requested at the moment of the click and used immediately, so there is no
 * window in which a live download link is sitting in the DOM for an extension
 * or a screenshot to pick up.
 */
export function DownloadPanel({ token }: { token: string }) {
  const [busy, setBusy] = React.useState<FileKey | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    trackEvent("playbook_download_view", { status: "valid" });
  }, []);

  async function download(file: FileKey) {
    if (busy) return;
    setBusy(file);
    setError(null);
    trackEvent("playbook_download_start", { file });

    try {
      const response = await fetch("/api/playbook/download", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, file }),
      });

      const payload = (await response.json()) as {
        url?: string;
        error?: string;
        reason?: string;
      };

      if (!response.ok || !payload.url) {
        setError(payload.error ?? "Something went wrong. Try again in a moment.");
        trackEvent("playbook_download_error", {
          file,
          reason: payload.reason ?? String(response.status),
        });
        return;
      }

      trackEvent("playbook_download_success", { file });
      window.location.href = payload.url;
    } catch {
      setError("Something went wrong. Check your connection and try again.");
      trackEvent("playbook_download_error", { file, reason: "network" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {files.map((file) => (
          <Card key={file.key} className="flex flex-col p-6">
            <file.icon className="h-5 w-5 text-muted-foreground" aria-hidden />
            <h2 className="mt-4 text-base font-semibold tracking-tight">{file.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {file.text}
            </p>
            <Button
              className="mt-5"
              onClick={() => download(file.key)}
              disabled={busy !== null}
            >
              <Download className="h-4 w-4" aria-hidden />
              {busy === file.key ? "Preparing…" : "Download"}
            </Button>
          </Card>
        ))}
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-md border border-border bg-muted/50 px-4 py-3 text-sm text-foreground"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
