"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Orb } from "@/components/Orb";
import { useAppState } from "@/hooks/useAppState";
import { useWalk } from "@/hooks/useWalk";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

export function Walk() {
  const { state, completeWalk } = useAppState();
  const router = useRouter();
  const order = state?.selectedOrder ?? ["opening-heart", "feeling-power", "letting-go", "higher-power", "celebrate"];
  const walk = useWalk(order, state?.preferences.audioVolume ?? 0.82, completeWalk);
  const progress = walk.stage ? ((walk.stage.durationSeconds - walk.remainingSeconds) / walk.stage.durationSeconds) * 100 : 0;

  useEffect(() => {
    if (walk.completed) router.replace("/complete");
  }, [router, walk.completed]);

  if (walk.completed) return null;

  return (
    <main className="screen walk-screen">
      <div className="walk-topline">
        <span>Part {walk.stageIndex + 1} of {walk.stages.length}</span>
        <span>{formatTime(walk.remainingSeconds)}</span>
      </div>

      <section className="walk-heading">
        <p className="eyebrow">Part {walk.stageIndex + 1}</p>
        <h1>{walk.stage.title}</h1>
      </section>

      <div className="walk-orb-wrap">
        <div className="progress-ring" style={{ "--progress": `${progress}%` } as React.CSSProperties}>
          <Orb />
        </div>
      </div>

      <div className="walk-prompt">{walk.stage.prompt}</div>

      <div className="player-card">
        <div className="audio-art"><div className="audio-dot" /></div>
        <div className="audio-copy">
          <strong>{walk.isPlaying ? "Gentle Breeze" : "Ready when you are"}</strong>
          <small>{walk.stage.title} · {formatTime(walk.remainingSeconds)}</small>
        </div>
        <button className="audio-button" onClick={() => walk.isPlaying ? walk.pause() : (walk.started ? walk.resume() : walk.start())} aria-label={walk.isPlaying ? "Pause" : "Play"}>
          {walk.isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
      </div>

      {walk.audioError && <p className="audio-warning"><VolumeX size={15} /> Audio could not start. The timer still works.</p>}

      {!walk.started && (
        <button className="primary-button" onClick={walk.start}>
          <Play size={18} fill="currentColor" /> Begin this part
        </button>
      )}

      {walk.started && (
        <button className="quiet-button" onClick={() => { if (window.confirm("End this walk early? It will not count as completed.")) walk.finishEarly(); }}>
          End walk
        </button>
      )}

      <div className="walk-footer-note"><Volume2 size={14} /> Put your phone in your pocket when you&apos;re ready.</div>
    </main>
  );
}
