import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface DifficultyLevel {
  id: string;
  name: string;
  description: string;
  timeCommitment: string;
  prerequisites: string[];
  recommendedFor: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export function useDifficultySelector() {
  const [levels, setLevels] = useState<DifficultyLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDifficultyLevels = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/difficulty-levels');
      setLevels(response.data);
    } catch (err) {
      setError('Failed to load difficulty levels');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectLevel = useCallback((levelId: string) => {
    setSelectedLevel(levelId);
  }, []);

  const getRecommendedLevel = useCallback((userSkillLevel: string) => {
    return levels.find(level => level.skillLevel === userSkillLevel)?.id;
  }, [levels]);

  return {
    levels,
    selectedLevel,
    isLoading,
    error,
    loadDifficultyLevels,
    selectLevel,
    getRecommendedLevel
  };
}