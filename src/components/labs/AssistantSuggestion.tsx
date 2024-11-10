import React from 'react';
import { Lightbulb, Code, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface AssistantSuggestionProps {
  message: string;
  command?: string;
  type: 'syntax' | 'improvement' | 'correction';
  onApply?: (command: string) => void;
  className?: string;
}

export function AssistantSuggestion({
  message,
  command,
  type,
  onApply,
  className = ''
}: AssistantSuggestionProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'syntax':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'improvement':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'correction':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getTypeStyles()} ${className}`}>
      <div className="flex items-start space-x-3">
        {type === 'syntax' ? (
          <Code className="h-5 w-5 mt-0.5" />
        ) : (
          <Lightbulb className="h-5 w-5 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
          {command && (
            <div className="mt-2 flex items-center justify-between">
              <code className="text-sm font-mono px-2 py-1 bg-white/50 rounded">
                {command}
              </code>
              {onApply && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onApply(command)}
                  className="ml-4"
                >
                  Apply
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}