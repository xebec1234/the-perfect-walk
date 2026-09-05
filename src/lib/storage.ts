import { DEFAULT_ORDER } from "@/data/stages";
import type { AppState } from "@/types/app-state";
import type { StageId } from "@/types/stage";
import { calculateStreak } from "./streak";
import { normalizeStageOrder } from "./stage-order";

const STORAGE_KEY = "the-perfect-walk:v1";

export function getDefaultAppState(): AppState {
  return {
    schemaVersion: 1,
    selectedOrder: [...DEFAULT_ORDER],
    streak: {
      current: 0,
      lastCompletedDate: null,
      totalCompleted: 0,
    },
    completedDates: [],
    preferences: {
      audioVolume: 0.82,
      hasCompletedFirstRun: false,
    },
  };
}

export function loadAppState(): AppState {
  if (typeof window === "undefined") return getDefaultAppState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultAppState();
    return migrateAppState(JSON.parse(raw));
  } catch {
    return getDefaultAppState();
  }
}

export function saveAppState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetAppState() {
  const state = getDefaultAppState();
  saveAppState(state);
  return state;
}

export function migrateAppState(input: Partial<AppState>): AppState {
  const base = getDefaultAppState();
  const completedDates = Array.isArray(input.completedDates) ? input.completedDates : [];
  return {
    ...base,
    ...input,
    schemaVersion: 1,
    selectedOrder: normalizeStageOrder(input.selectedOrder as StageId[] | undefined),
    completedDates,
    streak: {
      ...base.streak,
      ...(input.streak ?? {}),
      current: calculateStreak(completedDates),
      totalCompleted: completedDates.length,
    },
    preferences: {
      ...base.preferences,
      ...(input.preferences ?? {}),
    },
  };
}


