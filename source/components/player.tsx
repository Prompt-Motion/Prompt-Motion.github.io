"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, VolumeIcon } from "./icons";

export function Player({
  src,
  poster,
  width,
  height,
}: {
  src: string;
  poster?: string;
  width: number;
  height: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const onTime = () => {
      if (video.duration) setProgress(video.currentTime / video.duration);
    };
    video.addEventListener("timeupdate", onTime);
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function seek(value: number) {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = value * video.duration;
    setProgress(value);
  }

  return (
    <div className="stage md:[--stage-h:min(76dvh,800px)]">
      <div
        className="stage-box group/player relative overflow-hidden bg-muted"
        style={{ ["--r" as string]: String(width / height), borderRadius: 12 }}
      >
        {poster ? (
          <img
            src={poster}
            alt=""
            width={width}
            height={height}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 size-full object-cover ${playing ? "opacity-0" : "opacity-100"}`}
          />
        ) : null}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          width={width}
          height={height}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-linear-to-t from-black/55 to-transparent px-2 pt-8 pb-2 text-white">
          <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={toggle} className="inline-flex size-7 items-center justify-center rounded-md text-white hover:bg-white/15">
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <input
            aria-label="Seek"
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={progress}
            onChange={(event) => seek(Number(event.target.value))}
            className="mx-2 h-1 flex-1 accent-white"
          />
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => setMuted((value) => !value)}
            className="inline-flex size-7 items-center justify-center rounded-md text-white hover:bg-white/15"
          >
            <VolumeIcon muted={muted} />
          </button>
        </div>
      </div>
    </div>
  );
}
