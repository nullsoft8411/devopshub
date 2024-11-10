import React from 'react';
import { CommandPart } from '@/lib/validation/commandAnalyzer';

interface CommandAnalysisProps {
  parts: CommandPart[];
  className?: string;
}

export function CommandAnalysis({ parts, className = '' }: CommandAnalysisProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="font-mono text-sm">
        {parts.map((part, index) => (
          <span
            key={index}
            className={`inline-block px-1 rounded ${
              part.isCorrect
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {part.value}
            <span className="ml-1 text-xs text-gray-500">
              ({part.type})
            </span>
            {index < parts.length - 1 && <span className="mx-1">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}