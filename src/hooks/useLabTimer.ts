import { useState, useCallback, useEffect } from 'react';

interface UseLabTimerProps {
  startTime: Date;
  expectedDuration: string;
  onExceedDuration?: () => void;
}

export function useLabTimer({
  startTime,
  expectedDuration,
  onExceedDuration
}: UseLabTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasExceededDuration, setHasExceededDuration] = useState(false);

  const expectedMs = (() => {
    const match = expectedDuration.match(/(\d+)\s*(minute|hour)s?/);
    if (!match) return 0;
    const [, value, unit] = match;
    return unit === 'hour' 
      ? parseInt(value) * 60 * 60 * 1000 
      : parseInt(value) * 60 * 1000;
  })();

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newElapsed = Date.now() - startTime.getTime();
      setElapsed(newElapsed);

      if (!hasExceededDuration && newElapsed > expectedMs) {
        setHasExceededDuration(true);
        onExceedDuration?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, startTime, expectedMs, hasExceededDuration, onExceedDuration]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const reset = useCallback(() => {
    setElapsed(0);
    setHasExceededDuration(false);
  }, []);

  const getFormattedTime = useCallback(() => {
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor(elapsed / (1000 * 60 * 60));

    return {
      hours,
      minutes,
      seconds,
      formatted: hours > 0
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes}:${seconds.toString().padStart(2, '0')}`
    };
  }, [elapsed]);

  return {
    elapsed,
    isPaused,
    hasExceededDuration,
    pause,
    resume,
    reset,
    getFormattedTime,
    progress: Math.min((elapsed / expectedMs) * 100, 100)
  };
}