import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { SuccessDownload } from "@/components/playbook/success-download";
import { PanelLabel } from "@/components/diagram";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/section";
import {
  fetchTransaction,
  isPaid,
  looksLikeTransactionId,
  withinSuccessWindow,
} from "@/lib/commerce/paddle-api";
import { site } from "@/lib/content";
import { playbookIncludes, playbookProduct } from "@/lib/playbook";

export const metadata: Metadata = {
  title: "Your Playbook is ready",
  // A thank-you page has no search value and can carry a transaction id.
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { _ptxn?: string };
}) {
  // Paddle appends _ptxn to the success URL. It is a hint about which
  // transaction to ask about, never evidence that anything was paid.
  const transactionId = searchParams._ptxn;
  const confirmed = await confirmPurchase(transactionId);

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Thank you
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Your Playbook is ready.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We have emailed your download link to the address you used at checkout. It
          works on more than one device, and there is nothing to log into.
        </p>

        <Card className="mt-10 flex items-start gap-4 p-6">
          <Mail className="mt-0.5 h-5 w-5 flex-none text-muted-foreground" aria-hidden />
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Check your inbox
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The email arrives within a minute or two. If it is not there, check spam,
              then{" "}
              <a
                className="font-medium text-foreground underline underline-offset-4"
                href={`mailto:${site.email}?subject=${encodeURIComponent(`${playbookProduct.name} download`)}`}
              >
                email us
              </a>{" "}
              and we will send it again. Keep it — the link is also how you get updates
              to this edition.
            </p>
          </div>
        </Card>

        {/*
          The button only appears once Paddle itself has confirmed the
          transaction is paid, server-side. Arriving at this URL proves
          nothing, so without that confirmation the page is a thank-you and the
          email is the way in.
        */}
        {confirmed ? (
          <div className="mt-6">
            <SuccessDownload transactionId={confirmed} />
          </div>
        ) : null}

        <Card className="mt-6 p-6">
          <PanelLabel>What you bought</PanelLabel>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {playbookIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <p className="mt-10 border-t border-border/60 pt-6 text-sm leading-relaxed text-muted-foreground">
          Start with module 02 if you only have an hour.{" "}
          <Link href="/playbook" className="underline underline-offset-4">
            Back to the Playbook
          </Link>
        </p>
      </div>
    </Container>
  );
}

/** Returns the transaction id only when Paddle confirms the payment. */
async function confirmPurchase(
  transactionId: string | undefined,
): Promise<string | null> {
  if (!looksLikeTransactionId(transactionId)) return null;

  const result = await fetchTransaction(transactionId);
  if (!result.ok) return null;
  if (!isPaid(result.transaction)) return null;
  if (!withinSuccessWindow(result.transaction)) return null;

  return result.transaction.id;
}
