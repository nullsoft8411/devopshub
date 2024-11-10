import { useState, useEffect } from 'react';
import { CommandAnalyzer } from '@/lib/validation/commandAnalyzer';

interface CommandSuggestion {
  command: string;
  description: string;
}

interface CommandAnalysis {
  error: string;
  explanation?: string;
  differences: string[];
  commonMistakes: string[];
}

export function useCommandAnalysis(command: string, output: string) {
  const [analysis, setAnalysis] = useState<CommandAnalysis>({
    error: '',
    differences: [],
    commonMistakes: []
  });
  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([]);

  useEffect(() => {
    const analyzer = new CommandAnalyzer();
    const result = analyzer.analyzeCommand(command);
    
    setAnalysis({
      error: result.error,
      explanation: result.explanation,
      differences: result.differences,
      commonMistakes: result.commonMistakes
    });

    setSuggestions(result.suggestions);
  }, [command, output]);

  return {
    analysis,
    suggestions
  };
}