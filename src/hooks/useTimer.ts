"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds: number, onComplete?: () => void) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning) return;
    const id = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(id);
          setIsRunning(false);
          onCompleteRef.current?.();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(
    (seconds = initialSeconds) => {
      setIsRunning(false);
      setRemainingSeconds(seconds);
    },
    [initialSeconds],
  );

  return {
    remainingSeconds,
    isRunning,
    start,
    pause,
    reset,
    setRemainingSeconds,
  };
}
