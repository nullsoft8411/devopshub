import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface Suggestion {
  message: string;
  command?: string;
  type: 'syntax' | 'improvement' | 'correction';
}

interface Hint {
  id: string;
  title: string;
  content?: string;
  type: 'basic' | 'detailed';
}

export function useLabAssistant(labId: string, taskId: number) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [hints, setHints] = useState<Hint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSyntax = useCallback(async (command: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await api.post(`/labs/${labId}/tasks/${taskId}/analyze`, {
        command
      });
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError('Failed to analyze command');
    } finally {
      setIsAnalyzing(false);
    }
  }, [labId, taskId]);

  const requestHint = useCallback(async (hintId: string) => {
    try {
      const response = await api.get(`/labs/${labId}/tasks/${taskId}/hints/${hintId}`);
      setHints(prev =>
        prev.map(hint =>
          hint.id === hintId ? { ...hint, content: response.data.content } : hint
        )
      );
    } catch (err) {
      setError('Failed to retrieve hint');
    }
  }, [labId, taskId]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    hints,
    isAnalyzing,
    error,
    analyzeSyntax,
    requestHint,
    clearSuggestions
  };
}