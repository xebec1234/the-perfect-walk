"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer(
  initialSeconds: number,
  onComplete?: () => void,
) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const onCompleteRef = useRef(onComplete);
  const completionPendingRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning) return;

    const id = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          completionPendingRef.current = true;
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (!completionPendingRef.current || remainingSeconds !== 0) {
      return;
    }

    completionPendingRef.current = false;
    setIsRunning(false);
    onCompleteRef.current?.();
  }, [remainingSeconds]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (seconds = initialSeconds) => {
      completionPendingRef.current = false;
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