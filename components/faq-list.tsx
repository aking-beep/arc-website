"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqList({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card">
      {items.map((item) => (
        <FaqItem key={item.q} question={item.q} answer={item.a} />
      ))}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
      >
        <span className="text-sm font-medium sm:text-base">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-none text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={id}
        hidden={!open}
        className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground"
      >
        {answer}
      </div>
    </div>
  );
}
