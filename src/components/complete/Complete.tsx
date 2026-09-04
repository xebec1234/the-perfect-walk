"use client";

import Link from "next/link";
import { Check, Flame } from "lucide-react";
import { Orb } from "@/components/Orb";
import { useAppState } from "@/hooks/useAppState";

export function Complete() {
  const { state } = useAppState();
  const streak = state?.streak.current ?? 1;
  return (
    <main className="screen complete-screen">
      <div className="complete-orb"><Orb size="small" /></div>
      <section className="complete-heading">
        <h1>You did it.</h1>
        <p>Today&apos;s walk is complete.</p>
      </section>

      <div className="streak-card">
        <div className="streak-icon"><Flame size={19} /></div>
        <div><strong>Current Streak</strong><small>{streak} {streak === 1 ? "day" : "days"}</small></div>
        <div className="streak-dots">{Array.from({ length: Math.min(streak, 7) }, (_, i) => <span key={i} className="dot"><Check size={8} /></span>)}</div>
      </div>

      <div className="reflection-card">Whatever you put out, you get back.<br />Let this feeling be what you carry into today.</div>

      <Link href="/" className="primary-button">Done</Link>
    </main>
  );
}
