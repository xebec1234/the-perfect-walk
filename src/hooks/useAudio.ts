"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AudioState = "idle" | "intro" | "music" | "paused" | "error" | "complete";

type MediaMetadataInput = {
  title: string;
  artwork?: string;
};

type UseAudioOptions = {
  onMusicFinished?: () => void;
};

export function useAudio({ onMusicFinished }: UseAudioOptions = {}) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const onMusicFinishedRef = useRef(onMusicFinished);
  const pendingMusicSrcRef = useRef<string | null>(null);
  const pendingMusicVolumeRef = useRef(1);
  const pendingMetadataRef = useRef<MediaMetadataInput | null>(null);
  const activeSourceRef = useRef<"voice" | "music" | null>(null);
  const voiceDurationRef = useRef(0);
  const musicDurationRef = useRef(0);

  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    onMusicFinishedRef.current = onMusicFinished;
  }, [onMusicFinished]);

  useEffect(() => {
    voiceDurationRef.current = voiceDuration;
  }, [voiceDuration]);

  useEffect(() => {
    musicDurationRef.current = musicDuration;
  }, [musicDuration]);

  const setMediaMetadata = useCallback((metadata: MediaMetadataInput | null) => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

    try {
      navigator.mediaSession.metadata = metadata
        ? new MediaMetadata({
            title: metadata.title,
            artist: "The Perfect Walk",
            album: "The Perfect Walk",
            artwork: metadata.artwork
              ? [
                  {
                    src: new URL(metadata.artwork, window.location.origin).href,
                    sizes: "512x512",
                    type: "image/svg+xml",
                  },
                ]
              : undefined,
          })
        : null;
    } catch (error) {
      console.warn("[Audio] Media Session metadata unavailable:", error);
    }
  }, []);

  const playMusicInternal = useCallback(
    async (musicSrc: string, volume: number) => {
      const music = musicRef.current;
      if (!music) return;

      try {
        music.pause();
        music.currentTime = 0;
        music.src = musicSrc;
        music.volume = volume;
        setMediaMetadata(pendingMetadataRef.current);
        setMusicDuration(0);
        musicDurationRef.current = 0;
        activeSourceRef.current = "music";
        setHasError(false);
        setAudioState("music");
        setIsPlaying(true);
        await music.play();
      } catch (error) {
        console.error("[Audio] Music playback failed:", error);
        setHasError(true);
        setIsPlaying(false);
        setAudioState("error");
      }
    },
    [setMediaMetadata],
  );

  useEffect(() => {
    const music = new Audio();
    const voice = new Audio();
    music.preload = "metadata";
    voice.preload = "metadata";
    musicRef.current = music;
    voiceRef.current = voice;

    const handleMusicLoadedMetadata = () => {
      const duration = Number.isFinite(music.duration) ? music.duration : 0;
      musicDurationRef.current = duration;
      setMusicDuration(duration);
    };

    const handleVoiceLoadedMetadata = () => {
      const duration = Number.isFinite(voice.duration) ? voice.duration : 0;
      voiceDurationRef.current = duration;
      setVoiceDuration(duration);
    };

    const handleVoiceTimeUpdate = () => {
      if (activeSourceRef.current !== "voice") return;
      setElapsedSeconds(voice.currentTime);
    };

    const handleMusicTimeUpdate = () => {
      if (activeSourceRef.current !== "music") return;
      setElapsedSeconds(voiceDurationRef.current + music.currentTime);
    };

    const handleVoiceEnded = () => {
      const pendingMusicSrc = pendingMusicSrcRef.current;
      if (!pendingMusicSrc) {
        activeSourceRef.current = null;
        setIsPlaying(false);
        setAudioState("complete");
        return;
      }
      void playMusicInternal(pendingMusicSrc, pendingMusicVolumeRef.current);
    };

    const handleMusicEnded = () => {
      activeSourceRef.current = null;
      const totalDuration = voiceDurationRef.current + musicDurationRef.current;
      setElapsedSeconds(totalDuration);
      setIsPlaying(false);
      setAudioState("complete");
      onMusicFinishedRef.current?.();
    };

    const handleMusicError = () => {
      console.error("[Audio] Music error", music.error);
      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    };

    const handleVoiceError = () => {
      console.error("[Audio] Voice error", voice.error);
      const pendingMusicSrc = pendingMusicSrcRef.current;
      if (pendingMusicSrc) {
        void playMusicInternal(pendingMusicSrc, pendingMusicVolumeRef.current);
        return;
      }
      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    };

    music.addEventListener("loadedmetadata", handleMusicLoadedMetadata);
    music.addEventListener("timeupdate", handleMusicTimeUpdate);
    music.addEventListener("ended", handleMusicEnded);
    music.addEventListener("error", handleMusicError);
    voice.addEventListener("loadedmetadata", handleVoiceLoadedMetadata);
    voice.addEventListener("timeupdate", handleVoiceTimeUpdate);
    voice.addEventListener("ended", handleVoiceEnded);
    voice.addEventListener("error", handleVoiceError);

    return () => {
      music.pause();
      voice.pause();
      music.removeEventListener("loadedmetadata", handleMusicLoadedMetadata);
      music.removeEventListener("timeupdate", handleMusicTimeUpdate);
      music.removeEventListener("ended", handleMusicEnded);
      music.removeEventListener("error", handleMusicError);
      voice.removeEventListener("loadedmetadata", handleVoiceLoadedMetadata);
      voice.removeEventListener("timeupdate", handleVoiceTimeUpdate);
      voice.removeEventListener("ended", handleVoiceEnded);
      voice.removeEventListener("error", handleVoiceError);
      musicRef.current = null;
      voiceRef.current = null;
    };
  }, [playMusicInternal]);

  const play = useCallback(
    async (
      musicSrc: string,
      voiceSrc: string | undefined,
      volume: number,
      metadata?: MediaMetadataInput,
    ) => {
      const music = musicRef.current;
      const voice = voiceRef.current;
      if (!music || !voice) return;

      setHasError(false);
      setElapsedSeconds(0);
      pendingMusicSrcRef.current = musicSrc;
      pendingMusicVolumeRef.current = volume;
      pendingMetadataRef.current = metadata ?? null;
      setMediaMetadata(metadata ?? null);

      music.pause();
      music.currentTime = 0;
      voice.pause();
      voice.currentTime = 0;
      setMusicDuration(0);
      musicDurationRef.current = 0;
      setVoiceDuration(0);
      voiceDurationRef.current = 0;
      music.volume = volume;
      voice.volume = volume;

      if (!voiceSrc) {
        await playMusicInternal(musicSrc, volume);
        return;
      }

      try {
        voice.src = voiceSrc;
        activeSourceRef.current = "voice";
        setAudioState("intro");
        setIsPlaying(true);
        await voice.play();
      } catch (error) {
        console.error("[Audio] Voice playback failed:", error);
        await playMusicInternal(musicSrc, volume);
      }
    },
    [playMusicInternal, setMediaMetadata],
  );

  const pause = useCallback(() => {
    musicRef.current?.pause();
    voiceRef.current?.pause();
    if (activeSourceRef.current) {
      setIsPlaying(false);
      setAudioState("paused");
    }
  }, []);

  const resume = useCallback(async () => {
    const music = musicRef.current;
    const voice = voiceRef.current;
    try {
      if (activeSourceRef.current === "voice" && voice) {
        await voice.play();
        setIsPlaying(true);
        setAudioState("intro");
        return;
      }
      if (activeSourceRef.current === "music" && music) {
        await music.play();
        setIsPlaying(true);
        setAudioState("music");
      }
    } catch (error) {
      console.error("[Audio] Resume failed:", error);
      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    }
  }, []);

  const pauseRef = useRef(pause);
  const resumeRef = useRef(resume);
  useEffect(() => {
    pauseRef.current = pause;
    resumeRef.current = resume;
  }, [pause, resume]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    const mediaSession = navigator.mediaSession;

    try {
      mediaSession.setActionHandler("play", () => void resumeRef.current());
      mediaSession.setActionHandler("pause", () => pauseRef.current());
    } catch (error) {
      console.warn("[Audio] Media Session controls unavailable:", error);
    }

    return () => {
      try {
        mediaSession.setActionHandler("play", null);
        mediaSession.setActionHandler("pause", null);
      } catch {
        // Some browsers reject clearing unsupported handlers.
      }
    };
  }, []);

  const skipGuide = useCallback(
    async (musicSrc: string, volume: number) => {
      const voice = voiceRef.current;
      if (voice) {
        voice.pause();
        voice.currentTime = 0;
      }
      pendingMusicSrcRef.current = null;
      pendingMusicVolumeRef.current = volume;
      setElapsedSeconds(0);
      await playMusicInternal(musicSrc, volume);
    },
    [playMusicInternal],
  );

  const stop = useCallback(() => {
    musicRef.current?.pause();
    voiceRef.current?.pause();
    if (musicRef.current) musicRef.current.currentTime = 0;
    if (voiceRef.current) voiceRef.current.currentTime = 0;
    activeSourceRef.current = null;
    pendingMusicSrcRef.current = null;
    pendingMetadataRef.current = null;
    setMediaMetadata(null);
    setIsPlaying(false);
    setAudioState("idle");
    setElapsedSeconds(0);
  }, [setMediaMetadata]);

  const totalDuration = voiceDuration + musicDuration;
  const remainingSeconds = Math.max(0, totalDuration - elapsedSeconds);

  return {
    audioState,
    hasError,
    isPlaying,
    voiceDuration,
    musicDuration,
    totalDuration,
    elapsedSeconds,
    remainingSeconds,
    play,
    pause,
    resume,
    skipGuide,
    stop,
  };
}
