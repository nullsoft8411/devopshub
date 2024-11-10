import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Hint {
  id: number;
  type: 'basic' | 'detailed' | 'solution';
  content: string;
  cost: number;
}

export function useLabHints(labId: string, taskId: number) {
  const [hints, setHints] = useState<Hint[]>([]);
  const [availablePoints, setAvailablePoints] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHints = useCallback(async () => {
    setIsLoading(true);
    setError(null);

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

  const usePoints = useCallback(async (points: number) => {
    try {
      await api.post(`/labs/${labId}/tasks/${taskId}/use-points`, { points });
      setAvailablePoints(prev => prev - points);
    } catch (err) {
      setError('Failed to use points');
      throw err;
    }
  }, [labId, taskId]);

  const resetHints = useCallback(() => {
    setHints([]);
    setAvailablePoints(100);
    setError(null);
  }, []);

  return {
    hints,
    availablePoints,
    isLoading,
    error,
    fetchHints,
    usePoints,
    resetHints
  };
}