import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';

interface CodeSnippet {
  id: string;
  code: string;
  language: string;
  description: string;
}

interface NotebookEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: Date;
  codeSnippets?: CodeSnippet[];
}

export function useLabNotebook(labId: string) {
  const [entries, setEntries] = useState<NotebookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/labs/${labId}/notebook`);
      setEntries(response.data);
    } catch (err) {
      setError('Failed to load notebook entries');
    } finally {
      setIsLoading(false);
    }
  }, [labId]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const addEntry = useCallback(async (entry: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    try {
      const response = await api.post(`/labs/${labId}/notebook`, entry);
      setEntries(prev => [...prev, response.data]);
    } catch (err) {
      setError('Failed to add entry');
      throw err;
    }
  }, [labId]);

  const updateEntry = useCallback(async (entry: NotebookEntry) => {
    try {
      const response = await api.put(`/labs/${labId}/notebook/${entry.id}`, entry);
      setEntries(prev =>
        prev.map(e => e.id === entry.id ? response.data : e)
      );
    } catch (err) {
      setError('Failed to update entry');
      throw err;
    }
  }, [labId]);

  const deleteEntry = useCallback(async (entryId: string) => {
    try {
      await api.delete(`/labs/${labId}/notebook/${entryId}`);
      setEntries(prev => prev.filter(e => e.id !== entryId));
    } catch (err) {
      setError('Failed to delete entry');
      throw err;
    }
  }, [labId]);

  const addCodeSnippet = useCallback(async (
    entryId: string,
    snippet: Omit<CodeSnippet, 'id'>
  ) => {
    try {
      const response = await api.post(
        `/labs/${labId}/notebook/${entryId}/snippets`,
        snippet
      );
      setEntries(prev =>
        prev.map(entry =>
          entry.id === entryId
            ? {
                ...entry,
                codeSnippets: [...(entry.codeSnippets || []), response.data]
              }
            : entry
        )
      );
    } catch (err) {
      setError('Failed to add code snippet');
      throw err;
    }
  }, [labId]);

  return {
    entries,
    isLoading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    addCodeSnippet,
    refreshEntries: loadEntries
  };
}</content>