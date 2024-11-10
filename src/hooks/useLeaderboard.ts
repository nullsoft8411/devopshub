import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface LeaderboardEntry {
  id: string;
  rank: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  completionTime: string;
  accuracy: number;
  xpEarned: number;
  completedAt: string;
}

interface UseLeaderboardProps {
  labId: string;
  timeFrame?: 'all' | 'weekly' | 'monthly';
}

export function useLeaderboard({ labId, timeFrame = 'all' }: UseLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/labs/${labId}/leaderboard`, {
        params: { timeFrame }
      });
      setEntries(response.data);
    } catch (err) {
      setError('Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  }, [labId, timeFrame]);

  const refreshLeaderboard = useCallback(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return {
    entries,
    isLoading,
    error,
    refreshLeaderboard
  };
}