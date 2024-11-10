import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  prerequisites: string[];
  xpRequired: number;
}

export function useSkillTree(userId: string) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSkills = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/users/${userId}/skills`);
      setSkills(response.data);
    } catch (err) {
      setError('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const unlockSkill = useCallback(async (skillId: string) => {
    try {
      const response = await api.post(`/users/${userId}/skills/${skillId}/unlock`);
      setSkills(prev =>
        prev.map(skill =>
          skill.id === skillId ? { ...skill, ...response.data } : skill
        )
      );
      return response.data;
    } catch (err) {
      setError('Failed to unlock skill');
      throw err;
    }
  }, [userId]);

  return {
    skills,
    isLoading,
    error,
    unlockSkill,
    refreshSkills: loadSkills
  };
}