import { Lock } from "lucide-react";

/**
 * The public face of a paid playbook.
 *
 * The bars are decoration. The manuscript is not in this component, and it is
 * not rendered anywhere else on the page. Payment is what opens the file.
 */
export function Paywall({
  product,
  price,
  file,
  children,
}: {
  product: string;
  price: string;
  file: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="overflow-hidden rounded-xl border border-border bg-card"
      aria-label={`${product} is a paid download`}
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="relative min-h-52 border-b border-border/60 bg-muted/40 p-8 lg:border-b-0 lg:border-r" aria-hidden>
          <div className="space-y-3 opacity-40">
            {["92%", "76%", "84%", "64%", "80%", "58%", "88%", "70%"].map((width) => (
              <div
                key={width}
                className="h-3 rounded-sm bg-foreground/20"
                style={{ width }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        </div>
        <div className="p-6 sm:p-8">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Paid
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
            {product} opens after payment.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {file} The price is {price}, once. The private download link arrives by email.
          </p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
