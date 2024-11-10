import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';
import { Achievement } from '@/types/achievement';

interface AchievementProgressProps {
  achievement: Achievement;
  progress: number;
  className?: string;
}

export function AchievementProgress({
  achievement,
  progress,
  className = ''
}: AchievementProgressProps) {
  const isCompleted = progress === 100;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${
          isCompleted ? 'bg-green-100' : 'bg-gray-100'
        }`}>
          <Trophy className={`h-6 w-6 ${
            isCompleted ? 'text-green-600' : 'text-gray-400'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star className="h-5 w-5 mr-1 fill-current" />
              <span className="text-sm font-medium">+{achievement.xpReward} XP</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-1" />
                <span>Progress</span>
              </div>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isCompleted ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}