"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AudioState =
  | "idle"
  | "intro"
  | "music"
  | "paused"
  | "error"
  | "complete";

export function useAudio() {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const [audioState, setAudioState] =
    useState<AudioState>("idle");

  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getMusic = useCallback(() => {
    if (!musicRef.current) {
      const audio = new Audio();

      audio.preload = "auto";
      audio.loop = true;

      audio.addEventListener("play", () => {
        setIsPlaying(true);
        setAudioState("music");
      });

      audio.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setAudioState("idle");
      });

      audio.addEventListener("error", () => {
        setHasError(true);
        setIsPlaying(false);
        setAudioState("error");
      });

      musicRef.current = audio;
    }

    return musicRef.current;
  }, []);

  const getVoice = useCallback(() => {
    if (!voiceRef.current) {
      const audio = new Audio();

      audio.preload = "auto";

      voiceRef.current = audio;
    }

    return voiceRef.current;
  }, []);

  const play = useCallback(
    async (
      musicSrc: string,
      voiceSrc?: string,
      volume = 0.82,
    ) => {
      setHasError(false);

      const music = getMusic();

      music.volume = Math.max(0, Math.min(1, volume));

      const resolvedMusicSrc = new URL(
        musicSrc,
        window.location.href,
      ).href;

      if (music.src !== resolvedMusicSrc) {
        music.src = musicSrc;
        music.load();
      }

      try {
        if (voiceSrc) {
          const voice = getVoice();

          voice.pause();
          voice.currentTime = 0;
          voice.src = voiceSrc;
          voice.volume = Math.max(
            0,
            Math.min(1, volume),
          );

          setAudioState("intro");

          try {
            await voice.play();
          } catch {
            // Voice is optional. Continue with music.
          }
        }

        await music.play();

        setIsPlaying(true);
        setAudioState("music");
      } catch {
        setHasError(true);
        setIsPlaying(false);
        setAudioState("error");
      }
    },
    [getMusic, getVoice],
  );

  const pause = useCallback(() => {
    const music = musicRef.current;
    const voice = voiceRef.current;

    music?.pause();
    voice?.pause();

    setIsPlaying(false);
    setAudioState("paused");
  }, []);

  const resume = useCallback(async () => {
    try {
      const music = musicRef.current;

      if (!music) {
        return;
      }

      await music.play();

      setIsPlaying(true);
      setAudioState("music");
    } catch {
      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    }
  }, []);

  const stop = useCallback(() => {
    const music = musicRef.current;
    const voice = voiceRef.current;

    music?.pause();
    voice?.pause();

    if (music) {
      music.currentTime = 0;
    }

    if (voice) {
      voice.currentTime = 0;
    }

    setIsPlaying(false);
    setAudioState("idle");
  }, []);

  useEffect(() => {
    return () => {
      musicRef.current?.pause();
      voiceRef.current?.pause();

      musicRef.current = null;
      voiceRef.current = null;
    };
  }, []);

  return {
    audioState,
    isPlaying,
    hasError,
    play,
    pause,
    resume,
    stop,
  };
}