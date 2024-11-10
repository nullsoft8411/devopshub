import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Step {
  title: string;
  description: string;
  code?: string;
  tips?: string[];
  warning?: string;
  links?: Array<{
    title: string;
    url: string;
  }>;
}

interface TaskGuide {
  title: string;
  description: string;
  steps: Step[];
}

export function useTaskGuide(labId: string, taskId: number) {
  const [guide, setGuide] = useState<TaskGuide | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGuide = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/labs/${labId}/tasks/${taskId}/guide`);
      setGuide(response.data);
    } catch (err) {
      setError('Failed to load task guide');
    } finally {
      setIsLoading(false);
    }
  }, [labId, taskId]);

  const completeStep = useCallback(async () => {
    if (!guide) return;

    try {
      await api.post(`/labs/${labId}/tasks/${taskId}/steps/${currentStep}/complete`);
      
      if (currentStep < guide.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to complete step');
    }
  }, [labId, taskId, currentStep, guide]);

  const resetProgress = useCallback(() => {
    setCurrentStep(0);
  }, []);

  return {
    guide,
    currentStep,
    isLoading,
    error,
    loadGuide,
    completeStep,
    resetProgress
  };
}