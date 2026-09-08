import type { GuidanceMode } from "@/types/stage";

export const GUIDANCE_MODES: GuidanceMode[] = [
  "discover",
  "remember",
  "trust",
  "embody",
];

export function getGuidanceMode(totalCompleted: number): GuidanceMode {
  if (totalCompleted < 7) {
    return "discover";
  }

  if (totalCompleted < 30) {
    return "remember";
  }

  if (totalCompleted < 60) {
    return "trust";
  }

  return "embody";
}

export function getMoreGuidanceModes(
  currentMode: GuidanceMode,
): GuidanceMode[] {
  const currentIndex = GUIDANCE_MODES.indexOf(currentMode);

  if (currentIndex < 0) {
    return ["discover"];
  }

  return GUIDANCE_MODES.slice(0, currentIndex + 1);
}