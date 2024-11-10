import { Achievement, AchievementType, AchievementProgress } from '@/types/achievement';

export class AchievementManager {
  private static achievements: Achievement[] = [
    {
      id: 'first-lab',
      type: AchievementType.LAB,
      title: 'First Steps',
      description: 'Complete your first lab',
      icon: 'Rocket',
      xpReward: 100,
      condition: (progress) => progress.completedLabs >= 1
    },
    {
      id: 'lab-master',
      type: AchievementType.LAB,
      title: 'Lab Master',
      description: 'Complete 10 labs',
      icon: 'Trophy',
      xpReward: 500,
      condition: (progress) => progress.completedLabs >= 10
    },
    {
      id: 'path-pioneer',
      type: AchievementType.PATH,
      title: 'Path Pioneer',
      description: 'Complete your first learning path',
      icon: 'Map',
      xpReward: 1000,
      condition: (progress) => progress.completedPaths >= 1
    },
    {
      id: 'quick-learner',
      type: AchievementType.SPEED,
      title: 'Quick Learner',
      description: 'Complete a lab in record time',
      icon: 'Zap',
      xpReward: 200,
      condition: (progress) => progress.fastCompletions >= 1
    },
    {
      id: 'perfect-score',
      type: AchievementType.SCORE,
      title: 'Perfect Score',
      description: 'Achieve 100% in any lab',
      icon: 'Star',
      xpReward: 300,
      condition: (progress) => progress.perfectScores >= 1
    }
  ];

  static checkAchievements(progress: AchievementProgress): Achievement[] {
    return this.achievements.filter(achievement => 
      achievement.condition(progress) && !progress.unlockedAchievements.includes(achievement.id)
    );
  }

  static getAchievement(id: string): Achievement | undefined {
    return this.achievements.find(achievement => achievement.id === id);
  }

  static calculateLevel(xp: number): number {
    // Level formula: level = 1 + floor(sqrt(xp / 100))
    return 1 + Math.floor(Math.sqrt(xp / 100));
  }

  static calculateXpForNextLevel(currentXp: number): number {
    const currentLevel = this.calculateLevel(currentXp);
    const nextLevelXp = Math.pow(currentLevel, 2) * 100;
    return nextLevelXp - currentXp;
  }

  static getProgressToNextLevel(currentXp: number): number {
    const currentLevel = this.calculateLevel(currentXp);
    const currentLevelXp = Math.pow(currentLevel - 1, 2) * 100;
    const nextLevelXp = Math.pow(currentLevel, 2) * 100;
    return ((currentXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  }
}