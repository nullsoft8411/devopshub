import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

interface ProgressStats {
  completedTasks: number;
  totalTasks: number;
  timeSpent: string;
  expectedTime: string;
  accuracy: number;
  lastActivity: Date;
}

export function useProgressTracking(labId: string) {
  const [stats, setStats] = useState<ProgressStats>({
    completedTasks: 0,
    totalTasks: 0,
    timeSpent: '0',
    expectedTime: '0',
    accuracy: 0,
    lastActivity: new Date()
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/labs/${labId}/progress`);
      setStats(response.data);
    } catch (err) {
      setError('Failed to load progress');
    } finally {
      setIsLoading(false);
    }
  }, [labId]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const updateProgress = useCallback(async (taskId: number, completed: boolean) => {
    try {
      const response = await api.post(`/labs/${labId}/progress`, {
        taskId,
        completed,
        timestamp: new Date().toISOString()
      });
      setStats(response.data);
    } catch (err) {
      setError('Failed to update progress');
      throw err;
    }
  }, [labId]);

  const updateTimeSpent = useCallback(async (timeInSeconds: number) => {
    try {
      const response = await api.post(`/labs/${labId}/progress/time`, {
        timeSpent: timeInSeconds
      });
      setStats(response.data);
    } catch (err) {
      setError('Failed to update time');
      throw err;
    }
  }, [labId]);

  return {
    stats,
    isLoading,
    error,
    updateProgress,
    updateTimeSpent,
    refreshProgress: loadProgress
  };
}