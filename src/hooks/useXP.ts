import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface XPState {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  progress: number;
}

export function useXP(userId: string) {
  const [state, setState] = useState<XPState>({
    currentXP: 0,
    level: 1,
    xpToNextLevel: 100,
    progress: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadXP = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}/xp`);
      setState(response.data);
    } catch (err) {
      setError('Failed to load XP');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const addXP = useCallback(async (amount: number) => {
    try {
      const response = await api.post(`/users/${userId}/xp`, { amount });
      setState(response.data);
      return response.data;
    } catch (err) {
      setError('Failed to add XP');
      throw err;
    }
  }, [userId]);

  return {
    ...state,
    isLoading,
    error,
    loadXP,
    addXP
  };
}