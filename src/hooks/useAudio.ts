"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AudioState =
  | "idle"
  | "intro"
  | "music"
  | "paused"
  | "error"
  | "complete";

type UseAudioOptions = {
  onMusicFinished?: () => void;
};

export function useAudio({
  onMusicFinished,
}: UseAudioOptions = {}) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const onMusicFinishedRef = useRef(onMusicFinished);

  const pendingMusicSrcRef = useRef<string | null>(null);
  const pendingMusicVolumeRef = useRef(1);

  const activeSourceRef = useRef<
    "voice" | "music" | null
  >(null);

  const voiceDurationRef = useRef(0);
  const musicDurationRef = useRef(0);

  const [audioState, setAudioState] =
    useState<AudioState>("idle");

  const [hasError, setHasError] =
    useState(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [voiceDuration, setVoiceDuration] =
    useState(0);

  const [musicDuration, setMusicDuration] =
    useState(0);

  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  /*
   * Keep the latest completion callback available
   * to native audio event handlers.
   */
  useEffect(() => {
    onMusicFinishedRef.current = onMusicFinished;
  }, [onMusicFinished]);

  /*
   * Keep duration refs synchronized with state.
   *
   * Event listeners use refs so they don't need to
   * be recreated whenever metadata loads.
   */
  useEffect(() => {
    voiceDurationRef.current = voiceDuration;
  }, [voiceDuration]);

  useEffect(() => {
    musicDurationRef.current = musicDuration;
  }, [musicDuration]);

  /*
   * Play music only.
   *
   * This function is declared BEFORE the effect that
   * needs to call it.
   */
  const playMusicInternal = useCallback(
    async (
      musicSrc: string,
      volume: number,
    ) => {
      const music = musicRef.current;

      if (!music) {
        return;
      }

      try {
        music.pause();
        music.currentTime = 0;

        music.src = musicSrc;
        music.volume = volume;

        /*
         * Reset the duration for the new music file.
         * loadedmetadata will populate the real value.
         */
        setMusicDuration(0);
        musicDurationRef.current = 0;

        activeSourceRef.current = "music";

        setHasError(false);
        setAudioState("music");
        setIsPlaying(true);

        await music.play();
      } catch (error) {
        console.error(
          "[Audio] Music playback failed:",
          error,
        );

        setHasError(true);
        setIsPlaying(false);
        setAudioState("error");
      }
    },
    [],
  );

  /*
   * Create audio elements ONCE.
   *
   * Important:
   * This effect intentionally has an empty dependency
   * array. We do not want React recreating the audio
   * elements whenever duration state changes.
   */
  useEffect(() => {
    const music = new Audio();
    const voice = new Audio();

    music.preload = "metadata";
    voice.preload = "metadata";

    musicRef.current = music;
    voiceRef.current = voice;

    /*
     * MUSIC METADATA
     *
     * This is where the browser gives us the actual
     * duration of the music file.
     */
    const handleMusicLoadedMetadata = () => {
      const duration = Number.isFinite(
        music.duration,
      )
        ? music.duration
        : 0;

      musicDurationRef.current = duration;
      setMusicDuration(duration);

      console.log(
        "[Audio] Music duration:",
        duration,
      );
    };

    /*
     * VOICE METADATA
     *
     * This is where the browser gives us the actual
     * duration of the voice file.
     */
    const handleVoiceLoadedMetadata = () => {
      const duration = Number.isFinite(
        voice.duration,
      )
        ? voice.duration
        : 0;

      voiceDurationRef.current = duration;
      setVoiceDuration(duration);

      console.log(
        "[Audio] Voice duration:",
        duration,
      );
    };

    /*
     * Voice playback position.
     */
    const handleVoiceTimeUpdate = () => {
      if (
        activeSourceRef.current !== "voice"
      ) {
        return;
      }

      setElapsedSeconds(
        voice.currentTime,
      );
    };

    /*
     * Music playback position.
     *
     * Total stage elapsed time is:
     *
     * voice duration + music currentTime
     */
    const handleMusicTimeUpdate = () => {
      if (
        activeSourceRef.current !== "music"
      ) {
        return;
      }

      setElapsedSeconds(
        voiceDurationRef.current +
          music.currentTime,
      );
    };

    /*
     * Voice finished.
     *
     * Immediately begin the music.
     */
    const handleVoiceEnded = () => {
      const pendingMusicSrc =
        pendingMusicSrcRef.current;

      if (!pendingMusicSrc) {
        activeSourceRef.current = null;

        setIsPlaying(false);
        setAudioState("complete");

        return;
      }

      void playMusicInternal(
        pendingMusicSrc,
        pendingMusicVolumeRef.current,
      );
    };

    /*
     * Music finished.
     *
     * This is the actual stage completion event.
     */
    const handleMusicEnded = () => {
      activeSourceRef.current = null;

      const totalDuration =
        voiceDurationRef.current +
        musicDurationRef.current;

      setElapsedSeconds(totalDuration);
      setIsPlaying(false);
      setAudioState("complete");

      console.log(
        "[Audio] Music finished:",
        {
          voiceDuration:
            voiceDurationRef.current,
          musicDuration:
            musicDurationRef.current,
          totalDuration,
        },
      );

      onMusicFinishedRef.current?.();
    };

    /*
     * Music error.
     */
    const handleMusicError = () => {
      console.error(
        "[Audio] Music error",
        music.error,
      );

      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    };

    /*
     * Voice error.
     *
     * Voice is optional. If it fails, continue
     * directly to the music.
     */
    const handleVoiceError = () => {
      console.error(
        "[Audio] Voice error",
        voice.error,
      );

      const pendingMusicSrc =
        pendingMusicSrcRef.current;

      if (pendingMusicSrc) {
        void playMusicInternal(
          pendingMusicSrc,
          pendingMusicVolumeRef.current,
        );

        return;
      }

      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    };

    music.addEventListener(
      "loadedmetadata",
      handleMusicLoadedMetadata,
    );

    music.addEventListener(
      "timeupdate",
      handleMusicTimeUpdate,
    );

    music.addEventListener(
      "ended",
      handleMusicEnded,
    );

    music.addEventListener(
      "error",
      handleMusicError,
    );

    voice.addEventListener(
      "loadedmetadata",
      handleVoiceLoadedMetadata,
    );

    voice.addEventListener(
      "timeupdate",
      handleVoiceTimeUpdate,
    );

    voice.addEventListener(
      "ended",
      handleVoiceEnded,
    );

    voice.addEventListener(
      "error",
      handleVoiceError,
    );

    return () => {
      music.pause();
      voice.pause();

      music.removeEventListener(
        "loadedmetadata",
        handleMusicLoadedMetadata,
      );

      music.removeEventListener(
        "timeupdate",
        handleMusicTimeUpdate,
      );

      music.removeEventListener(
        "ended",
        handleMusicEnded,
      );

      music.removeEventListener(
        "error",
        handleMusicError,
      );

      voice.removeEventListener(
        "loadedmetadata",
        handleVoiceLoadedMetadata,
      );

      voice.removeEventListener(
        "timeupdate",
        handleVoiceTimeUpdate,
      );

      voice.removeEventListener(
        "ended",
        handleVoiceEnded,
      );

      voice.removeEventListener(
        "error",
        handleVoiceError,
      );

      musicRef.current = null;
      voiceRef.current = null;
    };
  }, [playMusicInternal]);

  /*
   * Start a stage.
   *
   * With voice:
   *
   *   VOICE → MUSIC → onMusicFinished
   *
   * Without voice:
   *
   *   MUSIC → onMusicFinished
   */
  const play = useCallback(
    async (
      musicSrc: string,
      voiceSrc: string | undefined,
      volume: number,
    ) => {
      const music = musicRef.current;
      const voice = voiceRef.current;

      if (!music || !voice) {
        return;
      }

      setHasError(false);
      setElapsedSeconds(0);

      /*
       * Store music so the voice's ended event
       * knows what to play next.
       */
      pendingMusicSrcRef.current =
        musicSrc;

      pendingMusicVolumeRef.current =
        volume;

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

      /*
       * No voice for this guidance mode.
       */
      if (!voiceSrc) {
        await playMusicInternal(
          musicSrc,
          volume,
        );

        return;
      }

      try {
        voice.src = voiceSrc;

        activeSourceRef.current =
          "voice";

        setAudioState("intro");
        setIsPlaying(true);

        await voice.play();
      } catch (error) {
        console.error(
          "[Audio] Voice playback failed:",
          error,
        );

        /*
         * Voice failure should not prevent the
         * actual walk music from playing.
         */
        await playMusicInternal(
          musicSrc,
          volume,
        );
      }
    },
    [playMusicInternal],
  );

  /*
   * Pause current audio.
   */
  const pause = useCallback(() => {
    musicRef.current?.pause();
    voiceRef.current?.pause();

    if (activeSourceRef.current) {
      setIsPlaying(false);
      setAudioState("paused");
    }
  }, []);

  /*
   * Resume whichever audio source is active.
   */
  const resume = useCallback(async () => {
    const music = musicRef.current;
    const voice = voiceRef.current;

    try {
      if (
        activeSourceRef.current ===
          "voice" &&
        voice
      ) {
        await voice.play();

        setIsPlaying(true);
        setAudioState("intro");

        return;
      }

      if (
        activeSourceRef.current ===
          "music" &&
        music
      ) {
        await music.play();

        setIsPlaying(true);
        setAudioState("music");
      }
    } catch (error) {
      console.error(
        "[Audio] Resume failed:",
        error,
      );

      setHasError(true);
      setIsPlaying(false);
      setAudioState("error");
    }
  }, []);

  /*
   * Skip voice guide and immediately begin music.
   */
  const skipGuide = useCallback(
    async (
      musicSrc: string,
      volume: number,
    ) => {
      const voice = voiceRef.current;

      if (voice) {
        voice.pause();
        voice.currentTime = 0;
      }

      /*
       * We are intentionally starting music now,
       * so clear the pending voice → music handoff.
       */
      pendingMusicSrcRef.current =
        null;

      pendingMusicVolumeRef.current =
        volume;

      /*
       * When skipping the guide, elapsed time
       * starts from the beginning of the music.
       */
      setElapsedSeconds(0);

      await playMusicInternal(
        musicSrc,
        volume,
      );
    },
    [playMusicInternal],
  );

  /*
   * Stop everything.
   */
  const stop = useCallback(() => {
    musicRef.current?.pause();
    voiceRef.current?.pause();

    if (musicRef.current) {
      musicRef.current.currentTime = 0;
    }

    if (voiceRef.current) {
      voiceRef.current.currentTime = 0;
    }

    activeSourceRef.current = null;
    pendingMusicSrcRef.current = null;

    setIsPlaying(false);
    setAudioState("idle");
    setElapsedSeconds(0);
  }, []);

  /*
   * ACTUAL STAGE DURATION
   *
   * This is the calculation you were asking about.
   *
   * The browser supplies:
   *
   *   voice.duration
   *   music.duration
   *
   * We add them together.
   */
  const totalDuration =
    voiceDuration + musicDuration;

  /*
   * ACTUAL REMAINING TIME
   */
  const remainingSeconds = Math.max(
    0,
    totalDuration - elapsedSeconds,
  );

  return {
    audioState,
    hasError,
    isPlaying,

    /*
     * Actual file durations.
     */
    voiceDuration,
    musicDuration,

    /*
     * Actual calculated stage duration.
     */
    totalDuration,

    /*
     * Actual playback position.
     */
    elapsedSeconds,
    remainingSeconds,

    play,
    pause,
    resume,
    skipGuide,
    stop,
  };
}