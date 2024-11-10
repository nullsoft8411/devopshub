import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '@/lib/axios';
import { Lab, LabProgress } from '@/types/lab';

interface LabProgressContextType {
  progress: Record<string, LabProgress>;
  isLoading: boolean;
  error: string | null;
  startLab: (labId: string) => Promise<void>;
  completeTask: (labId: string, taskId: number) => Promise<void>;
  getLabProgress: (labId: string) => LabProgress | null;
}

const LabProgressContext = createContext<LabProgressContextType | undefined>(undefined);

export function LabProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Record<string, LabProgress>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startLab = useCallback(async (labId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<LabProgress>(`/labs/${labId}/start`);
      setProgress(prev => ({
        ...prev,
        [labId]: response.data
      }));
    } catch (err) {
      setError('Failed to start lab');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeTask = useCallback(async (labId: string, taskId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<LabProgress>(`/labs/${labId}/tasks/${taskId}/complete`);
      setProgress(prev => ({
        ...prev,
        [labId]: response.data
      }));
    } catch (err) {
      setError('Failed to update progress');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLabProgress = useCallback((labId: string) => {
    return progress[labId] || null;
  }, [progress]);

  return (
    <LabProgressContext.Provider
      value={{
        progress,
        isLoading,
        error,
        startLab,
        completeTask,
        getLabProgress
      }}
    >
      {children}
    </LabProgressContext.Provider>
  );
}

export function useLabProgress() {
  const context = useContext(LabProgressContext);
  if (!context) {
    throw new Error('useLabProgress must be used within a LabProgressProvider');
  }
  return context;
}