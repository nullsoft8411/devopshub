import React from 'react';
import { Achievement } from '@/types/achievement';
import { 
  Trophy, Star, Zap, Map, Rocket,
  Award, Target, Crown, Shield
} from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  progress?: number;
  className?: string;
}

export function AchievementCard({
  achievement,
  unlocked,
  progress,
  className = ''
}: AchievementCardProps) {
  const icons = {
    Trophy,
    Star,
    Zap,
    Map,
    Rocket,
    Award,
    Target,
    Crown,
    Shield
  };

  const Icon = icons[achievement.icon as keyof typeof icons] || Trophy;

  return (
    <div
      className={`relative bg-white rounded-lg shadow-sm overflow-hidden ${
        unlocked ? 'border-2 border-blue-500' : 'border border-gray-200'
      } ${className}`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${
            unlocked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className={`font-semibold ${
              unlocked ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {achievement.title}
            </h3>
            <p className="text-sm text-gray-600">
              {achievement.description}
            </p>
          </div>
        </div>

        {progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {unlocked ? 'Unlocked' : 'Locked'}
          </span>
          <span className="flex items-center text-yellow-600">
            <Star className="h-4 w-4 mr-1 fill-current" />
            {achievement.xpReward} XP
          </span>
        </div>
      </div>

      {unlocked && (
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Achieved
          </div>
        </div>
      )}
    </div>
  );
}