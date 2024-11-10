import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

interface Skill {
  name: string;
  value: number;
  fullMark: number;
}

interface Metric {
  name: string;
  value: number;
  trend: number;
  unit: string;
}

interface Recommendation {
  title: string;
  description: string;
  resourceUrl?: string;
}

interface Assessment {
  score: number;
  completionTime: string;
  accuracy: number;
  efficiency: number;
  skills: Skill[];
  metrics: Metric[];
  recommendations: Recommendation[];
}

export function useLabAssessment(labId: string, userId: string) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessment = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/labs/${labId}/users/${userId}/assessment`);
      setAssessment(response.data);
    } catch (err) {
      setError('Failed to load assessment');
    } finally {
      setIsLoading(false);
    }
  }, [labId, userId]);

  useEffect(() => {
    fetchAssessment();
  }, [fetchAssessment]);

  const generateReport = useCallback(async () => {
    try {
      const response = await api.post(`/labs/${labId}/users/${userId}/assessment/report`);
      return response.data;
    } catch (err) {
      setError('Failed to generate report');
      throw err;
    }
  }, [labId, userId]);

  return {
    assessment,
    isLoading,
    error,
    generateReport,
    refreshAssessment: fetchAssessment
  };
}