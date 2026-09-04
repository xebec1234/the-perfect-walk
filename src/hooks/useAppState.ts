"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppState } from "@/types/app-state";
import type { StageId } from "@/types/stage";
import { getLocalDateKey } from "@/lib/dates";
import { loadAppState, saveAppState } from "@/lib/storage";
import { calculateStreak } from "@/lib/streak";
import { normalizeStageOrder } from "@/lib/stage-order";

export function useAppState() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    setState(loadAppState());
  }, []);

  const update = useCallback((updater: (current: AppState) => AppState) => {
    setState((current) => {
      if (!current) return current;
      const next = updater(current);
      saveAppState(next);
      return next;
    });
  }, []);

  const setOrder = useCallback((order: StageId[]) => {
    update((current) => ({ ...current, selectedOrder: normalizeStageOrder(order) }));
  }, [update]);

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
          ...(current.lastWalk ?? { startedAt: new Date().toISOString() }),
          completedAt: new Date().toISOString(),
        },
      };
    });
  }, [update]);

  const markWalkStarted = useCallback(() => {
    update((current) => ({
      ...current,
      lastWalk: { startedAt: new Date().toISOString() },
    }));
  }, [update]);

  return { state, update, setOrder, completeWalk, markWalkStarted };
}
