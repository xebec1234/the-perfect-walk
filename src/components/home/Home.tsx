"use client";

import Link from "next/link";
import { Play, Flame, Settings2 } from "lucide-react";
import { Orb } from "@/components/Orb";
import { useAppState } from "@/hooks/useAppState";
import { getTotalDuration } from "@/data/stages";

export function Home() {
  const { state, markWalkStarted } = useAppState();
  const streak = state?.streak.current ?? 0;
  const duration = Math.round(getTotalDuration(state?.selectedOrder) / 60);

  return (
    <main className="screen home-screen">
      <div className="topbar">
        <span>The Perfect Walk</span>
        <Link href="/flow" aria-label="Choose walk order" className="icon-button">
          <Settings2 size={19} />
        </Link>
      </div>

      <section className="home-heading">
        <p className="eyebrow">Good morning</p>
        <h1>Ready for<br />today&apos;s walk?</h1>
      </section>

      <div className="orb-stage"><Orb /></div>

      <div className="home-action">
        <Link href="/walk" className="primary-card" onClick={() => markWalkStarted()}>
          <span>
            <strong>Begin your walk</strong>
            <small>About {duration} minutes</small>
          </span>
          <span className="round-play"><Play size={16} fill="currentColor" /></span>
        </Link>
      </div>

      <div className="streak-block">
        <div className="streak-number">Day {streak + 1}</div>
        <div className="flame"><Flame size={25} /></div>
      </div>
    </main>
  );
}
