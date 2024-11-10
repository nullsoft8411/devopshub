import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlockedAt?: Date;
  progress?: number;
}

export function useAchievements(userId: string) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAchievements = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}/achievements`);
      setAchievements(response.data);
    } catch (err) {
      setError('Failed to load achievements');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  const checkAchievements = useCallback(async () => {
    try {
      const response = await api.post(`/users/${userId}/achievements/check`);
      const newAchievements = response.data.newAchievements;
      
      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
      }
      
      return newAchievements;
    } catch (err) {
      setError('Failed to check achievements');
      return [];
    }
  }, [userId]);

  return {
    achievements,
    isLoading,
    error,
    checkAchievements,
    refreshAchievements: loadAchievements
  };
}