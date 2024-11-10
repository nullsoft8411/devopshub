import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface AnalyticsData {
  totalAttempts: number;
  averageCompletionTime: string;
  successRate: number;
  averageRating: number;
  difficultyDistribution: {
    tooEasy: number;
    justRight: number;
    tooHard: number;
  };
  helpfulnessScore: number;
  conceptsLearned: Array<{
    name: string;
    count: number;
  }>;
}

export function useLabAnalytics(labId: string) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/labs/${labId}/analytics`);
      setData(response.data);
    } catch (err) {
      setError('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  }, [labId]);

  const refreshAnalytics = useCallback(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    data,
    isLoading,
    error,
    refreshAnalytics
  };
}