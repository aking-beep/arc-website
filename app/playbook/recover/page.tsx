import type { Metadata } from "next";
import Link from "next/link";

import { RecoverForm } from "@/components/playbook/recover-form";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Email my playbook download",
  description:
    "Send a fresh download link to the email address you used when you bought a playbook.",
  robots: { index: false, follow: true },
};

export default function RecoverPage() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Already bought a playbook
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Email yourself the download.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Use the address from checkout. If it has a purchase, a fresh link arrives
          there. The link already in your inbox keeps working.
        </p>
        <Card className="mt-10 p-6 sm:p-8">
          <RecoverForm />
        </Card>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Or email{" "}
          <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .{" "}
          <Link href="/playbook" className="underline underline-offset-4">
            Explore all playbooks
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
