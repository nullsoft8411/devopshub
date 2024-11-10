import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

export function useStreak(userId: string) {
  const [streakDays, setStreakDays] = useState<Date[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStreak = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}/streak`);
      setStreakDays(response.data.streakDays.map((d: string) => new Date(d)));
      setCurrentStreak(response.data.currentStreak);
      setLongestStreak(response.data.longestStreak);
    } catch (err) {
      setError('Failed to load streak data');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadStreak();
  }, [loadStreak]);

  const updateStreak = useCallback(async () => {
    try {
      const response = await api.post(`/users/${userId}/streak/update`);
      setStreakDays(response.data.streakDays.map((d: string) => new Date(d)));
      setCurrentStreak(response.data.currentStreak);
      setLongestStreak(response.data.longestStreak);
    } catch (err) {
      setError('Failed to update streak');
      throw err;
    }
  }, [userId]);

  return {
    streakDays,
    currentStreak,
    longestStreak,
    isLoading,
    error,
    updateStreak,
    refreshStreak: loadStreak
  };
}