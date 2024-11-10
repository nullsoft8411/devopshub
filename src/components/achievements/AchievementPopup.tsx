import React, { useEffect } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { Achievement } from '@/types/achievement';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-500 flex items-center space-x-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <Trophy className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">Achievement Unlocked!</h4>
          <p className="text-sm text-gray-600">{achievement.title}</p>
        </div>
        <div className="flex items-center text-yellow-500">
          <Star className="h-5 w-5 mr-1 fill-current" />
          <span className="font-medium">+{achievement.xpReward} XP</span>
        </div>
      </div>
    </div>
  );
}