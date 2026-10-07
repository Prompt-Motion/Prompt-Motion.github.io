"use server";

import { z } from "zod";

const schema = z.object({
  postUrl: z.string().url(),
  promptLocation: z.enum(["post", "comments", "separate"]),
  promptUrl: z.string().url().max(500).optional().or(z.literal("")),
  website: z.string().optional(),
});

export type SubmitState = {
  status: "idle" | "done" | "error";
  message?: string;
  field?: string;
};

export async function submitPost(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  if (String(formData.get("website") || "").trim()) {
    return { status: "done" };
  }

  const parsed = schema.safeParse({
    postUrl: formData.get("postUrl"),
    promptLocation: formData.get("promptLocation"),
    promptUrl: formData.get("promptUrl") || "",
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = String(issue?.path[0] || "postUrl");
    return { status: "error", field, message: "Check that URL and try again." };
  }

  return { status: "done" };
}
