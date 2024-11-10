import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

interface TaskMetrics {
  complexity: number;
  attempts: number;
  timeSpent: number;
  expectedTime: number;
  performanceScore: number;
}

export function useTaskDifficulty(labId: string, taskId: number) {
  const [metrics, setMetrics] = useState<TaskMetrics>({
    complexity: 0,
    attempts: 0,
    timeSpent: 0,
    expectedTime: 0,
    performanceScore: 100
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMetrics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/labs/${labId}/tasks/${taskId}/metrics`);
      setMetrics(response.data);
    } catch (err) {
      setError('Failed to load task metrics');
    } finally {
      setIsLoading(false);
    }
  }, [labId, taskId]);

  const updateMetrics = useCallback(async (update: Partial<TaskMetrics>) => {
    try {
      const response = await api.post(`/labs/${labId}/tasks/${taskId}/metrics`, update);
      setMetrics(response.data);
    } catch (err) {
      setError('Failed to update metrics');
    }
  }, [labId, taskId]);

  const requestAssistance = useCallback(async () => {
    try {
      const response = await api.post(`/labs/${labId}/tasks/${taskId}/assistance`);
      return response.data;
    } catch (err) {
      setError('Failed to request assistance');
      throw err;
    }
  }, [labId, taskId]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  return {
    metrics,
    isLoading,
    error,
    updateMetrics,
    requestAssistance
  };
}