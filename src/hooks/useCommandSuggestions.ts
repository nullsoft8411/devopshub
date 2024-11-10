import { useState, useCallback } from 'react';
import { commandRegistry } from '@/lib/command-registry';

interface CommandSuggestion {
  command: string;
  description: string;
  example?: string;
}

export function useCommandSuggestions() {
  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([]);

  const getSimilarCommands = useCallback((input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const similarCommands = Object.entries(commandRegistry)
      .filter(([command]) => {
        const similarity = calculateSimilarity(command, input);
        return similarity > 0.5; // Adjust threshold as needed
      })
      .map(([command, details]) => ({
        command,
        description: details.description,
        example: details.example
      }))
      .sort((a, b) => {
        const similarityA = calculateSimilarity(a.command, input);
        const similarityB = calculateSimilarity(b.command, input);
        return similarityB - similarityA;
      })
      .slice(0, 5); // Show top 5 suggestions

    setSuggestions(similarCommands);
  }, []);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    return (longer.length - editDistance(longer, shorter)) / longer.length;
  };

  const editDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  return {
    suggestions,
    getSimilarCommands
  };
}