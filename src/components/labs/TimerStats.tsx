import React from 'react';
import { Clock, Coffee, TrendingUp, AlertCircle } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface TimerStatsProps {
  elapsed: number;
  expectedDuration: string;
  breakCount: number;
  totalBreakTime: number;
  className?: string;
}

export function TimerStats({
  elapsed,
  expectedDuration,
  breakCount,
  totalBreakTime,
  className = ''
}: TimerStatsProps) {
  const expectedMs = (() => {
    const match = expectedDuration.match(/(\d+)\s*(minute|hour)s?/);
    if (!match) return 0;
    const [, value, unit] = match;
    return unit === 'hour' 
      ? parseInt(value) * 60 * 60 * 1000 
      : parseInt(value) * 60 * 1000;
  })();

  const efficiency = Math.max(0, 100 - (elapsed > expectedMs 
    ? ((elapsed - expectedMs) / expectedMs) * 100 
    : 0
  ));

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="font-medium text-gray-900 mb-4">Time Statistics</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-900">
            <Clock className="h-5 w-5" />
            <div>
              <p className="text-sm">Time Spent</p>
              <p className="text-lg font-semibold">{formatDuration(elapsed)}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 text-purple-900">
            <Coffee className="h-5 w-5" />
            <div>
              <p className="text-sm">Breaks</p>
              <p className="text-lg font-semibold">
                {breakCount} ({formatDuration(totalBreakTime)})
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Time Efficiency</span>
          </div>
          <span>{Math.round(efficiency)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              efficiency > 80 ? 'bg-green-500' :
              efficiency > 60 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${efficiency}%` }}
          />
        </div>
      </div>

      {elapsed > expectedMs && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Time Management Tip</p>
              <p className="mt-1">
                You're {formatDuration(elapsed - expectedMs)} over the expected duration.
                Consider reviewing the task requirements and asking for help if needed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}