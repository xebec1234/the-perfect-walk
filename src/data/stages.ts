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
    prompt:
      "Breathe into your heart. Let each step fall in love with itself.",
    durationSeconds: 5,
    voiceIntroSrc: "/audio/voice/opening-heart.wav",
    musicSrc: "/audio/music/opening-heart.wav",
    position: "first",

    guidance: {
      discover: {
        intro:
          "Begin gently. Notice your breath, your body, and the simple act of walking.",
        anchor:
          "Bring your attention toward your heart. You don't need to create a feeling. Simply notice what is already here.",
      },

      remember: {
        intro: "",
        anchor:
          "Open your heart and let yourself notice what is here.",
      },

      trust: {
        intro: "",
        anchor: "Open your heart.",
      },

      embody: {
        intro: "",
        anchor: "",
      },
    },
  },

  "feeling-power": {
    id: "feeling-power",
    number: 2,
    title: "Feeling Your Power",
    subtitle: "Feel what is already here",
    prompt:
      "Let your body remind you of your strength. You do not need to force a feeling.",
    durationSeconds: 5,
    voiceIntroSrc: "/audio/voice/feeling-power.wav",
    musicSrc: "/audio/music/feeling-power.wav",
    position: "middle",

    guidance: {
      discover: {
        intro:
          "Notice your body as you walk. Let your movement become an anchor.",
        anchor:
          "Feel what is already here. You don't need to force strength or any particular emotion.",
      },

      remember: {
        intro: "",
        anchor:
          "Feel your body moving. Let it remind you of what is already here.",
      },

      trust: {
        intro: "",
        anchor: "Feel.",
      },

      embody: {
        intro: "",
        anchor: "",
      },
    },
  },

  "letting-go": {
    id: "letting-go",
    number: 3,
    title: "Letting Go & Total Presence",
    subtitle: "Come back to now",
    prompt:
      "Notice the next step, the air, the world around you. Gently return to the present.",
    durationSeconds: 5,
    voiceIntroSrc: "/audio/voice/letting-go.wav",
    musicSrc: "/audio/music/letting-go.wav",
    position: "middle",

    guidance: {
      discover: {
        intro:
          "There is nothing you need to figure out right now.",
        anchor:
          "Notice the next step, the air, and the world around you. When the mind wanders, gently return to what is here.",
      },

      remember: {
        intro: "",
        anchor:
          "Come back to the next step, the breath, the world around you.",
      },

      trust: {
        intro: "",
        anchor: "Return to now.",
      },

      embody: {
        intro: "",
        anchor: "",
      },
    },
  },

  "higher-power": {
    id: "higher-power",
    number: 4,
    title: "Connecting with Higher Power",
    subtitle: "Make room for what you believe",
    prompt:
      "Connect with whatever you believe. Or nothing at all. Simply make room for it.",
    durationSeconds: 5,
    voiceIntroSrc: "/audio/voice/higher-power.wav",
    musicSrc: "/audio/music/higher-power.wav",
    position: "middle",

    guidance: {
      discover: {
        intro:
          "Make a little room for what is meaningful to you.",
        anchor:
          "Connect with whatever you believe. Or nothing at all. You don't need to define the experience.",
      },

      remember: {
        intro: "",
        anchor:
          "Connect in whatever way feels natural to you.",
      },

      trust: {
        intro: "",
        anchor:
          "Make room.",
      },

      embody: {
        intro: "",
        anchor: "",
      },
    },
  },

  celebrate: {
    id: "celebrate",
    number: 5,
    title: "Celebrate & Raise Your Vibration",
    subtitle: "Finish in celebration",
    prompt:
      "Celebrate being here. Let the feeling you found travel with you into the rest of today.",
    durationSeconds: 5,
    voiceIntroSrc: "/audio/voice/celebrate.wav",
    musicSrc: "/audio/music/celebrate.wav",
    position: "last",

    guidance: {
      discover: {
        intro:
          "Let yourself notice that you showed up for this walk.",
        anchor:
          "Celebrate being here. Let whatever you discovered travel with you into the rest of your day.",
      },

      remember: {
        intro: "",
        anchor:
          "Carry whatever is here with you into the rest of today.",
      },

      trust: {
        intro: "",
        anchor:
          "Celebrate being here.",
      },

      embody: {
        intro: "",
        anchor: "",
      },
    },
  },
};

export function getStages(
  order: StageId[] = DEFAULT_ORDER,
): Stage[] {
  return order.map((id) => STAGES[id]);
}

export function getTotalDuration(
  order: StageId[] = DEFAULT_ORDER,
): number {
  return getStages(order).reduce(
    (total, stage) => total + stage.durationSeconds,
    0,
  );
}