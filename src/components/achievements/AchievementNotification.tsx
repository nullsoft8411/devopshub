import React, { useEffect } from 'react';
import { Trophy, Star, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Achievement } from '@/types/achievement';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 border-blue-500 p-4 animate-slide-up">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="p-2 bg-blue-100 rounded-full">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Achievement Unlocked!
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                {achievement.title}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center text-yellow-500">
            <Star className="h-5 w-5 mr-1 fill-current" />
            <span className="text-sm font-medium">+{achievement.xpReward} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}