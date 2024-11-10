import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface AdminStats {
  totalUsers: number;
  userGrowth: number;
  activeLabs: number;
  labGrowth: number;
  courseCompletions: number;
  completionGrowth: number;
  certificatesIssued: number;
  certificateGrowth: number;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    userGrowth: 0,
    activeLabs: 0,
    labGrowth: 0,
    courseCompletions: 0,
    completionGrowth: 0,
    certificatesIssued: 0,
    certificateGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load admin stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}