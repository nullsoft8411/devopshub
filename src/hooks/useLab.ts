import { useState, useCallback, useEffect } from 'react';
import { Lab, LabTask } from '@/types/lab';
import { useLabProgress } from '@/contexts/LabProgressContext';

interface UseLabProps {
  lab: Lab;
  onComplete?: () => void;
}

export function useLab({ lab, onComplete }: UseLabProps) {
  const {
    startLab,
    completeTask,
    getLabProgress,
    isLoading,
    error
  } = useLabProgress();

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const currentTask = lab.tasks[activeTaskIndex];

  // Initialize lab progress
  useEffect(() => {
    const initLab = async () => {
      const progress = getLabProgress(lab.id);
      if (!progress) {
        await startLab(lab.id);
      } else {
        setCompletedTasks(progress.completedTasks);
        setActiveTaskIndex(Math.min(progress.completedTasks.length, lab.tasks.length - 1));
      }
    };

    initLab();
  }, [lab.id, lab.tasks.length, getLabProgress, startLab]);

  const handleTaskCompletion = useCallback(async (taskId: number) => {
    if (completedTasks.includes(taskId)) return;

    try {
      await completeTask(lab.id, taskId);
      
      setCompletedTasks(prev => [...prev, taskId]);
      
      if (activeTaskIndex < lab.tasks.length - 1) {
        setActiveTaskIndex(activeTaskIndex + 1);
      } else if (onComplete) {
        onComplete();
      }
    } catch (err) {
      // Error handling is managed by the context
    }
  }, [activeTaskIndex, completedTasks, lab.id, lab.tasks.length, completeTask, onComplete]);

  const selectTask = useCallback((index: number) => {
    if (index < 0 || index >= lab.tasks.length) return;
    if (index > activeTaskIndex && !completedTasks.includes(lab.tasks[index - 1].id)) return;
    
    setActiveTaskIndex(index);
  }, [activeTaskIndex, completedTasks, lab.tasks]);

  return {
    currentTask,
    activeTaskIndex,
    completedTasks,
    isLoading,
    error,
    handleTaskCompletion,
    selectTask
  };
}