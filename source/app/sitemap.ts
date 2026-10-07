import type { MetadataRoute } from "next";
import { getEntries } from "@/lib/entries";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  const entries = getEntries().map((entry) => ({
    url: `${SITE_URL}/${entry.slug}`,
    lastModified: entry.meta.Posted || undefined,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...entries,
  ];
}
