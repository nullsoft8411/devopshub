import React from 'react';
import { Trophy, Star, ArrowRight } from 'lucide-react';

interface LevelProgressProps {
  level: number;
  xp: number;
  progress: number;
  xpToNextLevel: number;
}

export function LevelProgress({
  level,
  xp,
  progress,
  xpToNextLevel
}: LevelProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Level {level}</h3>
            <p className="text-sm text-gray-600">Keep going!</p>
          </div>
        </div>
        <div className="flex items-center text-yellow-600">
          <Star className="h-5 w-5 mr-1 fill-current" />
          <span className="font-medium">{xp} XP</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress to Level {level + 1}</span>
          <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Current Level</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">Level {level}</span>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">Level {level + 1}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>{xpToNextLevel} XP needed for next level</p>
      </div>
    </div>
  );
}