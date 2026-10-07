import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">This page doesn’t exist</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">The link may be broken, or the entry may have been removed from the gallery.</p>
      <Link href="/" className="mt-8 inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-sm">
        <ArrowLeftIcon />
        All videos
      </Link>
    </main>
  );
}
