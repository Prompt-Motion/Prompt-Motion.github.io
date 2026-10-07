import type { Entry } from "./types";
import { SITE_NAME, SITE_URL, SITE_X } from "./site";

export const KEYWORDS = [
  "Prompt Motion",
  "AI motion prompts",
  "Claude Opus motion design",
  "motion graphics prompts",
  "AI video prompts",
  "prompt to motion video",
  "motion design skills",
  "Claude motion video",
  "AI motion gallery",
] as const;

export const HOME_TITLE = "Prompt Motion | AI Motion Prompts & Claude Opus Motion Design";
export const HOME_DESCRIPTION =
  "Prompt Motion is a gallery of AI motion prompts and Claude Opus motion design films. Browse motion graphics prompts, open an AI video, and copy the prompt or skill behind it.";

export const FAQS = [
  {
    question: "What is an AI motion prompt?",
    answer:
      "An AI motion prompt is the written brief for a motion video: the scene, type, timing, and camera. Prompt Motion puts that text on every Prompt card, next to the film it produced.",
  },
  {
    question: "Are these films Claude Opus motion design?",
    answer:
      "Yes. The videos here were made with Claude Opus as motion design and motion graphics pieces. Open an entry to see the model, stack, and post date.",
  },
  {
    question: "What is the difference between a Prompt and a Skill?",
    answer:
      "A Prompt is the text for one video. A Skill is a reusable motion design workflow. Use the Prompt and Skill filters to browse each kind.",
  },
  {
    question: "Can I copy a motion graphics prompt?",
    answer:
      "Open the video and use Copy. The prompt or skill belongs to the creator, and the original post is linked on the entry.",
  },
  {
    question: "How does prompt to motion video work here?",
    answer:
      "Each film started from a written prompt or skill rather than a blank edit. The gallery pairs the AI video with that text so you can study or reuse the approach.",
  },
  {
    question: "How do I submit a motion video?",
    answer:
      "Use Submit and paste the post URL. Entries are reviewed by hand before they appear in the AI motion gallery.",
  },
] as const;

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        alternateName: "AiMotionSiteS",
        ...(SITE_URL ? { url: SITE_URL } : {}),
        description: HOME_DESCRIPTION,
        sameAs: [SITE_X],
      },
      {
        "@type": "CollectionPage",
        name: HOME_TITLE,
        ...(SITE_URL ? { url: SITE_URL } : {}),
        description: HOME_DESCRIPTION,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, ...(SITE_URL ? { url: SITE_URL } : {}) },
        about: KEYWORDS.map((name) => ({ "@type": "Thing", name })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export function entryDescription(entry: Entry) {
  const prompt = entry.prompt.replace(/\s+/g, " ").trim();
  const kind = entry.kind === "skill" ? "motion design skill" : "AI motion prompt";
  const lead = prompt ? prompt.slice(0, 140) : `${entry.title} by @${entry.handle}`;
  const text = `${lead}${prompt.length > 140 ? "…" : ""} ${kind} for a Claude motion video.`;
  return text.slice(0, 180);
}

export function entryJsonLd(entry: Entry) {
  const posted = entry.meta.Posted;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: entry.title,
    description: entryDescription(entry),
    thumbnailUrl: entry.media.poster,
    contentUrl: entry.media.video,
    uploadDate: posted ? `${posted}T00:00:00Z` : undefined,
    ...(SITE_URL ? { url: `${SITE_URL}/${entry.slug}` } : {}),
    creator: {
      "@type": "Person",
      name: entry.creatorName || entry.handle,
      url: entry.tweetUrl || undefined,
    },
    keywords: entry.kind === "skill" ? "motion design skill, Claude motion video" : "AI motion prompt, motion graphics prompt",
  };
}
