export function getLocalDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isToday(dateKey: string | null) {
  return dateKey === getLocalDateKey();
}

export function isYesterday(dateKey: string | null) {
  if (!dateKey) return false;
  const yesterday = new Date();
  yesterday.setHours(12, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);
  return dateKey === getLocalDateKey(yesterday);
}
