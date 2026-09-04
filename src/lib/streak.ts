import { getLocalDateKey, isYesterday } from "./dates";

export function calculateStreak(completedDates: string[]) {
  const unique = [...new Set(completedDates)].sort();
  if (!unique.length) return 0;

  const today = getLocalDateKey();
  const latest = unique[unique.length - 1];
  if (latest !== today && !isYesterday(latest)) return 0;

  let streak = 1;
  for (let i = unique.length - 1; i > 0; i -= 1) {
    const current = new Date(`${unique[i]}T12:00:00`);
    const previous = new Date(`${unique[i - 1]}T12:00:00`);
    const diff = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
    if (diff !== 1) break;
    streak += 1;
  }
  return streak;
}

export function hasCompletedToday(completedDates: string[]) {
  return completedDates.includes(getLocalDateKey());
}
