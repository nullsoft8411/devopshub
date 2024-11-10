import React from 'react';
import { Trophy, Star, Shield, Target, Zap, Award } from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

interface BadgeGridProps {
  badges: Badge[];
  className?: string;
}

export function BadgeGrid({ badges, className = '' }: BadgeGridProps) {
  const icons = {
    Trophy,
    Star,
    Shield,
    Target,
    Zap,
    Award
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge) => {
        const Icon = icons[badge.icon as keyof typeof icons] || Trophy;
        
        return (
          <div
            key={badge.id}
            className={`relative p-4 rounded-lg border-2 ${
              badge.unlocked
                ? `${badge.color} bg-white`
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-full ${
                badge.unlocked
                  ? `${badge.color.replace('border', 'bg')} ${badge.color.replace('border', 'text')}`
                  : 'bg-gray-100 text-gray-400'
              }`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className={`mt-2 font-medium ${
                badge.unlocked ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {badge.title}
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                {badge.description}
              </p>
            </div>

            {!badge.unlocked && (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Shield className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}