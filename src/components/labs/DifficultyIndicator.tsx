import React from 'react';
import { Brain, AlertCircle } from 'lucide-react';

interface DifficultyIndicatorProps {
  complexity: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DifficultyIndicator({
  complexity,
  showLabel = true,
  size = 'md',
  className = ''
}: DifficultyIndicatorProps) {
  const getColor = () => {
    if (complexity < 30) return 'text-green-600 bg-green-100';
    if (complexity < 60) return 'text-blue-600 bg-blue-100';
    return 'text-purple-600 bg-purple-100';
  };

  const getSize = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-6 w-6';
      default:
        return 'h-5 w-5';
    }
  };

  const getLabel = () => {
    if (complexity < 30) return 'Basic';
    if (complexity < 60) return 'Intermediate';
    return 'Advanced';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`p-1.5 rounded-lg ${getColor()}`}>
        <Brain className={getSize()} />
      </div>
      {showLabel && (
        <span className={`text-sm font-medium ${getColor().split(' ')[0]}`}>
          {getLabel()}
        </span>
      )}
      {complexity >= 80 && (
        <AlertCircle className="h-4 w-4 text-yellow-500" />
      )}
    </div>
  );
}