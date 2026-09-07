import type { GuidanceMode } from "@/types/stage";

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
