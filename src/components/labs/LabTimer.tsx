import React, { useState, useEffect } from 'react';
import { Clock, Pause, Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface LabTimerProps {
  startTime: Date;
  expectedDuration: string;
  onTimeUpdate?: (duration: number) => void;
  className?: string;
}

export function LabTimer({
  startTime,
  expectedDuration,
  onTimeUpdate,
  className = ''
}: LabTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
    if (isPaused) return;

    const interval = setInterval(() => {
      const newElapsed = Date.now() - startTime.getTime();
      setElapsed(newElapsed);
      onTimeUpdate?.(newElapsed);

      // Show warning when exceeding expected duration
      if (!showWarning && newElapsed > expectedMs) {
        setShowWarning(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, startTime, expectedMs, showWarning, onTimeUpdate]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (elapsed > expectedMs * 1.5) return 'bg-red-500';
    if (elapsed > expectedMs) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const progress = Math.min((elapsed / expectedMs) * 100, 100);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-900">Lab Timer</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setElapsed(0);
              setShowWarning(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-3xl font-mono text-center mb-4">
        {formatTime(elapsed)}
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-blue-600">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {showWarning && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              You've exceeded the expected duration. Take your time, but try to stay focused!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}