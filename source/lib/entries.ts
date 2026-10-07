import catalog from "@/data/catalog.json";
import type { Entry } from "./types";

const data = catalog as { masonry: string; entries: Entry[] };

export function getMasonryStyle(): string {
  return data.masonry;
}

export function getEntries(): Entry[] {
  return data.entries;
}

export function getEntry(slug: string): Entry | undefined {
  return data.entries.find((entry) => entry.slug === slug);
}

export function layoutStyle(layout: string): Record<string, string> {
  const style: Record<string, string> = {};
  for (const part of layout.split(";")) {
    const index = part.indexOf(":");
    if (index <= 0) continue;
    style[part.slice(0, index).trim()] = part.slice(index + 1).trim();
  }
  return style;
}
