import type { GuidanceMode } from "@/types/stage";

export function getGuidanceMode(totalCompleted: number): GuidanceMode {
  if (totalCompleted <= 1) {
    return "discover";
  }

  if (totalCompleted <= 7) {
    return "remember";
  }

  if (totalCompleted <= 30) {
    return "trust";
  }

  return "embody";
}