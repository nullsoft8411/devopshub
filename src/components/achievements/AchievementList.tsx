import React from 'react';
import { Achievement } from '@/types/achievement';
import { AchievementCard } from './AchievementCard';

interface AchievementListProps {
  achievements: Achievement[];
  unlockedAchievements: string[];
  className?: string;
}

export function AchievementList({
  achievements,
  unlockedAchievements,
  className = ''
}: AchievementListProps) {
  const sortedAchievements = [...achievements].sort((a, b) => {
    // Show unlocked achievements first
    const aUnlocked = unlockedAchievements.includes(a.id);
    const bUnlocked = unlockedAchievements.includes(b.id);
    if (aUnlocked !== bUnlocked) return bUnlocked ? 1 : -1;
    
    // Then sort by XP reward
    return b.xpReward - a.xpReward;
  });

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {sortedAchievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          unlocked={unlockedAchievements.includes(achievement.id)}
        />
      ))}
    </div>
  );
}