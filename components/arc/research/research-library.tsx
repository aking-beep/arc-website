"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatResearchDate,
  researchIndex,
  researchKinds,
  researchTopics,
  type ResearchItem,
  type ResearchKind,
} from "@/lib/arc/research";

/**
 * Search and filter over the research library. Ported from the prototype's
 * `pages/Research` plus `research/ResearchRow`.
 *
 * The prototype opened a drawer showing the summary, with a note that "the
 * full piece lives at /research/[slug] on the current site". Those pages exist
 * and are complete, so rows link to them and the drawer is gone — it was a
 * placeholder standing in for functionality this repository already has.
 */
export function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ResearchKind | "all">("all");
  const [topic, setTopic] = useState("all");

  const list = useMemo(() => {
    const term = query.trim().toLowerCase();
    return researchIndex.filter(
      (r) =>
        (kind === "all" || r.kind === kind) &&
        (topic === "all" || r.topic === topic) &&
        (!term || `${r.title} ${r.summary} ${r.topic}`.toLowerCase().includes(term)),
    );
  }, [query, kind, topic]);

  const filtered = Boolean(query) || kind !== "all" || topic !== "all";
  const reset = () => {
    setQuery("");
    setKind("all");
    setTopic("all");
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="library-title" className="font-serif text-[28px] text-ink sm:text-[32px]">
          Library
        </h2>
        <p className="text-[14px] text-ink-3" aria-live="polite">
          {list.length} of {researchIndex.length} items
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_240px]">
        <label className="relative block">
          <span className="sr-only">Search research</span>
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, topics and summaries"
            className="h-12 w-full rounded-md border border-line-strong bg-canvas pl-10 pr-10 text-[15px] text-ink placeholder:text-ink-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-ink-3 hover:text-ink"
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </label>
        <label className="block">
          <span className="sr-only">Filter by topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-12 w-full rounded-md border border-line-strong bg-canvas px-3 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="all">All topics</option>
            {researchTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        role="group"
        aria-label="Filter by type"
        className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {(["all", ...researchKinds] as const).map((k) => {
          const on = k === kind;
          const count =
            k === "all"
              ? researchIndex.length
              : researchIndex.filter((r) => r.kind === k).length;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => setKind(k)}
              className={cn(
                "min-h-[40px] whitespace-nowrap rounded-full border px-4 text-[13.5px] font-medium transition-colors duration-150",
                on
                  ? "border-ink bg-ink text-canvas"
                  : "border-line-strong text-ink-2 hover:border-ink hover:text-ink",
              )}
            >
              {k === "all" ? "All types" : k}{" "}
              <span className={cn("font-mono text-[11.5px]", on ? "text-mist-2" : "text-ink-3")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 border-t border-ink">
        {list.map((r) => (
          <ResearchRow key={r.slug} item={r} query={query} />
        ))}
      </ul>

      {list.length === 0 ? (
        <div className="border-b border-line py-14 text-center">
          <p className="text-[16px] text-ink">Nothing matches those filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 min-h-[44px] text-[14.5px] font-medium text-brand hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : null}
      {filtered && list.length > 0 ? (
        <button
          type="button"
          onClick={reset}
          className="mt-6 min-h-[44px] text-[14px] font-medium text-brand hover:underline"
        >
          Clear filters
        </button>
      ) : null}
    </>
  );
}

function ResearchRow({ item: r, query }: { item: ResearchItem; query: string }) {
  return (
    <li className="border-b border-line">
      <Link
        href={r.href}
        className="group grid w-full gap-2 py-6 text-left transition-colors duration-150 hover:bg-paper md:grid-cols-[180px_1fr_auto] md:gap-8 md:px-2"
      >
        <span className="flex flex-row gap-3 font-mono text-[12px] text-ink-3 md:flex-col md:gap-1">
          <span className="text-ink-2">{r.kind}</span>
          <time dateTime={r.date}>{formatResearchDate(r.date)}</time>
        </span>
        <span>
          <span className="block text-[17.5px] font-semibold leading-snug text-ink group-hover:text-brand">
            <Highlight text={r.title} query={query} />
          </span>
          <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink-2">
            <Highlight text={r.summary} query={query} />
          </span>
          <span className="mt-2 block text-[13px] text-ink-3">
            {r.topic} · {r.minutes} min
            {r.sources > 0 ? ` · ${r.sources} cited sources` : ""}
          </span>
        </span>
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="mt-1 hidden text-ink-3 transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:text-brand md:block"
        />
      </Link>
    </li>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-brand-subtle px-0.5 text-ink">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}
