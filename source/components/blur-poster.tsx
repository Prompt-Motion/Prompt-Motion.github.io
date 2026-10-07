"use client";

import { useCallback, useState } from "react";

type PosterState = "loading" | "loaded" | "settled" | "cached";

export function BlurPoster({
  src,
  width,
  height,
  priority = false,
}: {
  src: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  const [state, setState] = useState<PosterState>("loading");

  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setState("cached");
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt=""
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setState((current) => (current === "loading" ? (reduce ? "settled" : "loaded") : current));
      }}
      onTransitionEnd={(event) => {
        if (event.propertyName === "filter") setState("settled");
      }}
      className={`absolute inset-0 size-full object-cover ${
        state === "cached" ? "" : "transition-[opacity,filter] duration-500 ease-out motion-reduce:transition-none"
      } ${state === "loading" ? "opacity-0 blur-lg" : "opacity-100 blur-[0px]"}`}
    />
  );
}
