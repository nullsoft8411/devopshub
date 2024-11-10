import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'documentation' | 'cheatsheet' | 'guide';
  description: string;
  tags: string[];
}

export function useLabResources(labId: string) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/labs/${labId}/resources`);
      setResources(response.data);
    } catch (err) {
      setError('Failed to load resources');
    } finally {
      setIsLoading(false);
    }
  }, [labId]);

  const bookmarkResource = useCallback(async (resourceId: string) => {
    try {
      await api.post(`/resources/${resourceId}/bookmark`);
      setResources(prev =>
        prev.map(resource =>
          resource.id === resourceId
            ? { ...resource, bookmarked: true }
            : resource
        )
      );
    } catch (err) {
      setError('Failed to bookmark resource');
    }
  }, []);

  return {
    resources,
    isLoading,
    error,
    fetchResources,
    bookmarkResource
  };
}