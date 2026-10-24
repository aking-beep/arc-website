import type { Metadata } from "next";
import Link from "next/link";

import { DownloadPanel } from "@/components/playbook/download-panel";
import { PanelLabel } from "@/components/diagram";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/section";
import { playbookSlugForPriceId, supabaseConfig } from "@/lib/commerce/config";
import { findPurchaseByTokenHash, toEntitlement } from "@/lib/commerce/store";
import {
  checkEntitlement,
  hashToken,
  looksLikeToken,
  rejectionMessage,
  type TokenRejection,
} from "@/lib/commerce/tokens";
import { getPlaybookTier } from "@/lib/playbook";

/**
 * A tokenised URL must never be indexed, archived, or sent as a referrer to
 * anywhere else. `noarchive` and `nosnippet` matter as much as `noindex`: a
 * cached copy of this page in a search index is a working download link.
 */
export const metadata: Metadata = {
  title: "Download your Playbook",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export const dynamic = "force-dynamic";

export default async function DownloadPage({
  params,
}: {
  params: { token: string };
}) {
  const token = params.token;

  if (!looksLikeToken(token)) {
    return <Rejected reason="malformed" />;
  }

  const supabase = supabaseConfig();
  if (!supabase.configured) {
    console.error({
      scope: "playbook.download.page",
      message: "download page hit but Supabase is not configured",
      missing: supabase.missing,
    });
    return <Unavailable />;
  }

  const found = await findPurchaseByTokenHash(hashToken(token));
  if (!found.ok) {
    console.error({
      scope: "playbook.download.page",
      message: "lookup failed",
      detail: found.detail,
    });
    return <Unavailable />;
  }

  const verdict = checkEntitlement(found.data ? toEntitlement(found.data) : null);
  if (!verdict.ok) return <Rejected reason={verdict.reason} />;

  const tier = found.data?.price_id
    ? getPlaybookTier(playbookSlugForPriceId(found.data.price_id) ?? "")
    : undefined;
  if (!tier) return <Unmatched />;

  return (
    <Shell
      kicker="Your purchase"
      title={`Download ${tier.name}`}
      lead="Both files are yours. The link in your email keeps working, so you can come back for updates to this edition. It covers this playbook only."
    >
      {/*
        The token is handed to a client island rather than embedded in a form
        action, so it never leaves this page as a query string and never ends
        up in a server access log as part of a URL with parameters.
      */}
      <DownloadPanel token={token} pdfText={tier.pdfBlurb} zipText={tier.zipBlurb} />

      <Card className="mt-6 p-6">
        <PanelLabel>{tier.productName}</PanelLabel>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {tier.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

function Rejected({ reason }: { reason: TokenRejection }) {
  return (
    <Shell
      kicker="Download"
      title="We could not open that link."
      lead={rejectionMessage[reason]}
    >
      <Card className="p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Check the link was copied in full from your purchase email — it is long and
          email clients sometimes break it across two lines. If it still does not work,{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            href="/contact?type=other"
          >
            tell us and we will reissue it
          </Link>
          .
        </p>
      </Card>
    </Shell>
  );
}

function Unmatched() {
  return (
    <Shell
      kicker="Download"
      title="We could not match that purchase to a playbook."
      lead="The link is valid, and the files for this price are not configured on this site."
    >
      <Card className="p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Tell us which playbook you bought and we will send the right file.{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            href="/contact?type=other"
          >
            Contact us
          </Link>
          .
        </p>
      </Card>
    </Shell>
  );
}

function Unavailable() {
  return (
    <Shell
      kicker="Download"
      title="Downloads are temporarily unavailable."
      lead="This is on us, not on your link. Try again in a few minutes."
    >
      <Card className="p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your purchase and your link are unaffected. If it is still failing in an
          hour,{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            href="/contact?type=other"
          >
            let us know
          </Link>
          .
        </p>
      </Card>
    </Shell>
  );
}

function Shell({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {kicker}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>
        <div className="mt-10">{children}</div>
        <p className="mt-10 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          <Link href="/playbook" className="underline underline-offset-4">
            Back to the playbooks
          </Link>
        </p>
      </div>
    </Container>
  );
}
