import React from 'react';
import { Achievement } from '@/types/achievement';
import { Trophy, Star, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AchievementUnlockProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementUnlock({ achievement, onClose }: AchievementUnlockProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full animate-bounce">
              <Trophy className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Achievement Unlocked!
          </h2>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            {achievement.title}
          </h3>
          <p className="text-gray-600 mb-6">
            {achievement.description}
          </p>

          <div className="flex items-center justify-center text-yellow-600">
            <Star className="h-6 w-6 mr-2 fill-current" />
            <span className="text-xl font-bold">+{achievement.xpReward} XP</span>
          </div>

          <Button
            className="mt-6"
            onClick={onClose}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}