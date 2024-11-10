import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  progress: number;
  timeSpent: number;
  attempts: number;
  showWarning?: boolean;
  className?: string;
}

export function ProgressIndicator({
  progress,
  timeSpent,
  attempts,
  showWarning = false,
  className = ''
}: ProgressIndicatorProps) {
  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getProgressColor = () => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Task Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`${getProgressColor()} h-2 rounded-full transition-all`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{formatTime(timeSpent)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Attempts: {attempts}</span>
          {showWarning && attempts > 3 && (
            <div className="flex items-center space-x-1 text-yellow-500">
              <AlertCircle className="h-4 w-4" />
              <span>Need a hint?</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}