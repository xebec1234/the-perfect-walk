"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useAudio() {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const introRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const stop = useCallback(() => {
    [musicRef.current, introRef.current].forEach((audio) => {
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    });
    setIsPlaying(false);
  }, []);

  const play = useCallback(async (musicSrc: string, introSrc?: string, volume = 0.82) => {
    stop();
    setHasError(false);

    const music = new Audio(musicSrc);
    music.loop = true;
    music.volume = volume;
    musicRef.current = music;

    try {
      if (introSrc) {
        const intro = new Audio(introSrc);
        intro.volume = Math.min(1, volume);
        introRef.current = intro;
        await intro.play();
        await new Promise<void>((resolve) => {
          intro.addEventListener("ended", () => resolve(), { once: true });
        });
      }
      await music.play();
      setIsPlaying(true);
    } catch {
      setHasError(true);
      // The timer/walk remains usable if the browser blocks or cannot load audio.
    }
  }, [stop]);

  const pause = useCallback(() => {
    musicRef.current?.pause();
    introRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(async () => {
    try {
      await musicRef.current?.play();
      setIsPlaying(true);
    } catch {
      setHasError(true);
    }
  }, []);

  useEffect(() => stop, [stop]);

  return { play, pause, resume, stop, isPlaying, hasError };
}
