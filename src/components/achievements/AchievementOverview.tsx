import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';
import { Achievement } from '@/types/achievement';
import { XPProgress } from './XPProgress';
import { AchievementProgress } from './AchievementProgress';

interface AchievementOverviewProps {
  achievements: Achievement[];
  unlockedAchievements: string[];
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  levelProgress: number;
  className?: string;
}

export function AchievementOverview({
  achievements,
  unlockedAchievements,
  currentXP,
  level,
  xpToNextLevel,
  levelProgress,
  className = ''
}: AchievementOverviewProps) {
  const totalAchievements = achievements.length;
  const completedAchievements = unlockedAchievements.length;
  const completionPercentage = (completedAchievements / totalAchievements) * 100;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedAchievements}/{totalAchievements}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600 fill-current" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total XP</p>
              <p className="text-2xl font-bold text-gray-900">{currentXP}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completion</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(completionPercentage)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <XPProgress
        currentXP={currentXP}
        level={level}
        xpToNextLevel={xpToNextLevel}
        progress={levelProgress}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Achievement Progress</h3>
        {achievements.map((achievement) => (
          <AchievementProgress
            key={achievement.id}
            achievement={achievement}
            progress={unlockedAchievements.includes(achievement.id) ? 100 : 0}
          />
        ))}
      </div>
    </div>
  );
}