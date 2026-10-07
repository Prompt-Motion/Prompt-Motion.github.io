"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { getEntries } from "@/lib/entries";
import { itemVars, masonryVars, packMasonry, type Placement } from "@/lib/masonry";
import { setPreviewsPaused, usePreviewsPaused } from "@/lib/previews";
import type { Entry } from "@/lib/types";
import { BlurPoster } from "./blur-poster";

const entries = getEntries();

type Filter = "" | "prompt" | "skill";
type Sort = "popular" | "recent";

function Card({ entry, places, priority }: { entry: Entry; places: Placement[]; priority: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(priority);
  const [playing, setPlaying] = useState(false);
  const paused = usePreviewsPaused();
  const shouldPlay = inView && paused === false;
  if (shouldPlay && !mounted) setMounted(true);
  const initial = (entry.creatorName || entry.handle || "?").slice(0, 1).toUpperCase();

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new IntersectionObserver(
      ([hit]) => setInView(!!hit?.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.muted = true;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [shouldPlay, mounted]);

  return (
    <li className="masonry-item" style={itemVars(places) as CSSProperties}>
      <Link
        href={`/${entry.slug}`}
        aria-label={`${entry.title}, by @${entry.handle}`}
        className="group block rounded-xl outline-none"
      >
        <div ref={boxRef} className="relative z-10" style={{ aspectRatio: `${entry.width} / ${entry.height}` }}>
          <div className="absolute inset-0 bg-background" style={{ borderRadius: 12 }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden bg-muted" style={{ borderRadius: 12 }}>
              {entry.media.poster ? (
                <BlurPoster src={entry.media.poster} width={entry.width} height={entry.height} priority={priority} />
              ) : null}
              {mounted && entry.media.preview ? (
                <video
                  ref={videoRef}
                  src={entry.media.preview}
                  muted
                  loop
                  playsInline
                  preload={priority ? "auto" : "metadata"}
                  disablePictureInPicture
                  disableRemotePlayback
                  aria-hidden
                  tabIndex={-1}
                  onPlaying={() => setPlaying(true)}
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ease-out ${
                    playing && paused === false ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset transition-[color,box-shadow,opacity] duration-200 group-hover:ring-black/15" />
        </div>
        <div className="flex h-11 items-center gap-2.5">
          <span className="relative flex size-[22px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-[10px] text-muted-foreground">
            {entry.media.avatar ? (
              <img src={entry.media.avatar} alt="" width={22} height={22} referrerPolicy="no-referrer" className="size-full object-cover" />
            ) : (
              initial
            )}
          </span>
          <span className="min-w-0 truncate text-sm text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
            @{entry.handle}
          </span>
          <span className="ml-auto inline-flex h-5 shrink-0 items-center rounded-4xl border border-border px-2 text-xs font-normal text-muted-foreground">
            {entry.kind === "skill" ? "Skill" : "Prompt"}
          </span>
        </div>
      </Link>
    </li>
  );
}

function visibleEntries(filter: Filter, sort: Sort) {
  const list = entries.filter((entry) => {
    if (!filter) return true;
    if (filter === "skill") return entry.kind === "skill";
    return entry.kind === "prompt" && entry.prompt.length > 0;
  });
  if (sort === "recent") {
    list.sort((a, b) => (b.meta.Posted || "").localeCompare(a.meta.Posted || ""));
  }
  return list;
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("");
  const [sort, setSort] = useState<Sort>("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const paused = usePreviewsPaused();
  const sortRef = useRef<HTMLDivElement>(null);
  const shown = useMemo(() => visibleEntries(filter, sort), [filter, sort]);
  const packed = useMemo(() => packMasonry(shown.map((entry) => entry.height / entry.width)), [shown]);

  useEffect(() => {
    if (!sortOpen) return;
    const close = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [sortOpen]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex items-center gap-2">
          <span id="filter-label" className="text-base text-muted-foreground/60">
            Filter:
          </span>
          <div role="radiogroup" aria-labelledby="filter-label" className="flex items-center gap-0.5">
            {(["prompt", "skill"] as const).map((value) => {
              const on = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  data-state={on ? "on" : "off"}
                  onClick={() => setFilter((current) => (current === value ? "" : value))}
                  className="inline-flex h-8 items-center rounded-full border border-input bg-transparent px-3 text-sm font-normal text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:border-black data-[state=on]:bg-black data-[state=on]:text-white data-[state=on]:hover:bg-black/85 data-[state=on]:hover:text-white"
                >
                  {value === "prompt" ? "Prompt" : "Skill"}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 text-muted-foreground/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
          <div ref={sortRef} className="relative">
            <button
              type="button"
              aria-label="Sort"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((open) => !open)}
              className="inline-flex h-8 items-center rounded-full px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {sort === "popular" ? "Popular" : "Recent"}
            </button>
            {sortOpen ? (
              <div className="absolute right-0 z-20 mt-1 min-w-28 rounded-lg border border-border bg-white p-1 shadow-md">
                {(["popular", "recent"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setSort(value);
                      setSortOpen(false);
                    }}
                    className="flex w-full rounded-md py-1.5 pr-3 pl-2.5 text-left text-sm hover:bg-muted"
                  >
                    {value === "popular" ? "Popular" : "Recent"}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            aria-pressed={paused}
            data-state={paused ? "on" : "off"}
            onClick={() => setPreviewsPaused(!paused)}
            className="group/pause inline-flex h-8 items-center gap-1 rounded-full px-3 text-sm font-normal text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-muted data-[state=on]:text-foreground"
          >
            <span aria-hidden className="relative size-3.5">
              <svg viewBox="0 0 24 24" className="absolute inset-0 size-3.5 fill-current transition-opacity duration-150 group-data-[state=on]/pause:opacity-0">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              <svg viewBox="0 0 24 24" className="absolute inset-0 size-3.5 fill-current opacity-0 transition-opacity duration-150 group-data-[state=on]/pause:opacity-100">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86z" />
              </svg>
            </span>
            Pause previews
          </button>
        </div>
      </div>
      <div className="masonry-container">
        <ul className="masonry" style={masonryVars(packed.columns) as CSSProperties}>
          {shown.map((entry, index) => (
            <Card key={entry.slug} entry={entry} places={packed.items[index]} priority={index < 4} />
          ))}
        </ul>
      </div>
    </>
  );
}
