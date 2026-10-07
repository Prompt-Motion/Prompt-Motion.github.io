"use client";

import { useActionState, useEffect, useState } from "react";
import { submitPost, type SubmitState } from "@/app/actions";
import { CheckIcon } from "./icons";

const locations = {
  post: "In the main post",
  comments: "In the comments",
  separate: "In a separate post",
} as const;

const rules = [
  "The post has a video made with Claude Opus 5.5.",
  "The prompt or skill behind it is shared publicly.",
  "Every submission is reviewed by hand before it goes up.",
];

const initial: SubmitState = { status: "idle" };

export function SubmitDialog() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(submitPost, initial);
  const [location, setLocation] = useState<keyof typeof locations>("post");

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-7 items-center rounded-[min(var(--radius-md,10px),12px)] px-2.5 text-[0.8rem] text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        Submit
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-title"
            className="w-full max-w-md rounded-xl border border-border bg-background p-5 shadow-md"
            onClick={(event) => event.stopPropagation()}
          >
            {state.status === "done" ? (
              <div className="grid gap-5">
                <div>
                  <div className="mb-1 flex size-8 items-center justify-center rounded-full bg-muted">
                    <CheckIcon className="size-4" />
                  </div>
                  <h2 id="submit-title" className="text-base font-medium">Thanks, it&apos;s in the queue</h2>
                  <p className="mt-1 text-sm text-muted-foreground">I&apos;ll take a look. If it fits the gallery, it&apos;ll show up here with the creator credited.</p>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" className="h-8 rounded-lg border border-border px-2.5 text-sm" onClick={() => setOpen(false)}>Done</button>
                </div>
              </div>
            ) : (
              <form action={action} className="grid gap-5">
                <div>
                  <h2 id="submit-title" className="text-base font-medium">Submit a video</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Know a motion video made with Claude Opus 5.5? Send the post on X.</p>
                </div>
                <ul className="grid gap-1.5 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
                  {rules.map((rule) => (
                    <li key={rule} className="flex items-start gap-2">
                      <CheckIcon />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <label className="grid gap-2 text-sm font-medium">
                  Post URL
                  <input
                    name="postUrl"
                    type="url"
                    required
                    placeholder="https://x.com/user/status/…"
                    className="h-9 rounded-lg border border-input px-3 font-normal"
                  />
                </label>
                <fieldset className="grid gap-3">
                  <legend className="mb-1 text-sm font-medium">Where&apos;s the prompt or skill?</legend>
                  {(Object.keys(locations) as Array<keyof typeof locations>).map((key) => (
                    <label key={key} className="flex items-center gap-2.5 text-sm font-normal">
                      <input
                        type="radio"
                        name="promptLocation"
                        value={key}
                        required
                        checked={location === key}
                        onChange={() => setLocation(key)}
                      />
                      {locations[key]}
                    </label>
                  ))}
                  {location === "separate" ? (
                    <label className="grid gap-2 pl-6 text-sm font-normal text-muted-foreground">
                      Link to it (optional)
                      <input name="promptUrl" type="url" placeholder="A post, gist or repo" className="h-9 rounded-lg border border-input px-3" />
                    </label>
                  ) : (
                    <input type="hidden" name="promptUrl" value="" />
                  )}
                </fieldset>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
                {state.status === "error" ? <p className="text-sm text-destructive">{state.message}</p> : null}
                <div className="flex justify-end gap-2">
                  <button type="button" className="h-8 rounded-lg border border-border px-2.5 text-sm" onClick={() => setOpen(false)}>Cancel</button>
                  <button type="submit" disabled={pending} className="h-8 rounded-lg bg-primary px-2.5 text-sm text-primary-foreground disabled:opacity-50">
                    {pending ? "Sending…" : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
