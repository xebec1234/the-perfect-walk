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
    musicSrc: "/audio/music/opening-heart.wav",
    position: "first",

    guidance: {
      discover: {
        intro:
          "Begin gently. Notice your breath, your body, and the simple act of walking.",
        anchor:
          "Bring your attention toward your heart. You don't need to create a feeling. Simply notice what is already here.",
        voice: "/audio/voice/discover/opening-heart.mp3",
      },

      remember: {
        intro: "",
        anchor:
          "Open your heart and let yourself notice what is here.",
        voice: "/audio/voice/remember/opening-heart.mp3",
      },

      trust: {
        intro: "",
        anchor: "Open your heart.",
        voice: "/audio/voice/trust/opening-heart.mp3",
      },

      embody: {
        intro: "",
        anchor: "",
        voice: "",
      },
    },
  },

  "feeling-power": {
    id: "feeling-power",
    number: 2,
    title: "Feeling Your Power",
    subtitle: "Feel what is already here",
    musicSrc: "/audio/music/feeling-power.wav",
    position: "middle",

    guidance: {
      discover: {
        intro:
          "Notice your body as you walk. Let your movement become an anchor.",
        anchor:
          "Feel what is already here. You don't need to force strength or any particular emotion.",
        voice: "/audio/voice/discover/feeling-power.mp3",
      },

      remember: {
        intro: "",
        anchor:
          "Feel your body moving. Let it remind you of what is already here.",
        voice: "/audio/voice/remember/feeling-power.mp3",
      },

      trust: {
        intro: "",
        anchor: "Feel.",
        voice: "/audio/voice/trust/feeling-power.mp3",
      },

      embody: {
        intro: "",
        anchor: "",
        voice: "",
      },
    },
  },

  "letting-go": {
    id: "letting-go",
    number: 3,
    title: "Letting Go & Total Presence",
    subtitle: "Come back to now",
    musicSrc: "/audio/music/letting-go.wav",
    position: "middle",

    guidance: {
      discover: {
        intro:
          "There is nothing you need to figure out right now.",
        anchor:
          "Notice the next step, the air, and the world around you. When the mind wanders, gently return to what is here.",
        voice: "/audio/voice/discover/letting-go.mp3",
      },

      remember: {
        intro: "",
        anchor:
          "Come back to the next step, the breath, the world around you.",
        voice: "/audio/voice/remember/letting-go.mp3",
      },

      trust: {
        intro: "",
        anchor: "Return to now.",
        voice: "/audio/voice/trust/letting-go.mp3",
      },

      embody: {
        intro: "",
        anchor: "",
        voice: "",
      },
    },
  },

  "higher-power": {
    id: "higher-power",
    number: 4,
    title: "Connecting with Higher Power",
    subtitle: "Make room for what you believe",
    musicSrc: "/audio/music/higher-power.wav",
    position: "middle",

    guidance: {
      discover: {
        intro:
          "Make a little room for what is meaningful to you.",
        anchor:
          "Connect with whatever you believe. Or nothing at all. You don't need to define the experience.",
        voice: "/audio/voice/discover/higher-power.mp3",
      },

      remember: {
        intro: "",
        anchor:
          "Connect in whatever way feels natural to you.",
        voice: "/audio/voice/remember/higher-power.mp3",
      },

      trust: {
        intro: "",
        anchor: "Make room.",
        voice: "/audio/voice/trust/higher-power.mp3",
      },

      embody: {
        intro: "",
        anchor: "",
        voice: "",
      },
    },
  },

  celebrate: {
    id: "celebrate",
    number: 5,
    title: "Celebrate & Raise Your Vibration",
    subtitle: "Finish in celebration",
    musicSrc: "/audio/music/celebrate.wav",
    position: "last",

    guidance: {
      discover: {
        intro:
          "Let yourself notice that you showed up for this walk.",
        anchor:
          "Celebrate being here. Let whatever you discovered travel with you into the rest of your day.",
        voice: "/audio/voice/discover/celebrate.mp3",
      },

      remember: {
        intro: "",
        anchor:
          "Carry whatever is here with you into the rest of today.",
        voice: "/audio/voice/remember/celebrate.mp3",
      },

      trust: {
        intro: "",
        anchor:
          "Celebrate being here.",
        voice: "/audio/voice/trust/celebrate.mp3",
      },

      embody: {
        intro: "",
        anchor: "",
        voice: "",
      },
    },
  },
};

export function getStages(
  order: StageId[] = DEFAULT_ORDER,
): Stage[] {
  return order.map((id) => STAGES[id]);
}