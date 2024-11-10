import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProgressSummaryProps {
  completedTasks: number;
  totalTasks: number;
  timeSpent: string;
  expectedTime: string;
  onContinue?: () => void;
  className?: string;
}

export function ProgressSummary({
  completedTasks,
  totalTasks,
  timeSpent,
  expectedTime,
  onContinue,
  className = ''
}: ProgressSummaryProps) {
  const progress = Math.round((completedTasks / totalTasks) * 100);
  const isOverTime = parseInt(timeSpent) > parseInt(expectedTime);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-full ${
            progress === 100
              ? 'bg-green-100'
              : progress > 50
              ? 'bg-blue-100'
              : 'bg-gray-100'
          }`}>
            <CheckCircle className={`h-4 w-4 ${
              progress === 100
                ? 'text-green-600'
                : progress > 50
                ? 'text-blue-600'
                : 'text-gray-600'
            }`} />
          </div>
          <span className="font-medium text-gray-900">
            {completedTasks} of {totalTasks} tasks completed
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {timeSpent}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all ${
            progress === 100
              ? 'bg-green-500'
              : progress > 50
              ? 'bg-blue-500'
              : 'bg-gray-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {isOverTime && (
        <div className="flex items-start space-x-2 mb-4 p-3 bg-yellow-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Taking longer than expected
            </p>
            <p className="text-sm text-yellow-700">
              Don't worry! Take your time to understand each concept thoroughly.
            </p>
          </div>
        </div>
      )}

      {onContinue && completedTasks > 0 && completedTasks < totalTasks && (
        <Button
          onClick={onContinue}
          className="w-full"
        >
          Continue from Task {completedTasks + 1}
        </Button>
      )}
    </div>
  );
}