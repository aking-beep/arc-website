import { cn } from "@/lib/utils";
import type { ProductVisual } from "@/lib/content";

const frames: Record<
  ProductVisual,
  { title: string; rows: { label: string; value: string; tone?: "ok" | "warn" | "bad" }[] }
> = {
  conformance: {
    title: "Conformance report · mcp.example.com",
    rows: [
      { label: "Handshake", value: "Pass", tone: "ok" },
      { label: "Capability negotiation", value: "3 findings", tone: "warn" },
      { label: "Tool schemas", value: "Pass", tone: "ok" },
      { label: "Resource schemas", value: "1 break", tone: "bad" },
      { label: "Overall grade", value: "B−", tone: "warn" },
    ],
  },
  prompt: {
    title: "Prompt review · system prompt",
    rows: [
      { label: "Clarity", value: "78 / 100", tone: "warn" },
      { label: "Ambiguity", value: "4 phrases", tone: "warn" },
      { label: "Injection surface", value: "Elevated", tone: "bad" },
      { label: "Failure modes named", value: "9", tone: "ok" },
      { label: "Rewrite ready", value: "Yes", tone: "ok" },
    ],
  },
  skills: {
    title: "Skill package · ops-triage",
    rows: [
      { label: "Inputs", value: "ticket, severity, SLA", tone: "ok" },
      { label: "Guardrails", value: "Human review on P0", tone: "ok" },
      { label: "License", value: "MIT", tone: "ok" },
      { label: "Runtime", value: "Cursor / Claude / custom", tone: "ok" },
      { label: "Last updated", value: "2026-07-12", tone: "ok" },
    ],
  },
  connectivity: {
    title: "Reachability map · agent-prod",
    rows: [
      { label: "CRM connector", value: "Reachable · write", tone: "warn" },
      { label: "Billing API", value: "Reachable · read", tone: "ok" },
      { label: "Internal wiki", value: "Blocked", tone: "ok" },
      { label: "Secrets vault", value: "Over-permissioned", tone: "bad" },
      { label: "Exposure rank", value: "High", tone: "bad" },
    ],
  },
};

const toneClass = {
  ok: "text-emerald-500",
  warn: "text-amber-500",
  bad: "text-red-400",
} as const;

export function ProductVisualPanel({
  visual,
  className,
}: {
  visual: ProductVisual;
  className?: string;
}) {
  const frame = frames[visual];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm animate-fade-up",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
          {frame.title}
        </span>
      </div>
      <ul className="divide-y divide-border/60">
        {frame.rows.map((row, i) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-4 px-5 py-3.5"
            style={{ animationDelay: `${80 + i * 60}ms` }}
          >
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span
              className={cn(
                "font-mono text-sm font-medium",
                row.tone ? toneClass[row.tone] : "text-foreground",
              )}
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
