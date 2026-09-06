"use client";

import { useEffect, useState } from "react";
import { getStages } from "@/data/stages";
import { getGuidanceMode } from "@/lib/guidance";
import type { GuidanceMode, StageId } from "@/types/stage";

function loadAudioDuration(src: string): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio();

    audio.preload = "metadata";

    const cleanup = () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("error", handleError);
    };

    const handleLoaded = () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
      cleanup();
      resolve(duration);
    };

    const handleError = () => {
      cleanup();
      resolve(0);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("error", handleError);
    audio.src = src;
    audio.load();
  });
}

export function useAudioDurations(
  order: StageId[] | undefined,
  totalCompleted: number,
) {
  const [durations, setDurations] = useState<Record<StageId, number>>(
    {} as Record<StageId, number>,
  );

  const [totalDuration, setTotalDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDurations() {
      setLoading(true);

      const stages = getStages(order);
      const guidanceMode: GuidanceMode =
        getGuidanceMode(totalCompleted);

      const entries = await Promise.all(
        stages.map(async (stage) => {
          const musicDuration = await loadAudioDuration(stage.musicSrc);

          const voiceSrc = stage.guidance[guidanceMode]?.voice;

          const voiceDuration = voiceSrc
            ? await loadAudioDuration(voiceSrc)
            : 0;

          return [
            stage.id,
            voiceDuration + musicDuration,
          ] as const;
        }),
      );

      if (cancelled) return;

      const nextDurations = Object.fromEntries(entries) as Record<
        StageId,
        number
      >;

      setDurations(nextDurations);

      setTotalDuration(
        Object.values(nextDurations).reduce(
          (total, duration) => total + duration,
          0,
        ),
      );

      setLoading(false);
    }

    void loadDurations();

    return () => {
      cancelled = true;
    };
  }, [order, totalCompleted]);

  return {
    durations,
    totalDuration,
    loading,
  };
}