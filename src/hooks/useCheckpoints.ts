import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Checkpoint {
  id: string;
  taskId: number;
  timestamp: Date;
  environmentState: {
    containers: string[];
    networks: string[];
    volumes: string[];
    variables: Record<string, string>;
  };
  progress: number;
}

export function useCheckpoints(labId: string) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCheckpoints = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/labs/${labId}/checkpoints`);
      setCheckpoints(response.data);
    } catch (err) {
      setError('Failed to load checkpoints');
    } finally {
      setIsLoading(false);
    }
  }, [labId]);

  const createCheckpoint = useCallback(async (
    taskId: number,
    environmentState: Checkpoint['environmentState'],
    progress: number
  ) => {
    try {
      const response = await api.post(`/labs/${labId}/checkpoints`, {
        taskId,
        environmentState,
        progress
      });
      setCheckpoints(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create checkpoint');
      throw err;
    }
  }, [labId]);

  const restoreCheckpoint = useCallback(async (checkpointId: string) => {
    try {
      await api.post(`/labs/${labId}/checkpoints/${checkpointId}/restore`);
      return checkpoints.find(cp => cp.id === checkpointId);
    } catch (err) {
      setError('Failed to restore checkpoint');
      throw err;
    }
  }, [labId, checkpoints]);

  const deleteCheckpoint = useCallback(async (checkpointId: string) => {
    try {
      await api.delete(`/labs/${labId}/checkpoints/${checkpointId}`);
      setCheckpoints(prev => prev.filter(cp => cp.id !== checkpointId));
    } catch (err) {
      setError('Failed to delete checkpoint');
      throw err;
    }
  }, [labId]);

  return {
    checkpoints,
    isLoading,
    error,
    loadCheckpoints,
    createCheckpoint,
    restoreCheckpoint,
    deleteCheckpoint
  };
}