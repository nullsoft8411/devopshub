import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '@/lib/axios';
import { LearningPath, PathProgress } from '@/types/learning-path';

interface LearningPathContextType {
  paths: Record<string, PathProgress>;
  isLoading: boolean;
  error: string | null;
  startPath: (pathId: string) => Promise<void>;
  updateProgress: (pathId: string, courseId: string) => Promise<void>;
  getPathProgress: (pathId: string) => PathProgress | null;
  checkPrerequisites: (pathId: string) => Promise<boolean>;
}

const LearningPathContext = createContext<LearningPathContextType | undefined>(undefined);

export function LearningPathProvider({ children }: { children: React.ReactNode }) {
  const [paths, setPaths] = useState<Record<string, PathProgress>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startPath = useCallback(async (pathId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<PathProgress>(`/paths/${pathId}/start`);
      setPaths(prev => ({
        ...prev,
        [pathId]: response.data
      }));
    } catch (err) {
      setError('Failed to start learning path');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProgress = useCallback(async (pathId: string, courseId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<PathProgress>(`/paths/${pathId}/progress`, {
        courseId
      });
      setPaths(prev => ({
        ...prev,
        [pathId]: response.data
      }));
    } catch (err) {
      setError('Failed to update progress');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPathProgress = useCallback((pathId: string) => {
    return paths[pathId] || null;
  }, [paths]);

  const checkPrerequisites = useCallback(async (pathId: string) => {
    try {
      const response = await api.get<{ met: boolean }>(`/paths/${pathId}/prerequisites`);
      return response.data.met;
    } catch (err) {
      setError('Failed to check prerequisites');
      return false;
    }
  }, []);

  return (
    <LearningPathContext.Provider
      value={{
        paths,
        isLoading,
        error,
        startPath,
        updateProgress,
        getPathProgress,
        checkPrerequisites
      }}
    >
      {children}
    </LearningPathContext.Provider>
  );
}

export function useLearningPath() {
  const context = useContext(LearningPathContext);
  if (!context) {
    throw new Error('useLearningPath must be used within a LearningPathProvider');
  }
  return context;
}