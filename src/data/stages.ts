import type { Stage, StageId } from "@/types/stage";

export const DEFAULT_ORDER: StageId[] = [
  "opening-heart",
  "feeling-power",
  "letting-go",
  "higher-power",
  "celebrate",
];

export const STAGES: Record<StageId, Stage> = {
  "opening-heart": {
    id: "opening-heart",
    number: 1,
    title: "Opening Your Heart",
    subtitle: "Begin gently",
    prompt: "Breathe into your heart. Let each step fall in love with itself.",
    durationSeconds: 7 * 60,
    voiceIntroSrc: "/audio/voice/opening-heart.wav",
    musicSrc: "/audio/music/opening-heart.wav",
    position: "first",
  },
  "feeling-power": {
    id: "feeling-power",
    number: 2,
    title: "Feeling Your Power",
    subtitle: "Feel what is already here",
    prompt: "Let your body remind you of your strength. You do not need to force a feeling.",
    durationSeconds: 5 * 60,
    voiceIntroSrc: "/audio/voice/feeling-power.wav",
    musicSrc: "/audio/music/feeling-power.wav",
    position: "middle",
  },
  "letting-go": {
    id: "letting-go",
    number: 3,
    title: "Letting Go & Total Presence",
    subtitle: "Come back to now",
    prompt: "Notice the next step, the air, the world around you. Gently return to the present.",
    durationSeconds: 5 * 60,
    voiceIntroSrc: "/audio/voice/letting-go.wav",
    musicSrc: "/audio/music/letting-go.wav",
    position: "middle",
  },
  "higher-power": {
    id: "higher-power",
    number: 4,
    title: "Connecting with Higher Power",
    subtitle: "Make room for what you believe",
    prompt: "Connect with whatever you believe. Or nothing at all. Simply make room for it.",
    durationSeconds: 5 * 60,
    voiceIntroSrc: "/audio/voice/higher-power.wav",
    musicSrc: "/audio/music/higher-power.wav",
    position: "middle",
  },
  celebrate: {
    id: "celebrate",
    number: 5,
    title: "Celebrate & Raise Your Vibration",
    subtitle: "Finish in celebration",
    prompt: "Celebrate being here. Let the feeling you found travel with you into the rest of today.",
    durationSeconds: 5 * 60,
    voiceIntroSrc: "/audio/voice/celebrate.wav",
    musicSrc: "/audio/music/celebrate.wav",
    position: "last",
  },
};

export function getStages(order: StageId[] = DEFAULT_ORDER) {
  return order.map((id) => STAGES[id]);
}

export function getTotalDuration(order: StageId[] = DEFAULT_ORDER) {
  return getStages(order).reduce((total, stage) => total + stage.durationSeconds, 0);
}
