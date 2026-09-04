"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { AppState } from "@/types/app-state";
import type { StageId } from "@/types/stage";

import { getLocalDateKey } from "@/lib/dates";
import { loadAppState, saveAppState } from "@/lib/storage";
import { calculateStreak } from "@/lib/streak";
import { normalizeStageOrder } from "@/lib/stage-order";

const APP_STATE_EVENT = "perfect-walk-state-change";

let cachedState: AppState | null = null;

function getSnapshot(): AppState {
  if (!cachedState) {
    cachedState = loadAppState();
  }

  return cachedState;
}

function getServerSnapshot(): AppState {
  return getSnapshot();
}

function subscribe(callback: () => void) {
  const handleCustomChange = () => {
    cachedState = loadAppState();
    callback();
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "perfect-walk-state") {
      cachedState = loadAppState();
      callback();
    }
  };

  window.addEventListener(APP_STATE_EVENT, handleCustomChange);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener(APP_STATE_EVENT, handleCustomChange);
    window.removeEventListener("storage", handleStorageChange);
  };
}

export function useAppState() {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const update = useCallback(
    (updater: (current: AppState) => AppState) => {
      const current = getSnapshot();
      const next = updater(current);

      cachedState = next;
      saveAppState(next);

      window.dispatchEvent(new Event(APP_STATE_EVENT));
    },
    [],
  );

  const setOrder = useCallback(
    (order: StageId[]) => {
      update((current) => ({
        ...current,
        selectedOrder: normalizeStageOrder(order),
      }));
    },
    [update],
  );

  const completeWalk = useCallback(() => {
    update((current) => {
      const today = getLocalDateKey();

      const completedDates = current.completedDates.includes(today)
        ? current.completedDates
        : [...current.completedDates, today];

      return {
        ...current,

        completedDates,

        streak: {
          current: calculateStreak(completedDates),
          lastCompletedDate: today,
          totalCompleted: completedDates.length,
        },

        lastWalk: {
          ...(current.lastWalk ?? {
            startedAt: new Date().toISOString(),
          }),
          completedAt: new Date().toISOString(),
        },
      };
    });
  }, [update]);

  const markWalkStarted = useCallback(() => {
    update((current) => ({
      ...current,
      lastWalk: {
        startedAt: new Date().toISOString(),
      },
    }));
  }, [update]);

  return {
    state,
    update,
    setOrder,
    completeWalk,
    markWalkStarted,
  };
}