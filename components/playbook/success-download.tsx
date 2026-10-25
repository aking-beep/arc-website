"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { requestSuccessDownload } from "@/app/playbook/success/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

type FileKey = "pdf" | "zip";

/**
 * Immediate download for a buyer who has not opened their email yet.
 *
 * The transaction id is all this holds. Every click re-confirms the purchase
 * with Paddle on the server before any URL is signed, so this component has
 * no authority of its own.
 */
export function SuccessDownload({
  transactionId,
  product,
}: {
  transactionId: string;
  product: string;
}) {
  const [busy, setBusy] = React.useState<FileKey | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    trackEvent("playbook_purchase_complete", {
      product,
      transaction_id: transactionId,
    });
  }, [product, transactionId]);

  async function download(file: FileKey) {
    if (busy) return;
    setBusy(file);
    setError(null);
    trackEvent("playbook_download_start", { file });

    try {
      const result = await requestSuccessDownload(transactionId, file);
      if (!result.ok) {
        setError(result.message);
        trackEvent("playbook_download_error", { file, reason: "not_confirmed" });
        return;
      }
      trackEvent("playbook_download_success", { file });
      window.location.href = result.url;
    } catch {
      setError("Something went wrong. Your email link still works.");
      trackEvent("playbook_download_error", { file, reason: "network" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <Card className="p-6 ring-1 ring-brand/20">
      <h2 className="text-base font-semibold tracking-tight">
        Or download it right now
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Your purchase is confirmed, so you do not have to wait for the email.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => download("pdf")} disabled={busy !== null}>
          <Download className="h-4 w-4" aria-hidden />
          {busy === "pdf" ? "Preparing…" : "Download your playbook"}
        </Button>
        <Button
          variant="outline"
          onClick={() => download("zip")}
          disabled={busy !== null}
        >
          <Download className="h-4 w-4" aria-hidden />
          {busy === "zip" ? "Preparing…" : "Editable assets (ZIP)"}
        </Button>
      </div>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-foreground">
          {error}
        </p>
      ) : null}
    </Card>
  );
}
