"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getStages } from "@/data/stages";
import type { StageId } from "@/types/stage";
import { useAudio } from "./useAudio";
import { useTimer } from "./useTimer";

export function useWalk(order: StageId[], volume: number, onComplete?: () => void) {
  const stages = useMemo(() => getStages(order), [order]);
  const [stageIndex, setStageIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const audio = useAudio();
  const timer = useTimer(stages[stageIndex]?.durationSeconds ?? 0, () => {
    if (stageIndex < stages.length - 1) {
      setStageIndex((current) => current + 1);
    } else {
      setCompleted(true);
      setStarted(false);
      audio.stop();
      onComplete?.();
    }
  });

  useEffect(() => {
    timer.reset(stages[stageIndex]?.durationSeconds ?? 0);
    if (started) {
      void audio.play(stages[stageIndex].musicSrc, stages[stageIndex].voiceIntroSrc, volume);
      timer.start();
    }
    // We intentionally respond only to stage changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  const start = useCallback(() => {
    setStarted(true);
    timer.start();
    void audio.play(stages[stageIndex].musicSrc, stages[stageIndex].voiceIntroSrc, volume);
  }, [audio, stageIndex, stages, timer, volume]);

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
    setCompleted(true);
    onComplete?.();
  }, [audio, onComplete, timer]);

  return {
    stages,
    stageIndex,
    stage: stages[stageIndex],
    started,
    completed,
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
