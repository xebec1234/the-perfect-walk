import type { StageId } from "./stage";

export type AudioState =
  | "idle"
  | "intro"
  | "music"
  | "paused"
  | "error"
  | "complete";

export type ActiveSource = "guide" | "music" | null;

export type WalkRuntimeState = {
  isRunning: boolean;
  isPaused: boolean;
  currentStageIndex: number;
  currentStageId: StageId;
  elapsedSeconds: number;
  remainingSeconds: number;
  audioState: AudioState;
};
