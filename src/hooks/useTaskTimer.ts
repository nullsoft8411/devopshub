import { useState, useCallback, useEffect } from 'react';

interface UseTaskTimerProps {
  expectedDuration: string;
  onTimeExceeded?: () => void;
  onBreakStart?: () => void;
  onBreakEnd?: () => void;
}

export function useTaskTimer({
  expectedDuration,
  onTimeExceeded,
  onBreakStart,
  onBreakEnd
}: UseTaskTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakCount, setBreakCount] = useState(0);
  const [breakTime, setBreakTime] = useState(0);

  const expectedMs = (() => {
    const match = expectedDuration.match(/(\d+)\s*(minute|hour)s?/);
    if (!match) return 0;
    const [, value, unit] = match;
    return unit === 'hour' 
      ? parseInt(value) * 60 * 60 * 1000 
      : parseInt(value) * 60 * 1000;
  })();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isOnBreak) {
      interval = setInterval(() => {
        setElapsed(prev => {
          const newElapsed = prev + 1000;
          if (newElapsed > expectedMs && prev <= expectedMs) {
            onTimeExceeded?.();
          }
          return newElapsed;
        });
      }, 1000);
    } else if (isOnBreak) {
      interval = setInterval(() => {
        setBreakTime(prev => prev + 1000);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isOnBreak, expectedMs, onTimeExceeded]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setElapsed(0);
    setIsRunning(true);
    setBreakCount(0);
    setBreakTime(0);
  }, []);

  const startBreak = useCallback(() => {
    setIsOnBreak(true);
    setBreakCount(prev => prev + 1);
    onBreakStart?.();
  }, [onBreakStart]);

  const endBreak = useCallback(() => {
    setIsOnBreak(false);
    onBreakEnd?.();
  }, [onBreakEnd]);

  const getProgress = useCallback(() => {
    return Math.min((elapsed / expectedMs) * 100, 100);
  }, [elapsed, expectedMs]);

  const getStats = useCallback(() => {
    return {
      elapsed,
      breakCount,
      totalBreakTime: breakTime,
      progress: getProgress(),
      isOvertime: elapsed > expectedMs
    };
  }, [elapsed, breakCount, breakTime, getProgress, expectedMs]);

  return {
    elapsed,
    isRunning,
    isOnBreak,
    breakCount,
    start,
    pause,
    reset,
    startBreak,
    endBreak,
    getProgress,
    getStats
  };
}