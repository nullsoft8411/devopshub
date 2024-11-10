export enum AchievementType {
  LAB = 'lab',
  PATH = 'path',
  SPEED = 'speed',
  SCORE = 'score',
  STREAK = 'streak'
}

export interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: (progress: AchievementProgress) => boolean;
}

export interface AchievementProgress {
  userId: string;
  completedLabs: number;
  completedPaths: number;
  fastCompletions: number;
  perfectScores: number;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  unlockedAchievements: string[];
}