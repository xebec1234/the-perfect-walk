import type { StageId } from "./stage";

export type AppState = {
  schemaVersion: number;
  selectedOrder: StageId[];
  streak: {
    current: number;
    lastCompletedDate: string | null;
    totalCompleted: number;
  };
  completedDates: string[];
  preferences: {
    audioVolume: number;
    hasCompletedFirstRun: boolean;
  };
  lastWalk?: {
    startedAt: string;
    completedAt?: string;
    stageId?: StageId;
    stageIndex?: number;
  };
};
