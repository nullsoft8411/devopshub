import React from 'react';
import { Star, Zap, Trophy } from 'lucide-react';

interface XPProgressProps {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  progress: number;
}

export function XPProgress({
  currentXP,
  level,
  xpToNextLevel,
  progress
}: XPProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Star className="h-6 w-6 text-yellow-600 fill-current" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Current XP</p>
            <p className="text-2xl font-bold text-gray-900">{currentXP}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Level</p>
            <p className="text-2xl font-bold text-gray-900">{level}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress to Level {level + 1}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <span>Level {level}</span>
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{xpToNextLevel} XP to next level</span>
          </div>
          <span>Level {level + 1}</span>
        </div>
      </div>
    </div>
  );
}