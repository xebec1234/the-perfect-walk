"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getStages } from "@/data/stages";
import { getGuidanceMode } from "@/lib/guidance";
import type { StageId } from "@/types/stage";
import { useAudio } from "./useAudio";
import { useAppState } from "./useAppState";
import { useTimer } from "./useTimer";

const USE_AUDIO_FOR_TEST_PROGRESSION = process.env.NODE_ENV === "development";

export function useWalk(
  order: StageId[],
  volume: number,
  onComplete?: () => void,
) {
  const stages = useMemo(() => getStages(order), [order]);

  const { state } = useAppState();

  const realTotalCompleted = state?.streak.totalCompleted ?? 0;

  /*
   * TEMPORARY TEST OVERRIDE
   *
   * 0-1   = discover
   * 2-7   = remember
   * 8-30  = trust
   * 31+   = embody
   *
   * Change this number while testing the
   * different guidance modes.
   */
  const testTotalCompleted = 0;

  const totalCompleted =
    process.env.NODE_ENV === "development"
      ? testTotalCompleted
      : realTotalCompleted;

  const guidanceMode = getGuidanceMode(totalCompleted);

  const shouldPlayVoice =
    guidanceMode === "discover" ||
    guidanceMode === "remember" ||
    guidanceMode === "trust";

  const [stageIndex, setStageIndex] = useState(0);

  const [started, setStarted] = useState(false);

  const [completed, setCompleted] = useState(false);

  const completionHandledRef = useRef(false);

  const stage = stages[stageIndex];

  const guidance = stage?.guidance[guidanceMode];

  /*
   * Move to the next stage.
   *
   * In development/test mode this is triggered
   * by MUSIC ending.
   *
   * In production this is triggered by the timer.
   */
  const advanceToNextStage = useCallback(() => {
    if (stageIndex < stages.length - 1) {
      setStageIndex((current) => current + 1);
      return;
    }

    setCompleted(true);
    setStarted(false);
  }, [stageIndex, stages.length]);

  /*
   * MUSIC finished.
   *
   * This is the Sprint 1 test progression path.
   */
  const handleMusicFinished = useCallback(() => {
    if (!USE_AUDIO_FOR_TEST_PROGRESSION) {
      return;
    }

    console.log("[Walk] Music finished → next stage");

    advanceToNextStage();
  }, [advanceToNextStage]);

  const audio = useAudio({
    onMusicFinished: handleMusicFinished,
  });

  const timer = useTimer(stage?.durationSeconds ?? 0, () => {
    if (USE_AUDIO_FOR_TEST_PROGRESSION) {
      return;
    }

    advanceToNextStage();
  });

  /*
   * Development logging.
   */
  useEffect(() => {
    console.log("[Walk] Stage changed:", {
      stageIndex,
      stageNumber: stage?.number,
      title: stage?.title,
      durationSeconds: stage?.durationSeconds,
      guidanceMode,
    });
  }, [stageIndex, stage, guidanceMode]);

  useEffect(() => {
    console.log("[Walk] Audio:", {
      stageIndex,
      title: stage?.title,
      audioState: audio.audioState,
      isPlaying: audio.isPlaying,
    });
  }, [stageIndex, stage?.title, audio.audioState, audio.isPlaying]);

  useEffect(() => {
    console.log("[Walk] Timer:", {
      stageIndex,
      title: stage?.title,
      remainingSeconds: timer.remainingSeconds,
      isRunning: timer.isRunning,
      testMode: USE_AUDIO_FOR_TEST_PROGRESSION,
    });
  }, [stageIndex, stage?.title, timer.remainingSeconds, timer.isRunning]);

  /*
   * When the stage changes:
   *
   * 1. Reset timer.
   * 2. If walk is started, start the stage.
   *
   * Development:
   *   GUIDE → MUSIC → next stage
   *
   * Production:
   *   GUIDE → MUSIC → timer → next stage
   */
  useEffect(() => {
    if (!stage) {
      return;
    }

    timer.reset(stage.durationSeconds);

    if (!started) {
      return;
    }

    const voiceSrc = guidance?.voice || undefined;

    void audio.play(
      stage.musicSrc,
      shouldPlayVoice ? voiceSrc : undefined,
      volume,
    );

    if (!USE_AUDIO_FOR_TEST_PROGRESSION) {
      timer.start();
    }

    // Intentionally responds to stageIndex only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  /*
   * Start the current stage.
   */
  const start = useCallback(() => {
    if (!stage) {
      return;
    }

    console.log("[Walk] Starting stage", {
      stageIndex,
      title: stage.title,
    });

    setStarted(true);

    if (!USE_AUDIO_FOR_TEST_PROGRESSION) {
      timer.start();
    }

    const voiceSrc = guidance?.voice || undefined;

    void audio.play(
      stage.musicSrc,
      shouldPlayVoice ? voiceSrc : undefined,
      volume,
    );
  }, [
    audio,
    guidance?.voice,
    shouldPlayVoice,
    stage,
    stageIndex,
    timer,
    volume,
  ]);

  /*
   * Pause audio and production timer.
   */
  const pause = useCallback(() => {
    timer.pause();
    audio.pause();
  }, [audio, timer]);

  /*
   * Resume audio and production timer.
   */
  const resume = useCallback(() => {
    if (!USE_AUDIO_FOR_TEST_PROGRESSION) {
      timer.start();
    }

    void audio.resume();
  }, [audio, timer]);

  /*
   * Skip the guide and immediately start music.
   */
  const skipGuide = useCallback(() => {
    if (!stage) {
      return;
    }

    void audio.skipGuide(stage.musicSrc, volume);
  }, [audio, stage, volume]);

  /*
   * End the walk early.
   */
  const finishEarly = useCallback(() => {
    console.log("[Walk] Ending walk early");

    timer.pause();
    audio.stop();
    setStarted(false);
  }, [audio, timer]);


  /*
   * Final stage completed.
   */
  useEffect(() => {
    if (!completed || completionHandledRef.current) {
      return;
    }

    completionHandledRef.current = true;

    audio.stop();
    onComplete?.();
  }, [completed, onComplete, audio]);

  /*
   * PUBLIC API
   *
   * These names intentionally match what
   * Walk.tsx expects.
   */
  return {
    stages,

    stage,
    stageIndex,

    started,
    completed,

    guidanceMode,
    guidance,
    shouldPlayVoice,

    remainingSeconds: timer.remainingSeconds,

    isTimerRunning: timer.isRunning,

    audioState: audio.audioState,

    /*
     * UI-friendly aliases.
     */
    isPlaying: audio.isPlaying,

    isPaused: audio.audioState === "paused",

    audioError: audio.hasError,

    hasAudioError: audio.hasError,

    isAudioPlaying: audio.isPlaying,

    /*
     * Controls.
     */
    start,
    pause,
    resume,
    finishEarly,

    stop: finishEarly,

    skipGuide,
  };
}
