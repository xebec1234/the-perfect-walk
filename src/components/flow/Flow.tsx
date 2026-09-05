"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  GripVertical,
  Play,
} from "lucide-react";
import { useAppState } from "@/hooks/useAppState";
import { DEFAULT_ORDER, STAGES } from "@/data/stages";
import type { StageId } from "@/types/stage";

export function Flow() {
  const { state, setOrder } = useAppState();

  // Always start from the canonical five-stage structure.
  // Only the middle three are allowed to change position.
  const savedOrder = state?.selectedOrder;

  const order: StageId[] =
    savedOrder?.length === DEFAULT_ORDER.length
      ? [
          DEFAULT_ORDER[0],
          ...(savedOrder.filter(
            (id) =>
              id !== DEFAULT_ORDER[0] &&
              id !== DEFAULT_ORDER[DEFAULT_ORDER.length - 1],
          ) as StageId[]),
          DEFAULT_ORDER[DEFAULT_ORDER.length - 1],
        ]
      : DEFAULT_ORDER;

  const move = (index: number, direction: "up" | "down") => {
    // Only indexes 1, 2 and 3 can move.
    if (index < 1 || index > 3) return;

    const target = direction === "up" ? index - 1 : index + 1;

    // Never allow a middle card to cross the fixed first/last cards.
    if (target < 1 || target > 3) return;

    const next = [...order];

    [next[index], next[target]] = [next[target], next[index]];

    setOrder(next);
  };

  const totalMinutes = Math.round(
    order.reduce((total, id) => total + STAGES[id].durationSeconds, 0) / 60,
  );

  return (
    <main className="screen flow-screen">
      <header className="simple-header">
        <Link href="/" className="back-button">
          <ArrowLeft size={19} />
          <span>Back</span>
        </Link>

        <div className="flow-heading">
          <p className="eyebrow">Your walk</p>

          <h1>Find your flow.</h1>

          <p className="header-note">
            The first and last parts stay fixed. Move the middle three to find
            your rhythm.
          </p>
        </div>
      </header>

      <section className="flow-summary" aria-label="Walk summary">
        <span>{order.length} parts</span>
        <span aria-hidden="true">•</span>
        <span>{totalMinutes} min</span>
      </section>

      <section className="flow-list" aria-label="Walk stages">
        {order.map((id, index) => {
          const stage = STAGES[id];

          const isFirst = index === 0;
          const isLast = index === order.length - 1;
          const isFixed = isFirst || isLast;

          return (
            <article
              key={id}
              className={`stage-card ${isFixed ? "is-fixed" : "is-movable"}`}
            >
              <div className="stage-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="stage-copy">
                <span>{stage.subtitle} hello</span>

                <h2>{stage.title}</h2>

                <small>{Math.round(stage.durationSeconds / 60)} min</small>
              </div>

              {isFixed ? (
                <div className="lock-note">Fixed</div>
              ) : (
                <div className="stage-controls">
                  <GripVertical
                    className="drag-icon"
                    size={18}
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    onClick={() => move(index, "up")}
                    disabled={index === 1}
                    aria-label={`Move ${stage.title} up`}
                  >
                    <ArrowUp size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => move(index, "down")}
                    disabled={index === 3}
                    aria-label={`Move ${stage.title} down`}
                  >
                    <ArrowDown size={17} />
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </section>

      <div className="flow-action">
        <Link href="/walk" className="primary-button">
          <Play size={18} fill="currentColor" />
          <span>Start walk</span>
        </Link>
      </div>
    </main>
  );
}
