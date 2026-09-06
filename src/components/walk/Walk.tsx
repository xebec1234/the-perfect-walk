"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pause, Play, Volume2, VolumeX } from "lucide-react";

import { Orb } from "@/components/Orb";
import { useAppState } from "@/hooks/useAppState";
import { useWalk } from "@/hooks/useWalk";
import Link from "next/link";

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function Walk() {
  const { state, completeWalk } = useAppState();
  const router = useRouter();

  const order = state?.selectedOrder ?? [
    "opening-heart",
    "feeling-power",
    "letting-go",
    "higher-power",
    "celebrate",
  ];

  const walk = useWalk(
    order,
    state?.preferences.audioVolume ?? 0.82,
    completeWalk,
  );

  useEffect(() => {
    if (walk.completed) {
      router.replace("/complete");
    }
  }, [router, walk.completed]);

  if (walk.completed || !walk.stage) {
    return null;
  }

  const progress =
    walk.stage.durationSeconds > 0
      ? ((walk.stage.durationSeconds - walk.remainingSeconds) /
          walk.stage.durationSeconds) *
        100
      : 0;

  const isEmbodied = walk.guidanceMode === "embody";

  return (
    <main className="screen walk-screen">
      <div className="walk-topline">
        <Link href="/" className="back-button">
          <ArrowLeft size={19} />
          <span>Back</span>
        </Link>

        <span>{formatTime(walk.remainingSeconds)}</span>
      </div>

      <section className="walk-heading">
        <p className="eyebrow">Part {walk.stageIndex + 1}</p>

        <h1>{walk.stage.title}</h1>
      </section>

      <div className="walk-orb-wrap">
        <div
          className="progress-ring"
          style={
            {
              "--progress": `${progress}%`,
            } as React.CSSProperties
          }
        >
          <Orb pulse={walk.started && walk.audioState !== "paused"} />
        </div>
      </div>

      {!isEmbodied && walk.guidance?.intro && (
        <section className="walk-guidance" aria-live="polite">
          <p className="walk-guidance-intro">{walk.guidance.intro}</p>

          {walk.guidance.anchor && (
            <p className="walk-prompt">{walk.guidance.anchor}</p>
          )}
        </section>
      )}

      <div className="player-card">
        <div className="player-info">
          <span className="player-icon">
            {walk.isAudioPlaying ? (
              <Volume2 size={18} />
            ) : (
              <VolumeX size={18} />
            )}
          </span>

          <span className="player-copy">
            <strong>Music for this part</strong>
            <small>{walk.isAudioPlaying ? "Playing" : "Paused"}</small>
          </span>
        </div>

        {walk.started && (
          <button
            className="icon-button"
            onClick={walk.audioState === "paused" ? walk.resume : walk.pause}
            aria-label={
              walk.audioState === "paused" ? "Resume audio" : "Pause audio"
            }
          >
            {walk.audioState === "paused" ? (
              <Play size={17} fill="currentColor" />
            ) : (
              <Pause size={17} fill="currentColor" />
            )}
          </button>
        )}
      </div>

      {walk.started && walk.audioState === "intro" && (
        <button className="quiet-button" onClick={walk.skipGuide}>
          Skip guide
        </button>
      )}

      {walk.audioError && (
        <p className="walk-audio-error" role="status">
          Audio could not start. You can continue walking without it.
        </p>
      )}

      {!walk.started && (
        <button className="primary-button mt-4" onClick={walk.start}>
          <Play size={17} fill="currentColor" />
          Begin this part
        </button>
      )}

      {walk.started && (
        <button
          className="quiet-button"
          onClick={() => {
            if (
              window.confirm(
                "End this walk early? It will not count as completed.",
              )
            ) {
              walk.finishEarly();
            }
          }}
        >
          End walk
        </button>
      )}

      <div className="walk-footer-note">
        <Volume2 size={15} />
        <span>Put your phone in your pocket when you&#39re ready.</span>
      </div>
    </main>
  );
}
