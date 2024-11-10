import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

interface Reward {
  id: string;
  title: string;
  description: string;
  xpRequired: number;
  icon: string;
  claimed: boolean;
}

export function useRewards(userId: string) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRewards = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}/rewards`);
      setRewards(response.data);
    } catch (err) {
      setError('Failed to load rewards');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadRewards();
  }, [loadRewards]);

  const claimReward = useCallback(async (rewardId: string) => {
    try {
      await api.post(`/users/${userId}/rewards/${rewardId}/claim`);
      setRewards(prev =>
        prev.map(reward =>
          reward.id === rewardId ? { ...reward, claimed: true } : reward
        )
      );
    } catch (err) {
      setError('Failed to claim reward');
      throw err;
    }
  }, [userId]);

  return {
    rewards,
    isLoading,
    error,
    claimReward,
    refreshRewards: loadRewards
  };
}