import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';
import { Achievement, AchievementProgress } from '@/types/achievement';

export function useAchievementProgress(userId: string) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progress, setProgress] = useState<AchievementProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAchievements = useCallback(async () => {
    setIsLoading(true);
    try {
      const [achievementsResponse, progressResponse] = await Promise.all([
        api.get('/achievements'),
        api.get(`/users/${userId}/achievements/progress`)
      ]);
      setAchievements(achievementsResponse.data);
      setProgress(progressResponse.data);
    } catch (err) {
      setError('Failed to load achievements');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const checkAchievements = useCallback(async () => {
    if (!progress) return [];

    try {
      const response = await api.post(`/users/${userId}/achievements/check`);
      const newAchievements = response.data.newAchievements;
      
      if (newAchievements.length > 0) {
        setProgress(prev => ({
          ...prev!,
          unlockedAchievements: [
            ...prev!.unlockedAchievements,
            ...newAchievements.map((a: Achievement) => a.id)
          ]
        }));
      }

      return newAchievements;
    } catch (err) {
      setError('Failed to check achievements');
      return [];
    }
  }, [userId, progress]);

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  return {
    achievements,
    progress,
    isLoading,
    error,
    checkAchievements,
    loadAchievements
  };
}