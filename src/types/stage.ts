export type StageId =
  | "opening-heart"
  | "feeling-power"
  | "letting-go"
  | "higher-power"
  | "celebrate";

export type Stage = {
  id: StageId;
  number: number;
  title: string;
  subtitle: string;
  prompt: string;
  durationSeconds: number;
  voiceIntroSrc: string;
  musicSrc: string;
  position: "first" | "middle" | "last";
};
