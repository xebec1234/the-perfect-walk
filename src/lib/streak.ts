import {
  getLocalDateKey,
  isToday,
  isYesterday,
} from "./dates";

export function calculateStreak(completedDates: string[]) {
  const unique = [...new Set(completedDates)].sort();

  if (!unique.length) {
    return 0;
  }

  const today = getLocalDateKey();
  const latest = unique[unique.length - 1];

  /*
   * A streak is active only when the most recent
   * completed day is today or yesterday.
   *
   * If more time has passed, the numerical streak
   * becomes 0. This is only a calculation — the UI
   * should never frame this as punishment or failure.
   */
  if (
    latest !== today &&
    !isYesterday(latest)
  ) {
    return 0;
  }

  let streak = 1;

  for (
    let i = unique.length - 1;
    i > 0;
    i -= 1
  ) {
    const current = new Date(
      `${unique[i]}T12:00:00`,
    );

    const previous = new Date(
      `${unique[i - 1]}T12:00:00`,
    );

    const diff = Math.round(
      (current.getTime() - previous.getTime()) /
        86_400_000,
    );

    if (diff !== 1) {
      break;
    }

    streak += 1;
  }

  return streak;
}

export function hasCompletedToday(
  completedDates: string[],
) {
  return completedDates.includes(
    getLocalDateKey(),
  );
}

/**
 * Returns true when the person has practiced before,
 * but has not practiced today or yesterday.
 *
 * This is intentionally separate from the numerical
 * streak. A missed day is a return to the practice,
 * not a failure state.
 */
export function hasMissedDaysSinceLastPractice(
  lastCompletedDate: string | null,
) {
  if (!lastCompletedDate) {
    return false;
  }

  return (
    !isToday(lastCompletedDate) &&
    !isYesterday(lastCompletedDate)
  );
}