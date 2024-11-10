import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'documentation' | 'snippet' | 'reference';
  url?: string;
  tags?: string[];
  content?: string;
}

export function useResources(labId: string, taskId?: number) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/resources', {
          params: { labId, taskId }
        });
        setResources(response.data);
      } catch (err) {
        setError('Failed to load resources');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [labId, taskId]);

  return {
    resources,
    isLoading,
    error
  };
}