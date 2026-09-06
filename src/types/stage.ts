export type StageId =
  | "opening-heart"
  | "feeling-power"
  | "letting-go"
  | "higher-power"
  | "celebrate";

export type GuidanceMode = "discover" | "remember" | "trust" | "embody";

export type StageGuidance = {
  intro: string;
  anchor: string;
  voice: string;
};

export type Stage = {
  id: StageId;
  number: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  musicSrc: string;
  position: "first" | "middle" | "last";

  guidance: {
    discover: StageGuidance;
    remember: StageGuidance;
    trust: StageGuidance;
    embody: StageGuidance;
  };
};