"use client";

import Link from "next/link";
import {
  Play,
  Flame,
  Settings2,
} from "lucide-react";

import { Orb } from "@/components/Orb";
import { useAppState } from "@/hooks/useAppState";
import { useAudioDurations } from "@/hooks/useAudioDuration";
import {
  hasMissedDaysSinceLastPractice,
} from "@/lib/streak";
import { getLocalDateKey } from "@/lib/dates";

/*
 * ============================================================
 * DEVELOPMENT TESTING
 * ============================================================
 *
 * Change this number to simulate how long it has been since
 * the user's last practice.
 *
 * 0  = practiced today
 * 1  = practiced yesterday
 * 2  = missed 1 day
 * 5  = missed several days
 * 30 = returning after a long absence
 *
 * IMPORTANT:
 * This is only used in development.
 * Production ignores this value completely.
 */
const TEST_DAYS_SINCE_LAST_PRACTICE = 3;

function getTestLastCompletedDate() {
  const date = new Date();

  date.setHours(12, 0, 0, 0);
  date.setDate(
    date.getDate() -
      TEST_DAYS_SINCE_LAST_PRACTICE,
  );

  return getLocalDateKey(date);
}

export function Home() {
  const {
    state,
    markWalkStarted,
  } = useAppState();

  const streak =
    state?.streak.current ?? 0;

  const order =
    state?.selectedOrder ?? [
      "opening-heart",
      "feeling-power",
      "letting-go",
      "higher-power",
      "celebrate",
    ];

  const totalCompleted =
    state?.streak.totalCompleted ?? 0;

  const { totalDuration, loading } =
    useAudioDurations(
      order,
      totalCompleted,
    );

  const durationMinutes =
    totalDuration > 0
      ? Math.round(
          totalDuration / 60,
        )
      : 27;

  /*
   * ============================================================
   * RETURNING USER DETECTION
   * ============================================================
   *
   * In development we can override the last completed date
   * so we can test the "Welcome back" experience without
   * manually changing localStorage.
   *
   * Production always uses the real stored date.
   */
  const lastCompletedDate =
    process.env.NODE_ENV === "development"
      ? getTestLastCompletedDate()
      : state?.streak.lastCompletedDate ??
        null;

  /*
   * We only consider someone "returning" when they have
   * practiced before and their last practice was neither
   * today nor yesterday.
   *
   * We deliberately do not expose the number of missed days.
   */
  const isReturningAfterMissedDays =
    hasMissedDaysSinceLastPractice(
      lastCompletedDate,
    );

  return (
    <main className="screen home-screen">
      <div className="topbar">
        <span>
          The Perfect Walk
        </span>

        <Link
          href="/flow"
          aria-label="Choose walk order"
          className="icon-button"
        >
          <Settings2 size={19} />
        </Link>
      </div>

      <section className="home-heading">
        {isReturningAfterMissedDays ? (
          <>
            <p className="eyebrow">
              Welcome back
            </p>

            <h1>
              Your practice
              <br />
              is still here.
            </h1>
          </>
        ) : (
          <>
            <p className="eyebrow">
              Good morning
            </p>

            <h1>
              Ready for
              <br />
              today&apos;s walk?
            </h1>
          </>
        )}
      </section>

      <div className="orb-stage">
        <Orb />
      </div>

      <div className="home-action">
        <Link
          href="/walk"
          className="primary-card"
          onClick={() =>
            markWalkStarted()
          }
        >
          <span>
            <strong>
              Begin your walk
            </strong>

            <small>
              {loading
                ? "About 27 minutes"
                : `About ${durationMinutes} minutes`}
            </small>
          </span>

          <span className="round-play">
            <Play
              size={16}
              fill="currentColor"
            />
          </span>
        </Link>
      </div>

      {isReturningAfterMissedDays ? (
        <div className="streak-block">
          <div className="streak-number">
            The practice continues
          </div>

          <div className="flame">
            <Flame size={25} />
          </div>
        </div>
      ) : (
        <div className="streak-block">
          <div className="streak-number">
            Day {streak + 1}
          </div>

          <div className="flame">
            <Flame size={25} />
          </div>
        </div>
      )}
    </main>
  );
}