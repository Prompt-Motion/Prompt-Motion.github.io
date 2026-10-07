"use client";

import { useSyncExternalStore } from "react";

const KEY = "pm:previews";
const listeners = new Set<() => void>();

function readPaused() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "paused") return true;
    if (stored === "playing") return false;
  } catch {
    /* private mode */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMedia = () => listener();
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) listener();
  };
  media.addEventListener("change", onMedia);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onMedia);
    window.removeEventListener("storage", onStorage);
  };
}

export function usePreviewsPaused() {
  return useSyncExternalStore(subscribe, readPaused, () => false);
}

export function setPreviewsPaused(paused: boolean) {
  try {
    localStorage.setItem(KEY, paused ? "paused" : "playing");
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}
