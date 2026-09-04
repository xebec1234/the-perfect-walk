"use client";

import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, GripVertical, Play } from "lucide-react";
import { useAppState } from "@/hooks/useAppState";
import { STAGES } from "@/data/stages";
import type { StageId } from "@/types/stage";

export function Flow() {
  const { state, setOrder } = useAppState();
  const order = state?.selectedOrder ?? [];

  const move = (id: StageId, direction: "up" | "down") => {
    const index = order.indexOf(id);
    const target = direction === "up" ? index - 1 : index + 1;
    if (target <= 0 || target >= order.length - 1) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  return (
    <main className="screen flow-screen">
      <header className="simple-header">
        <Link href="/" className="back-button"><ArrowLeft size={19} /> Back</Link>
        <div>
          <p className="eyebrow">Your walk</p>
          <h1>Find your flow.</h1>
        </div>
        <p className="header-note">The first and last parts stay fixed. Move the middle three if you want a different rhythm.</p>
      </header>

      <section className="flow-list" aria-label="Walk stages">
        {order.map((id, index) => {
          const stage = STAGES[id];
          const fixed = index === 0 || index === order.length - 1;
          return (
            <article className={`stage-card ${fixed ? "fixed" : ""}`} key={id}>
              <div className="stage-index">0{index + 1}</div>
              <div className="stage-copy">
                <span>{stage.subtitle}</span>
                <h2>{stage.title}</h2>
                <small>{Math.round(stage.durationSeconds / 60)} min</small>
              </div>
              {fixed ? (
                <div className="lock-note">Fixed</div>
              ) : (
                <div className="stage-controls">
                  <GripVertical size={17} />
                  <button onClick={() => move(id, "up")} aria-label={`Move ${stage.title} up`} disabled={index <= 1}><ArrowUp size={16} /></button>
                  <button onClick={() => move(id, "down")} aria-label={`Move ${stage.title} down`} disabled={index >= order.length - 2}><ArrowDown size={16} /></button>
                </div>
              )}
            </article>
          );
        })}
      </section>

      <Link href="/walk" className="primary-button" onClick={() => undefined}>
        <Play size={18} fill="currentColor" /> Start walk
      </Link>
    </main>
  );
}
