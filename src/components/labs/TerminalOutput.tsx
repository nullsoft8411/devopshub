import React from 'react';

interface TerminalOutputProps {
  content: string;
  type: 'success' | 'error' | 'info';
}

export function TerminalOutput({ content, type }: TerminalOutputProps) {
  const getColorClass = () => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'info':
      default:
        return 'text-gray-300';
    }
  };

  return (
    <pre className={`font-mono text-sm whitespace-pre-wrap ${getColorClass()}`}>
      {content}
    </pre>
  );
}