import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { LabFeedback } from '@/components/labs/FeedbackForm';

interface FeedbackStats {
  averageRating: number;
  totalRatings: number;
  difficultyDistribution: {
    too_easy: number;
    just_right: number;
    too_hard: number;
  };
  helpfulPercentage: number;
  conceptsLearned: Array<{
    name: string;
    count: number;
  }>;
}

export function useLabFeedback(labId: string) {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = useCallback(async (feedback: LabFeedback) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post(`/labs/${labId}/feedback`, feedback);
      setStats(response.data.stats);
    } catch (err) {
      setError('Failed to submit feedback');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [labId]);

  const loadFeedbackStats = useCallback(async () => {
    try {
      const response = await api.get(`/labs/${labId}/feedback/stats`);
      setStats(response.data);
    } catch (err) {
      setError('Failed to load feedback stats');
    }
  }, [labId]);

  return {
    stats,
    isSubmitting,
    error,
    submitFeedback,
    loadFeedbackStats
  };
}