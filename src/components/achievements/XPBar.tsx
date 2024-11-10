import React from 'react';
import { Star, Zap } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  level: number;
  progress: number;
  xpToNextLevel: number;
}

export function XPBar({ currentXP, level, progress, xpToNextLevel }: XPBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500 fill-current" />
          <span className="font-medium text-gray-900">{currentXP} XP</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-blue-500" />
          <span className="font-medium text-gray-900">Level {level}</span>
        </div>
      </div>

      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute top-full mt-1 w-full flex justify-between text-xs text-gray-500">
          <span>Level {level}</span>
          <span>{xpToNextLevel} XP to Level {level + 1}</span>
        </div>
      </div>
    </div>
  );
}