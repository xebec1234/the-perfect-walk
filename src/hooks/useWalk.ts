"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getStages } from "@/data/stages";
import { getGuidanceMode } from "@/lib/guidance";
import type { StageId } from "@/types/stage";

import { useAudio } from "./useAudio";
import { useAppState } from "./useAppState";

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
   * Stage progression is now driven by the actual
   * audio ending rather than a manually configured
   * durationSeconds value.
   */
  const advanceToNextStage = useCallback(() => {
    if (stageIndex < stages.length - 1) {
      setStageIndex((current) => current + 1);
      return;
    }

    setCompleted(true);
    setStarted(false);
  }, [stageIndex, stages.length]);

  const handleMusicFinished = useCallback(() => {
    console.log("[Walk] Music finished → next stage");

    advanceToNextStage();
  }, [advanceToNextStage]);

  const audio = useAudio({
    onMusicFinished: handleMusicFinished,
  });

  /*
   * Development logging.
   */
  useEffect(() => {
    console.log("[Walk] Stage changed:", {
      stageIndex,
      stageNumber: stage?.number,
      title: stage?.title,
      voiceDuration: audio.voiceDuration,
      musicDuration: audio.musicDuration,
      totalDuration: audio.totalDuration,
      guidanceMode,
    });
  }, [
    stageIndex,
    stage,
    guidanceMode,
    audio.voiceDuration,
    audio.musicDuration,
    audio.totalDuration,
  ]);

  useEffect(() => {
    console.log("[Walk] Audio:", {
      stageIndex,
      title: stage?.title,
      audioState: audio.audioState,
      isPlaying: audio.isPlaying,
      elapsedSeconds: audio.elapsedSeconds,
      remainingSeconds: audio.remainingSeconds,
      totalDuration: audio.totalDuration,
    });
  }, [
    stageIndex,
    stage?.title,
    audio.audioState,
    audio.isPlaying,
    audio.elapsedSeconds,
    audio.remainingSeconds,
    audio.totalDuration,
  ]);

  /*
   * When the stage changes:
   *
   * GUIDE → MUSIC → next stage
   *
   * The actual audio files determine the duration.
   */
  useEffect(() => {
    if (!stage || !started) {
      return;
    }

    const voiceSrc = guidance?.voice || undefined;

    void audio.play(
      stage.musicSrc,
      shouldPlayVoice ? voiceSrc : undefined,
      volume,
    );

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
    volume,
  ]);

  /*
   * Pause audio.
   */
  const pause = useCallback(() => {
    audio.pause();
  }, [audio]);

  /*
   * Resume audio.
   */
  const resume = useCallback(() => {
    void audio.resume();
  }, [audio]);

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

    audio.stop();
    setStarted(false);
  }, [audio]);

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

    /*
     * Dynamic audio-derived timing.
     */
    elapsedSeconds: audio.elapsedSeconds,
    remainingSeconds: audio.remainingSeconds,
    stageDuration: audio.totalDuration,

    voiceDuration: audio.voiceDuration,
    musicDuration: audio.musicDuration,

    isTimerRunning: audio.isPlaying,

    audioState: audio.audioState,

    isPlaying: audio.isPlaying,

    isPaused: audio.audioState === "paused",

    audioError: audio.hasError,
    hasAudioError: audio.hasError,
    isAudioPlaying: audio.isPlaying,

    start,
    pause,
    resume,
    finishEarly,

    stop: finishEarly,

    skipGuide,
  };
}