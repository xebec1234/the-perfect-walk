"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AudioState, ActiveSource } from "@/types/walk";

type UseAudioOptions = {
  onMusicFinished?: () => void;
};

export function useAudio(options: UseAudioOptions = {}) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const onMusicFinishedRef = useRef(options.onMusicFinished);

  const activeSourceRef = useRef<ActiveSource>(null);

  /*
   * When a guide is playing, remember which music should
   * start automatically when the guide finishes.
   */
  const pendingMusicSrcRef = useRef<string | null>(null);
  const pendingMusicVolumeRef = useRef(0.82);

  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    onMusicFinishedRef.current = options.onMusicFinished;
  }, [options.onMusicFinished]);

  /*
   * MUSIC
   */
  const getMusic = useCallback(() => {
    if (!musicRef.current) {
      const audio = new Audio();

      audio.preload = "auto";
      audio.loop = false;

      audio.addEventListener("play", () => {
        console.log("[Audio] MUSIC play");

        activeSourceRef.current = "music";

        setIsPlaying(true);
        setAudioState("music");
      });

      audio.addEventListener("playing", () => {
        console.log("[Audio] MUSIC playing");
      });

      audio.addEventListener("pause", () => {
        console.log("[Audio] MUSIC pause", {
          currentTime: audio.currentTime,
          duration: audio.duration,
          ended: audio.ended,
        });

        setIsPlaying(false);
      });

      audio.addEventListener("ended", () => {
        console.log("[Audio] MUSIC ended");

        activeSourceRef.current = null;

        setIsPlaying(false);
        setAudioState("complete");

        onMusicFinishedRef.current?.();
      });

      audio.addEventListener("error", () => {
        console.error("[Audio] MUSIC error", {
          error: audio.error,
          src: audio.src,
        });

        activeSourceRef.current = null;

        setHasError(true);
        setIsPlaying(false);
        setAudioState("error");
      });

      musicRef.current = audio;
    }

    return musicRef.current;
  }, []);

  /*
   * Start MUSIC.
   */
  const playMusic = useCallback(
    async (musicSrc: string, volume: number) => {
      const music = getMusic();

      console.log("[Audio] Starting music", {
        musicSrc,
      });

      music.volume = Math.max(0, Math.min(1, volume));

      const resolvedMusicSrc = new URL(musicSrc, window.location.href).href;

      if (music.src !== resolvedMusicSrc) {
        music.src = musicSrc;
        music.load();
      }

      try {
        await music.play();

        activeSourceRef.current = "music";

        setIsPlaying(true);
        setAudioState("music");
      } catch (error) {
        console.error("[Audio] MUSIC play() failed", error);

        setHasError(true);
        setIsPlaying(false);
        setAudioState("error");
      }
    },
    [getMusic],
  );

  /*
   * GUIDE / VOICE
   */
  const getVoice = useCallback(() => {
    if (!voiceRef.current) {
      const audio = new Audio();

      audio.preload = "auto";

      audio.addEventListener("play", () => {
        console.log("[Audio] GUIDE play");

        activeSourceRef.current = "guide";

        setIsPlaying(true);
        setAudioState("intro");
      });

      audio.addEventListener("playing", () => {
        console.log("[Audio] GUIDE playing");
      });

      audio.addEventListener("pause", () => {
        console.log("[Audio] GUIDE pause", {
          currentTime: audio.currentTime,
          duration: audio.duration,
          ended: audio.ended,
          readyState: audio.readyState,
        });

        setIsPlaying(false);
      });

      audio.addEventListener("ended", () => {
        console.log("[Audio] GUIDE ended");

        activeSourceRef.current = null;

        setIsPlaying(false);
        setAudioState("idle");

        /*
         * The guide has finished.
         * Start the music that was saved when
         * this stage began.
         */
        const nextMusicSrc = pendingMusicSrcRef.current;
        const nextMusicVolume = pendingMusicVolumeRef.current;

        pendingMusicSrcRef.current = null;

        if (nextMusicSrc) {
          console.log("[Audio] GUIDE finished → starting MUSIC", {
            musicSrc: nextMusicSrc,
          });

          void playMusic(nextMusicSrc, nextMusicVolume);
        }
      });

      audio.addEventListener("error", () => {
        console.error("[Audio] GUIDE error", {
          error: audio.error,
          src: audio.src,
        });

        activeSourceRef.current = null;

        setHasError(true);
        setIsPlaying(false);
        setAudioState("error");
      });

      voiceRef.current = audio;
    }

    return voiceRef.current;
  }, [playMusic]);

  /*
   * PLAY STAGE
   *
   * Sequence:
   *
   * GUIDE → MUSIC
   *
   * If there is no guide:
   *
   * MUSIC immediately
   */
  const play = useCallback(
    async (musicSrc: string, voiceSrc?: string, volume = 0.82) => {
      console.log("[Audio] PLAY requested", {
        musicSrc,
        voiceSrc,
        volume,
      });

      setHasError(false);

      const music = getMusic();
      const voice = getVoice();

      /*
       * Stop both sources before starting
       * the new stage.
       */
      music.pause();
      voice.pause();

      music.currentTime = 0;
      voice.currentTime = 0;

      music.volume = Math.max(0, Math.min(1, volume));
      voice.volume = Math.max(0, Math.min(1, volume));

      /*
       * Prepare the music source now.
       */
      const resolvedMusicSrc = new URL(musicSrc, window.location.href).href;

      if (music.src !== resolvedMusicSrc) {
        music.src = musicSrc;
        music.load();
      }

      /*
       * GUIDE FIRST
       */
      if (voiceSrc) {
        console.log("[Audio] Preparing GUIDE", {
          voiceSrc,
        });

        /*
         * IMPORTANT:
         *
         * Save the music BEFORE the guide starts.
         * When the guide fires "ended", the handler
         * will read these refs and start the music.
         */
        pendingMusicSrcRef.current = musicSrc;
        pendingMusicVolumeRef.current = volume;

        voice.src = voiceSrc;
        voice.load();

        activeSourceRef.current = "guide";

        setAudioState("intro");

        try {
          await voice.play();

          console.log("[Audio] GUIDE play() resolved");

          setIsPlaying(true);
        } catch (error) {
          console.error("[Audio] GUIDE play() failed", error);

          /*
           * Guide is optional.
           * If it cannot play, continue directly
           * to the music.
           */
          pendingMusicSrcRef.current = null;

          await playMusic(musicSrc, volume);
        }

        return;
      }

      /*
       * No guide.
       * Start music immediately.
       */
      await playMusic(musicSrc, volume);
    },
    [getMusic, getVoice, playMusic],
  );

  /*
   * SKIP GUIDE
   */
  const skipGuide = useCallback(
    async (musicSrc: string, volume = 0.82) => {
      const voice = voiceRef.current;

      if (voice) {
        voice.pause();
        voice.currentTime = 0;
      }

      pendingMusicSrcRef.current = null;
      pendingMusicVolumeRef.current = volume;
      activeSourceRef.current = null;

      setIsPlaying(false);
      setAudioState("idle");

      await playMusic(musicSrc, volume);
    },
    [playMusic],
  );

  /*
   * PAUSE
   */
  const pause = useCallback(() => {
    console.log("[Audio] PAUSE requested", {
      activeSource: activeSourceRef.current,
    });

    const music = musicRef.current;
    const voice = voiceRef.current;

    music?.pause();
    voice?.pause();

    setIsPlaying(false);
    setAudioState("paused");
  }, []);

  /*
   * RESUME
   */
  const resume = useCallback(async () => {
    console.log("[Audio] RESUME requested", {
      activeSource: activeSourceRef.current,
    });

    try {
      const activeSource = activeSourceRef.current;

      /*
       * Resume GUIDE.
       */
      if (activeSource === "guide") {
        const voice = voiceRef.current;

        if (!voice) {
          return;
        }

        await voice.play();

        setIsPlaying(true);
        setAudioState("intro");

        return;
      }

      /*
       * Resume MUSIC.
       */
      const music = musicRef.current;

      if (!music) {
        return;
      }

      await music.play();

      activeSourceRef.current = "music";

      setIsPlaying(true);
      setAudioState("music");
    } catch (error) {
      console.error("[Audio] RESUME failed", error);

      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    }
  }, []);

  /*
   * STOP
   */
  const stop = useCallback(() => {
    console.log("[Audio] STOP requested");

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

    pendingMusicSrcRef.current = null;

    activeSourceRef.current = null;

    setIsPlaying(false);
    setAudioState("idle");
  }, []);

  /*
   * CLEANUP
   */
  useEffect(() => {
    return () => {
      console.log("[Audio] Controller unmount");

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
    skipGuide,
  };
}
