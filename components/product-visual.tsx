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
    title: "Skill package · pr-review-summary",
    rows: [
      { label: "Format", value: "SKILL.md (Agent Skills spec)", tone: "ok" },
      { label: "Guardrails", value: "No invented tests", tone: "ok" },
      { label: "Install", value: "~/.cursor/skills/…", tone: "ok" },
      { label: "Runtime", value: "Cursor / Claude / any", tone: "ok" },
      { label: "License", value: "MIT · 20 skills", tone: "ok" },
    ],
  },
  connectivity: {
    title: "Connectivity report · api.example.com",
    rows: [
      { label: "DNS + TCP", value: "Reachable", tone: "ok" },
      { label: "TLS", value: "TLSv1.3 · 64d", tone: "ok" },
      { label: "HSTS / CSP", value: "CSP missing", tone: "warn" },
      { label: "TTFB", value: "182 ms", tone: "ok" },
      { label: "Overall grade", value: "B+", tone: "warn" },
    ],
  },
  workflows: {
    title: "Template · daily-operating-brief",
    rows: [
      { label: "Pipeline steps", value: "5", tone: "ok" },
      { label: "HITL gate", value: "Required", tone: "warn" },
      { label: "Required fields", value: "Valid", tone: "ok" },
      { label: "Dry-run", value: "Pass · no model call", tone: "ok" },
      { label: "Copy-ready", value: "Markdown + prompt", tone: "ok" },
    ],
  },
  architecture: {
    title: "Blueprint · kinesis-data-streams",
    rows: [
      { label: "Category", value: "Data · intermediate", tone: "ok" },
      { label: "Shape", value: "Shards + EFO consumers", tone: "ok" },
      { label: "When not to use", value: "Single-consumer queue → SQS", tone: "warn" },
      { label: "Failure mode", value: "Hot shard / IteratorAge", tone: "bad" },
      { label: "Origin", value: "DEA-C01 Kinesis lab", tone: "ok" },
    ],
  },
  spend: {
    title: "TokenLoop · spend today",
    rows: [
      { label: "Org burn", value: "$514.10", tone: "bad" },
      { label: "Daily cap", value: "$250", tone: "warn" },
      { label: "jordan@ (spike)", value: "$410.60 · 7.8×", tone: "bad" },
      { label: "Kill switch", value: "Revoke requested", tone: "ok" },
      { label: "Chargeback MTD", value: "$1,180 bill-back", tone: "ok" },
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
