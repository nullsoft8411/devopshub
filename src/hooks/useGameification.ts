import { useState, useCallback, useEffect } from 'react';
import { useAchievements } from './useAchievements';
import { api } from '@/lib/api';

interface GameificationState {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActive?: Date;
  dailyGoalsCompleted: string[];
}

export function useGameification(userId: string) {
  const [state, setState] = useState<GameificationState>({
    xp: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    dailyGoalsCompleted: []
  });

  const { checkAchievements } = useAchievements(userId);

  const loadGameState = useCallback(async () => {
    try {
      const response = await api.get(`/users/${userId}/gameification`);
      setState(response.data);
    } catch (err) {
      console.error('Failed to load gameification state:', err);
    }
  }, [userId]);

  const addXP = useCallback(async (amount: number) => {
    try {
      const response = await api.post(`/users/${userId}/xp`, { amount });
      setState(prev => ({
        ...prev,
        xp: response.data.xp,
        level: response.data.level
      }));

      // Check for new achievements
      await checkAchievements();
    } catch (err) {
      console.error('Failed to add XP:', err);
    }
  }, [userId, checkAchievements]);

  const updateStreak = useCallback(async () => {
    try {
      const response = await api.post(`/users/${userId}/streak`);
      setState(prev => ({
        ...prev,
        currentStreak: response.data.currentStreak,
        longestStreak: response.data.longestStreak,
        lastActive: response.data.lastActive
      }));
    } catch (err) {
      console.error('Failed to update streak:', err);
    }
  }, [userId]);

  const completeDailyGoal = useCallback(async (goalId: string) => {
    try {
      const response = await api.post(`/users/${userId}/daily-goals/${goalId}`);
      setState(prev => ({
        ...prev,
        dailyGoalsCompleted: response.data.completedGoals,
        xp: response.data.xp,
        level: response.data.level
      }));
    } catch (err) {
      console.error('Failed to complete daily goal:', err);
    }
  }, [userId]);

  useEffect(() => {
    loadGameState();
  }, [loadGameState]);

  return {
    ...state,
    addXP,
    updateStreak,
    completeDailyGoal
  };
}