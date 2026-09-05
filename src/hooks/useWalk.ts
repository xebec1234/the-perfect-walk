"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { getStages } from "@/data/stages";
import { getGuidanceMode } from "@/lib/guidance";

import type { StageId } from "@/types/stage";

import { useAudio } from "./useAudio";
import { useAppState } from "./useAppState";
import { useTimer } from "./useTimer";

export function useWalk(
  order: StageId[],
  volume: number,
  onComplete?: () => void,
) {
  const stages = useMemo(() => getStages(order), [order]);

  const { state } = useAppState();

  const guidanceMode = getGuidanceMode(state.streak.totalCompleted);

  const [stageIndex, setStageIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const audio = useAudio();

  const timer = useTimer(
    stages[stageIndex]?.durationSeconds ?? 0,
    () => {
      if (stageIndex < stages.length - 1) {
        setStageIndex((current) => current + 1);
      } else {
        setCompleted(true);
        setStarted(false);
        audio.stop();
        onComplete?.();
      }
    },
  );

  const stage = stages[stageIndex];

  const guidance = stage?.guidance[guidanceMode];

  useEffect(() => {
    timer.reset(stage?.durationSeconds ?? 0);

    if (started && stage) {
      void audio.play(
        stage.musicSrc,
        stage.voiceIntroSrc,
        volume,
      );

      timer.start();
    }

    // We intentionally respond only to stage changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  const start = useCallback(() => {
    if (!stage) {
      return;
    }

    setStarted(true);

    timer.start();

    void audio.play(
      stage.musicSrc,
      stage.voiceIntroSrc,
      volume,
    );
  }, [audio, stage, timer, volume]);

  const pause = useCallback(() => {
    timer.pause();
    audio.pause();
  }, [audio, timer]);

  const resume = useCallback(() => {
    timer.start();
    void audio.resume();
  }, [audio, timer]);

  const finishEarly = useCallback(() => {
    timer.pause();
    audio.stop();
    setStarted(false);

    // Ending early is NOT a completed walk.
    // The user's streak/progress should not advance.
  }, [audio, timer]);

  return {
    stages,
    stageIndex,
    stage,
    started,
    completed,

    guidanceMode,
    guidance,

    remainingSeconds: timer.remainingSeconds,
    isPaused: started && !timer.isRunning,
    isPlaying: audio.isPlaying,
    audioError: audio.hasError,

    start,
    pause,
    resume,
    finishEarly,
  };
}