import React from 'react';
import { Trophy, Star, Shield, Target, Zap, Award } from 'lucide-react';

interface AchievementBadgeProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlockedAt?: Date;
  progress?: number;
  className?: string;
}

export function AchievementBadge({
  title,
  description,
  icon,
  rarity,
  xpReward,
  unlockedAt,
  progress,
  className = ''
}: AchievementBadgeProps) {
  const icons = {
    Trophy,
    Star,
    Shield,
    Target,
    Zap,
    Award
  };

  const Icon = icons[icon as keyof typeof icons] || Trophy;

  const rarityStyles = {
    common: 'bg-gray-100 text-gray-600 border-gray-200',
    rare: 'bg-blue-100 text-blue-600 border-blue-200',
    epic: 'bg-purple-100 text-purple-600 border-purple-200',
    legendary: 'bg-yellow-100 text-yellow-600 border-yellow-200'
  };

  return (
    <div className={`relative rounded-lg border-2 p-4 ${rarityStyles[rarity]} ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-lg bg-white/50">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm mt-1 opacity-90">{description}</p>
          
          {progress !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-current"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>+{xpReward} XP</span>
            </div>
            {unlockedAt && (
              <span className="opacity-75">
                Unlocked {new Date(unlockedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}