import React from 'react';
import { CheckCircle, Clock, Target, Award, TrendingUp } from 'lucide-react';

interface ProgressTrackerProps {
  completedTasks: number;
  totalTasks: number;
  timeSpent: string;
  expectedTime: string;
  accuracy: number;
  className?: string;
}

export function ProgressTracker({
  completedTasks,
  totalTasks,
  timeSpent,
  expectedTime,
  accuracy,
  className = ''
}: ProgressTrackerProps) {
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Lab Progress</h3>
        <p className="mt-1 text-sm text-gray-600">Track your learning journey</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="font-semibold text-gray-900">
                  {completedTasks}/{totalTasks} tasks
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time Spent</p>
                <p className="font-semibold text-gray-900">{timeSpent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Target className="h-4 w-4" />
                <span>Accuracy</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>Time Efficiency</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {expectedTime}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(parseInt(timeSpent) / parseInt(expectedTime)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievement Badge */}
        {progress === 100 && (
          <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
            <Award className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-green-900">Lab Completed!</p>
              <p className="text-sm text-green-700">
                Great job! You've mastered all tasks in this lab.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}