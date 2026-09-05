import type { StageId } from "@/types/stage";

const ALL_IDS: StageId[] = [
  "opening-heart",
  "feeling-power",
  "letting-go",
  "higher-power",
  "celebrate",
];

const FIRST = ALL_IDS[0];
const LAST = ALL_IDS[ALL_IDS.length - 1];
const MIDDLE = ALL_IDS.slice(1, -1);

export function normalizeStageOrder(order: StageId[] | undefined | null): StageId[] {
  const middleCandidates = (order ?? []).filter(
    (id): id is StageId => MIDDLE.includes(id),
  );

  const seen = new Set<StageId>();
  const middle = middleCandidates.filter((id) => {
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  const validMiddle =
    middle.length === MIDDLE.length ? middle : MIDDLE;

  return [FIRST, ...validMiddle, LAST];
}