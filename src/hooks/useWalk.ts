"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getStages } from "@/data/stages";
import { getGuidanceMode } from "@/lib/guidance";

import type {
  GuidanceMode,
  StageId,
} from "@/types/stage";

import { useAudio } from "./useAudio";
import { useAppState } from "./useAppState";

export function useWalk(
  order: StageId[],
  volume: number,
  onComplete?: () => void,
) {
  /*
   * ------------------------------------------------------------
   * STAGES
   * ------------------------------------------------------------
   */

  const stages = useMemo(
    () => getStages(order),
    [order],
  );

  /*
   * ------------------------------------------------------------
   * PROGRESSION / GUIDANCE
   * ------------------------------------------------------------
   */

  const { state } = useAppState();

  const realTotalCompleted =
    state?.streak.totalCompleted ?? 0;

  /*
   * Development override.
   *
   * Change this temporarily to:
   *
   *   7  -> Remember
   *   30 -> Trust
   *   60 -> Embody
   *
   * for testing the progression system.
   *
   * Remove the override before production.
   */
  const testTotalCompleted = 30;

  const totalCompleted =
    process.env.NODE_ENV === "development"
      ? testTotalCompleted
      : realTotalCompleted;

  /*
   * This is the guidance level the user has naturally
   * progressed to.
   *
   * It is NOT changed when the user asks for more guidance.
   */
  const defaultGuidanceMode =
    getGuidanceMode(totalCompleted);

  /*
   * Optional user request for additional support.
   *
   * null means:
   * "Use my normal progression level."
   */
  const [
    requestedGuidanceMode,
    setRequestedGuidanceMode,
  ] = useState<GuidanceMode | null>(null);

  /*
   * The actual guidance level used for the current stage.
   *
   * If the user has requested more guidance, use that.
   * Otherwise use their normal progression level.
   */
  const guidanceMode =
    requestedGuidanceMode ??
    defaultGuidanceMode;

  /*
   * Available guidance levels are always limited to the
   * user's current progression level.
   *
   * Examples:
   *
   * Remember:
   *   Discover
   *   Remember
   *
   * Trust:
   *   Discover
   *   Remember
   *   Trust
   *
   * Embody:
   *   Discover
   *   Remember
   *   Trust
   *   Embody
   */
  const availableGuidanceModes: GuidanceMode[] = [
    "discover",
    "remember",
    "trust",
    "embody",
  ].slice(
    0,
    [
      "discover",
      "remember",
      "trust",
      "embody",
    ].indexOf(defaultGuidanceMode) + 1,
  ) as GuidanceMode[];

  /*
   * Embody has no voice guide.
   *
   * All other guidance levels have a voice guide.
   */
  const shouldPlayVoice =
    guidanceMode !== "embody";

  /*
   * ------------------------------------------------------------
   * WALK STATE
   * ------------------------------------------------------------
   */

  const [stageIndex, setStageIndex] =
    useState(0);

  const [started, setStarted] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const completionHandledRef =
    useRef(false);

  const stage = stages[stageIndex];

  const guidance =
    stage?.guidance[guidanceMode];

  /*
   * ------------------------------------------------------------
   * ADVANCE TO NEXT STAGE
   * ------------------------------------------------------------
   */

  const advanceToNextStage =
    useCallback(() => {
      if (stageIndex < stages.length - 1) {
        /*
         * Important:
         *
         * More Guidance is intentionally temporary.
         *
         * If someone asks for extra support for one part,
         * the next part returns to their normal progression
         * level.
         *
         * This reinforces the idea that the app supports
         * the practice without making the user dependent
         * on it.
         */
        setRequestedGuidanceMode(null);

        setStageIndex(
          (current) => current + 1,
        );

        return;
      }

      /*
       * Final stage completed.
       */
      setRequestedGuidanceMode(null);

      setCompleted(true);
      setStarted(false);
    }, [
      stageIndex,
      stages.length,
    ]);

  /*
   * ------------------------------------------------------------
   * AUDIO COMPLETION
   * ------------------------------------------------------------
   */

  const handleMusicFinished =
    useCallback(() => {
      console.log(
        "[Walk] Music finished → next stage",
      );

      advanceToNextStage();
    }, [advanceToNextStage]);

  const audio = useAudio({
    onMusicFinished:
      handleMusicFinished,
  });

  /*
   * ------------------------------------------------------------
   * DEBUGGING
   * ------------------------------------------------------------
   */

  useEffect(() => {
    console.log(
      "[Walk] Guidance progression:",
      {
        totalCompleted,
        defaultGuidanceMode,
        requestedGuidanceMode,
        guidanceMode,
        shouldPlayVoice,
      },
    );
  }, [
    totalCompleted,
    defaultGuidanceMode,
    requestedGuidanceMode,
    guidanceMode,
    shouldPlayVoice,
  ]);

  useEffect(() => {
    console.log(
      "[Walk] Stage:",
      {
        stageIndex,
        stageId: stage?.id,
        title: stage?.title,
      },
    );
  }, [
    stageIndex,
    stage?.id,
    stage?.title,
  ]);

  /*
   * ------------------------------------------------------------
   * START CURRENT STAGE AUDIO
   * ------------------------------------------------------------
   *
   * This intentionally depends on stageIndex rather than
   * guidanceMode.
   *
   * That means changing "More Guidance" while music is already
   * playing will NOT restart or interrupt the current stage.
   *
   * The selected guidance level will be used when the next
   * stage begins.
   */

  useEffect(() => {
    if (!stage || !started) {
      return;
    }

    const voiceSrc =
      guidance?.voice || undefined;

    void audio.play(
      stage.musicSrc,
      shouldPlayVoice
        ? voiceSrc
        : undefined,
      volume,
    );

    // Intentionally only stageIndex controls
    // automatic stage playback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  /*
   * ------------------------------------------------------------
   * START WALK / STAGE
   * ------------------------------------------------------------
   */

  const start = useCallback(() => {
    if (!stage) {
      return;
    }

    setStarted(true);

    const voiceSrc =
      guidance?.voice || undefined;

    void audio.play(
      stage.musicSrc,
      shouldPlayVoice
        ? voiceSrc
        : undefined,
      volume,
    );
  }, [
    audio,
    guidance?.voice,
    shouldPlayVoice,
    stage,
    volume,
  ]);

  /*
   * ------------------------------------------------------------
   * MORE GUIDANCE
   * ------------------------------------------------------------
   *
   * Passing null restores the user's normal progression level.
   */

  const setGuidancePreference =
    useCallback(
      (mode: GuidanceMode | null) => {
        /*
         * Don't allow a manually selected mode above the
         * user's natural progression level.
         */
        if (
          mode !== null &&
          !availableGuidanceModes.includes(mode)
        ) {
          return;
        }

        setRequestedGuidanceMode(mode);
      },
      [availableGuidanceModes],
    );

  /*
   * ------------------------------------------------------------
   * AUDIO CONTROLS
   * ------------------------------------------------------------
   */

  const pause = useCallback(() => {
    audio.pause();
  }, [audio]);

  const resume = useCallback(() => {
    void audio.resume();
  }, [audio]);

  const skipGuide = useCallback(() => {
    if (!stage) {
      return;
    }

    void audio.skipGuide(
      stage.musicSrc,
      volume,
    );
  }, [
    audio,
    stage,
    volume,
  ]);

  /*
   * ------------------------------------------------------------
   * FINISH EARLY
   * ------------------------------------------------------------
   */

  const finishEarly =
    useCallback(() => {
      audio.stop();

      setStarted(false);
    }, [audio]);

  /*
   * ------------------------------------------------------------
   * COMPLETION
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (
      !completed ||
      completionHandledRef.current
    ) {
      return;
    }

    completionHandledRef.current = true;

    audio.stop();

    onComplete?.();
  }, [
    completed,
    onComplete,
    audio,
  ]);

  /*
   * ------------------------------------------------------------
   * RETURN
   * ------------------------------------------------------------
   */

  return {
    /*
     * Stage data
     */
    stages,
    stage,
    stageIndex,

    /*
     * Walk state
     */
    started,
    completed,

    /*
     * Guidance progression
     */
    guidanceMode,
    defaultGuidanceMode,
    requestedGuidanceMode,
    availableGuidanceModes,
    setGuidancePreference,

    /*
     * Current guidance content
     */
    guidance,
    shouldPlayVoice,

    /*
     * Actual audio timing
     */
    elapsedSeconds:
      audio.elapsedSeconds,

    remainingSeconds:
      audio.remainingSeconds,

    stageDuration:
      audio.totalDuration,

    voiceDuration:
      audio.voiceDuration,

    musicDuration:
      audio.musicDuration,

    /*
     * Audio state
     */
    isTimerRunning:
      audio.isPlaying,

    audioState:
      audio.audioState,

    isPlaying:
      audio.isPlaying,

    isPaused:
      audio.audioState === "paused",

    audioError:
      audio.hasError,

    hasAudioError:
      audio.hasError,

    isAudioPlaying:
      audio.isPlaying,

    /*
     * Controls
     */
    start,
    pause,
    resume,
    finishEarly,

    /*
     * Backwards-compatible alias
     */
    stop: finishEarly,

    skipGuide,
  };
}