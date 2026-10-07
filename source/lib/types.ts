export type EntryMedia = {
  poster?: string;
  preview?: string;
  video?: string;
  avatar?: string;
};

export type Entry = {
  slug: string;
  title: string;
  creatorName: string;
  handle: string;
  tweetUrl: string;
  prompt: string;
  kind: "prompt" | "skill";
  media: EntryMedia;
  meta: Record<string, string>;
  width: number;
  height: number;
  layout: string;
};
