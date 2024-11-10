import React from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface CommandSuggestionsProps {
  commands: string[];
  onSelect: (command: string) => void;
  className?: string;
}

export function CommandSuggestions({
  commands,
  onSelect,
  className = ''
}: CommandSuggestionsProps) {
  if (commands.length === 0) return null;

  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 text-gray-400 mb-3">
        <Terminal className="h-4 w-4" />
        <span className="text-sm">Similar Commands</span>
      </div>

      <div className="space-y-2">
        {commands.map((command, index) => (
          <button
            key={index}
            onClick={() => onSelect(command)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 text-left transition-colors"
          >
            <code className="text-sm font-mono text-blue-400">{command}</code>
            <ArrowRight className="h-4 w-4 text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  );
}