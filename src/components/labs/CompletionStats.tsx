import React from 'react';
import { Trophy, Clock, Target, Star } from 'lucide-react';

interface CompletionStatsProps {
  completionTime: string;
  accuracy: number;
  score: number;
  rank?: number;
  className?: string;
}

export function CompletionStats({
  completionTime,
  accuracy,
  score,
  rank,
  className = ''
}: CompletionStatsProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-900">Completion Statistics</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-blue-700">Completion Time</p>
              <p className="text-lg font-semibold text-blue-900">
                {completionTime}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Target className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-green-700">Accuracy</p>
              <p className="text-lg font-semibold text-green-900">
                {accuracy}%
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Star className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-yellow-700">Final Score</p>
              <p className="text-lg font-semibold text-yellow-900">
                {score}/100
              </p>
            </div>
          </div>
        </div>

        {rank && (
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Trophy className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-700">Ranking</p>
                <p className="text-lg font-semibold text-purple-900">
                  #{rank}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          <p className="font-medium">Performance Summary</p>
          <ul className="mt-2 space-y-1">
            <li>• Completed all tasks successfully</li>
            <li>• Maintained high accuracy throughout</li>
            <li>• Demonstrated good time management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}