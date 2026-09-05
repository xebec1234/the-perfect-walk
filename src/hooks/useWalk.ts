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

  // const totalCompleted =
  //   state?.streak.totalCompleted ?? 0;

  // const guidanceMode =
  //   getGuidanceMode(totalCompleted);

  const realTotalCompleted = state?.streak.totalCompleted ?? 0;

  // TEMPORARY TEST OVERRIDE
  // Change this number to test each guidance stage.
  // 0-1  = discover
  // 2-7  = remember
  // 8-30 = trust
  // 31+  = embody
  const testTotalCompleted = 60;

  const totalCompleted =
    process.env.NODE_ENV === "development"
      ? testTotalCompleted
      : realTotalCompleted;

  const guidanceMode = getGuidanceMode(totalCompleted);

  const shouldPlayVoice =
    guidanceMode === "discover" || guidanceMode === "remember";

  const [stageIndex, setStageIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [supportStageIndex, setSupportStageIndex] = useState<number | null>(
    null,
  );

  const audio = useAudio();

  const stage = stages[stageIndex];

  const guidance = stage?.guidance[guidanceMode];

  const timer = useTimer(stage?.durationSeconds ?? 0, () => {
    if (stageIndex < stages.length - 1) {
      setStageIndex((current) => current + 1);
    } else {
      setCompleted(true);
      setStarted(false);
      audio.stop();
      onComplete?.();
    }
  });

  // TEMPORARY TIMER DEBUGGING
  useEffect(() => {}, [stageIndex, stage]);

  useEffect(() => {}, [
    stageIndex,
    stage?.title,
    timer.remainingSeconds,
    timer.isRunning,
  ]);

  const showSupport =
    !(guidanceMode === "embody") && supportStageIndex === stageIndex;

  useEffect(() => {
    if (!stage) {
      return;
    }

    timer.reset(stage.durationSeconds);

    if (started) {
      timer.start();

      void audio.play(
        stage.musicSrc,
        shouldPlayVoice ? stage.voiceIntroSrc : undefined,
        volume,
      );
    }

    console.log("🚶 PERFECT WALK — STAGE", {
      stageNumber: stage.number,
      stageTitle: stage.title,
      stageId: stage.id,
      stageIndex,
      durationSeconds: stage.durationSeconds,
      guidanceMode,
      shouldPlayVoice,
    });
    // Timer/audio intentionally synchronize with the
    // currently selected stage.
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
      shouldPlayVoice ? stage.voiceIntroSrc : undefined,
      volume,
    );
  }, [audio, shouldPlayVoice, stage, timer, volume]);

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
  }, [audio, timer]);

  const setShowSupport = useCallback(
    (value: boolean | ((current: boolean) => boolean)) => {
      if (guidanceMode === "embody") {
        return;
      }

      const current = supportStageIndex === stageIndex;

      const next = typeof value === "function" ? value(current) : value;

      setSupportStageIndex(next ? stageIndex : null);
    },
    [guidanceMode, stageIndex, supportStageIndex],
  );

  return {
    stages,
    stageIndex,
    stage,
    started,
    completed,

    guidanceMode,
    guidance,
    shouldPlayVoice,

    showSupport,
    setShowSupport,

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
