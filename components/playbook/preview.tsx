import Image from "next/image";

import { PreviewLink } from "@/components/playbook/preview-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { playbookPreviewPdf, playbookShots } from "@/lib/playbook";

export function Preview() {
  return (
    <Section id="preview" className="scroll-mt-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker="Preview"
          title="Read the opening before you pay for the rest."
          lead="Eight pages, free: the cover, how the book is used, the contents, and the first chapters. The paid PDF and the files are not on this site."
        />
        <PreviewLink
          href={playbookPreviewPdf}
          className="inline-flex flex-none items-center text-sm font-medium underline underline-offset-4"
        >
          Open the preview PDF
        </PreviewLink>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {playbookShots.map((shot) => (
          <figure key={shot.src} className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative aspect-[3/4] bg-muted">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain object-top"
              />
            </div>
            <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
