"use client";

import Link from "next/link";
import { useState } from "react";
import type { Entry } from "@/lib/types";
import { ArrowLeftIcon, ArrowUpRightIcon, CopyIcon } from "./icons";
import { Player } from "./player";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function EntryView({ entry }: { entry: Entry }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const long = entry.prompt.length > 420;
  const initial = (entry.creatorName || entry.handle || "?").slice(0, 1).toUpperCase();
  const label = entry.kind === "skill" ? "Skill" : "Prompt";

  async function copy() {
    if (!entry.prompt) return;
    await navigator.clipboard.writeText(entry.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-8">
      <Link href="/" className="mt-4 mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon />
        All videos
      </Link>
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <div className="-mx-4 bg-muted/60 sm:mx-0 sm:rounded-2xl md:min-w-0 md:flex-1 md:p-8">
          {entry.media.video ? (
            <Player src={entry.media.video} poster={entry.media.poster} width={entry.width} height={entry.height} />
          ) : null}
        </div>
        <div className="md:w-[380px] md:shrink-0">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs text-muted-foreground">
                {entry.media.avatar ? (
                  <img src={entry.media.avatar} alt="" width={32} height={32} className="size-full object-cover" />
                ) : (
                  initial
                )}
              </span>
              <div className="min-w-0 text-sm leading-tight">
                <div className="truncate font-medium">{entry.creatorName}</div>
                <div className="truncate text-muted-foreground">@{entry.handle}</div>
              </div>
              {entry.tweetUrl ? (
                <a href={entry.tweetUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex shrink-0 items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground">
                  View post
                  <ArrowUpRightIcon />
                </a>
              ) : null}
            </div>
            <h1 className="text-xl font-medium tracking-tight text-balance">{entry.title}</h1>
            <section className="flex flex-col gap-2">
              <div className="flex h-6 items-center justify-between">
                <h2 className="text-xs font-medium text-muted-foreground">{label}</h2>
                {entry.prompt ? (
                  <button type="button" onClick={copy} aria-label={`Copy ${label.toLowerCase()}`} className="inline-flex h-6 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
                    <CopyIcon />
                    {copied ? "Copied" : "Copy"}
                  </button>
                ) : null}
              </div>
              {entry.prompt ? (
                <div>
                  <div className={`rounded-lg bg-muted px-4 py-3 text-[13.5px] leading-6 whitespace-pre-wrap ${long && !expanded ? "max-h-[13.5rem] overflow-hidden" : ""}`}>
                    {entry.prompt}
                  </div>
                  {long ? (
                    <button type="button" onClick={() => setExpanded((value) => !value)} className="mt-2 text-sm text-muted-foreground hover:text-foreground">
                      {expanded ? "Show less" : "Show all"}
                    </button>
                  ) : null}
                </div>
              ) : null}
              {entry.tweetUrl ? (
                <p className="text-xs text-muted-foreground">
                  This {label.toLowerCase()} was taken directly from{" "}
                  <a href={entry.tweetUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/40 underline-offset-2 hover:text-foreground">
                    @{entry.handle}&apos;s post
                  </a>
                  .
                </p>
              ) : null}
            </section>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-border pt-4 text-sm">
              {Object.entries(entry.meta).map(([key, value]) => (
                <div key={key} className="contents">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="min-w-0">
                    {key === "Posted" ? <time dateTime={value}>{formatDate(value)}</time> : value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
