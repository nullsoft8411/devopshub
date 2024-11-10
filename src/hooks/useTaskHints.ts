import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Hint {
  id: number;
  type: 'basic' | 'detailed' | 'solution';
  content: string;
  cost: number;
}

export function useTaskHints(labId: string, taskId: number) {
  const [hints, setHints] = useState<Hint[]>([]);
  const [availablePoints, setAvailablePoints] = useState(100);
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHints = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/labs/${labId}/tasks/${taskId}/hints`);
      setHints(response.data.hints);
      setAvailablePoints(response.data.availablePoints);
    } catch (err) {
      setError('Failed to load hints');
    } finally {
      setIsLoading(false);
    }
  }, [labId, taskId]);

  const unlockHint = useCallback(async (hintId: number, cost: number) => {
    if (unlockedHints.includes(hintId)) return;
    if (availablePoints < cost) return;

    try {
      await api.post(`/labs/${labId}/tasks/${taskId}/hints/${hintId}/unlock`);
      setUnlockedHints(prev => [...prev, hintId]);
      setAvailablePoints(prev => prev - cost);
    } catch (err) {
      setError('Failed to unlock hint');
      throw err;
    }
  }, [labId, taskId, unlockedHints, availablePoints]);

  const resetHints = useCallback(() => {
    setUnlockedHints([]);
    setAvailablePoints(100);
  }, []);

  return {
    hints,
    availablePoints,
    unlockedHints,
    isLoading,
    error,
    loadHints,
    unlockHint,
    resetHints
  };
}