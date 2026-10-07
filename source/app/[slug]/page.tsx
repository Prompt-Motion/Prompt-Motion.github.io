import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryView } from "@/components/entry-view";
import { JsonLd } from "@/components/json-ld";
import { getEntries, getEntry } from "@/lib/entries";
import { entryDescription, entryJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return { title: "Not found" };
  const kind = entry.kind === "skill" ? "motion design skill" : "AI motion prompt";
  return {
    title: entry.title,
    description: entryDescription(entry),
    keywords: [entry.title, kind, "Claude Opus motion design", "motion graphics prompt", `@${entry.handle}`],
    ...(SITE_URL ? { alternates: { canonical: `/${entry.slug}` } } : {}),
    openGraph: {
      title: entry.title,
      description: entryDescription(entry),
      ...(SITE_URL ? { url: `/${entry.slug}` } : {}),
      type: "video.other",
      images: entry.media.poster ? [{ url: entry.media.poster }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entryDescription(entry),
      images: entry.media.poster ? [entry.media.poster] : undefined,
    },
  };
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  return (
    <>
      <JsonLd data={entryJsonLd(entry)} />
      <EntryView entry={entry} />
    </>
  );
}
