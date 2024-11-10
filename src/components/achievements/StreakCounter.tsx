import React from 'react';
import { Flame, Calendar } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  lastActive?: Date;
}

export function StreakCounter({ currentStreak, longestStreak, lastActive }: StreakCounterProps) {
  const isActiveToday = lastActive ? 
    new Date().toDateString() === new Date(lastActive).toDateString() : 
    false;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isActiveToday ? 'bg-orange-100' : 'bg-gray-100'
          }`}>
            <Flame className={`h-5 w-5 ${
              isActiveToday ? 'text-orange-500' : 'text-gray-400'
            }`} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Streak</p>
            <p className="text-xl font-bold text-gray-900">{currentStreak} days</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Longest Streak</p>
            <p className="text-xl font-bold text-gray-900">{longestStreak} days</p>
          </div>
        </div>
      </div>

      {isActiveToday && (
        <div className="mt-4 p-2 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700 text-center">
            You've completed your daily goal! 🎉
          </p>
        </div>
      )}
    </div>
  );
}