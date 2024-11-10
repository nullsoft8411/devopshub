import { useState, useCallback } from 'react';

interface UseLabProgressProps {
  totalTasks: number;
  onComplete?: () => void;
}

export function useLabProgress({ totalTasks, onComplete }: UseLabProgressProps) {
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);

  const completeTask = useCallback((taskIndex: number) => {
    if (taskIndex === activeTaskIndex) {
      setCompletedTasks((prev) => {
        const newCount = prev + 1;
        if (newCount === totalTasks && onComplete) {
          onComplete();
        }
        return newCount;
      });
      
      if (taskIndex < totalTasks - 1) {
        setActiveTaskIndex(taskIndex + 1);
      }
    }
  }, [activeTaskIndex, totalTasks, onComplete]);

  const selectTask = useCallback((taskIndex: number) => {
    if (taskIndex <= completedTasks) {
      setActiveTaskIndex(taskIndex);
    }
  }, [completedTasks]);

  return {
    completedTasks,
    activeTaskIndex,
    completeTask,
    selectTask,
  };
}