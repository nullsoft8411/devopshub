import React, { useState, useEffect } from 'react';
import { Timer, Pause, Play, RotateCcw, Coffee, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDuration } from '@/lib/utils';

interface TaskTimerProps {
  expectedDuration: string;
  onTimeUpdate?: (duration: number) => void;
  onBreakStart?: () => void;
  onBreakEnd?: () => void;
  className?: string;
}

export function TaskTimer({
  expectedDuration,
  onTimeUpdate,
  onBreakStart,
  onBreakEnd,
  className = ''
}: TaskTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakCount, setBreakCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  // Convert expected duration string (e.g., "45 minutes") to milliseconds
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
          onTimeUpdate?.(newElapsed);
          return newElapsed;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isOnBreak, onTimeUpdate]);

  useEffect(() => {
    if (elapsed > expectedMs && !showWarning) {
      setShowWarning(true);
    }
  }, [elapsed, expectedMs, showWarning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setElapsed(0);
    setIsRunning(true);
    setShowWarning(false);
    setBreakCount(0);
  };

  const toggleBreak = () => {
    if (isOnBreak) {
      setIsOnBreak(false);
      onBreakEnd?.();
    } else {
      setIsOnBreak(true);
      setBreakCount(prev => prev + 1);
      onBreakStart?.();
    }
  };

  const getProgressColor = () => {
    if (elapsed > expectedMs * 1.5) return 'bg-red-500';
    if (elapsed > expectedMs) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const progress = Math.min((elapsed / expectedMs) * 100, 100);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-gray-900">Task Timer</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTimer}
            className={isRunning ? 'text-red-500' : 'text-green-500'}
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTimer}
            className="text-gray-500"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleBreak}
            className={isOnBreak ? 'text-red-500' : 'text-blue-500'}
          >
            <Coffee className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-mono">
          {formatDuration(elapsed)}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Expected: {expectedDuration}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${getProgressColor()} h-2 rounded-full transition-all`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Breaks taken: {breakCount}</span>
          <span>Status: {isOnBreak ? 'On Break' : isRunning ? 'Running' : 'Paused'}</span>
        </div>
      </div>

      {showWarning && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2 text-yellow-800">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm">
              You've exceeded the expected duration. Take your time, but try to stay focused!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}