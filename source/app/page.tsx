import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery";
import { JsonLd } from "@/components/json-ld";
import { homeJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <JsonLd data={homeJsonLd()} />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-2xl font-medium tracking-tight text-balance sm:text-3xl">
          Prompt Motion: AI motion prompts and Claude Opus motion design
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Prompt Motion collects Claude Opus motion design films and the motion graphics prompts that made them. Filter by Prompt or Skill, open an AI video, and copy the text or the reusable workflow. Each entry links back to the creator’s original post.
        </p>
      </header>
      <Gallery />
      <Faq />
    </main>
  );
}
