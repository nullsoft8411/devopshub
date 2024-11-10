import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '@/lib/axios';
import { Course, CourseProgress } from '@/types/course';

interface CourseContextType {
  courses: Record<string, CourseProgress>;
  isLoading: boolean;
  error: string | null;
  startCourse: (courseId: string) => Promise<void>;
  completeLesson: (courseId: string, lessonId: string) => Promise<void>;
  getCourseProgress: (courseId: string) => CourseProgress | null;
  updateQuizScore: (courseId: string, lessonId: string, score: number) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Record<string, CourseProgress>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCourse = useCallback(async (courseId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<CourseProgress>(`/courses/${courseId}/start`);
      setCourses(prev => ({
        ...prev,
        [courseId]: response.data
      }));
    } catch (err) {
      setError('Failed to start course');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeLesson = useCallback(async (courseId: string, lessonId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<CourseProgress>(`/courses/${courseId}/lessons/${lessonId}/complete`);
      setCourses(prev => ({
        ...prev,
        [courseId]: response.data
      }));
    } catch (err) {
      setError('Failed to update progress');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuizScore = useCallback(async (courseId: string, lessonId: string, score: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<CourseProgress>(`/courses/${courseId}/lessons/${lessonId}/quiz`, {
        score
      });
      setCourses(prev => ({
        ...prev,
        [courseId]: response.data
      }));
    } catch (err) {
      setError('Failed to update quiz score');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCourseProgress = useCallback((courseId: string) => {
    return courses[courseId] || null;
  }, [courses]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        isLoading,
        error,
        startCourse,
        completeLesson,
        getCourseProgress,
        updateQuizScore
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}