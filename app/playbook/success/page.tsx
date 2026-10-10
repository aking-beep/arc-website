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
import { playbookSlugForPriceId } from "@/lib/commerce/config";
import { site } from "@/lib/content";
import { getPlaybookTier, playbookPublisher } from "@/lib/playbook";

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
  const tier = confirmed ? getPlaybookTier(confirmed.slug) : undefined;

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Thank you for your purchase
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {confirmed ? "Your playbook is ready." : "Check your email for the download."}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {confirmed
            ? `We emailed ${tier?.productName ?? "your playbook"} to the address you used at checkout. The link works on more than one device, and there is nothing to log into.`
            : "If the payment went through, the download link is in your inbox. This page only offers a download after Paddle confirms the payment."}
        </p>
        {confirmed ? (
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            Order reference {confirmed.id}
          </p>
        ) : null}

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
                href={`mailto:${site.email}?subject=${encodeURIComponent(`${tier?.productName ?? "Playbook"} download`)}`}
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
            <SuccessDownload transactionId={confirmed.id} product={confirmed.slug} />
          </div>
        ) : null}

        {tier ? (
          <Card className="mt-6 p-6">
            <PanelLabel>{tier.productName}</PanelLabel>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {tier.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ) : (
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            The email names which playbook you bought. {playbookPublisher} sells
            Define, Build, and Ship as separate downloads.
          </p>
        )}

        <p className="mt-10 border-t border-border/60 pt-6 text-sm leading-relaxed text-muted-foreground">
          <Link href="/playbook" className="underline underline-offset-4">
            Explore all playbooks
          </Link>
          {" · "}
          <Link href="/playbook/recover" className="underline underline-offset-4">
            Email my download link
          </Link>
          {" · "}
          <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </div>
    </Container>
  );
}

/** Returns the transaction only when Paddle confirms a payment for one of our playbooks. */
async function confirmPurchase(
  transactionId: string | undefined,
): Promise<{ id: string; slug: NonNullable<ReturnType<typeof playbookSlugForPriceId>> } | null> {
  if (!looksLikeTransactionId(transactionId)) return null;

  const result = await fetchTransaction(transactionId);
  if (!result.ok) return null;
  if (!isPaid(result.transaction)) return null;
  if (!withinSuccessWindow(result.transaction)) return null;

  const slug = result.transaction.priceIds
    .map((id) => playbookSlugForPriceId(id))
    .find((value): value is NonNullable<typeof value> => value !== null);
  if (!slug) return null;

  return { id: result.transaction.id, slug };
}
