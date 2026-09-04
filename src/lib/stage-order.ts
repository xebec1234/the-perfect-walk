import { DEFAULT_ORDER, STAGES } from "@/data/stages";
import type { StageId } from "@/types/stage";

export function validateStageOrder(order: StageId[]) {
  if (order.length !== DEFAULT_ORDER.length) return false;
  if (order[0] !== "opening-heart") return false;
  if (order[order.length - 1] !== "celebrate") return false;
  return new Set(order).size === DEFAULT_ORDER.length && order.every((id) => Boolean(STAGES[id]));
}

export function normalizeStageOrder(order: StageId[] | null | undefined) {
  return order && validateStageOrder(order) ? order : [...DEFAULT_ORDER];
}

export function moveStage(order: StageId[], id: StageId, direction: "up" | "down") {
  const index = order.indexOf(id);
  if (index === -1) return order;

  const target = direction === "up" ? index - 1 : index + 1;
  if (target <= 0 || target >= order.length - 1) return order;

  const next = [...order];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
