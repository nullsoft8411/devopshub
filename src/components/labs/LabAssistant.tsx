import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Lightbulb, Target, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLabAssistant } from '@/hooks/useLabAssistant';

interface LabAssistantProps {
  labId: string;
  taskId: number;
  currentCommand?: string;
  onSuggestionApply: (command: string) => void;
  className?: string;
}

export function LabAssistant({
  labId,
  taskId,
  currentCommand,
  onSuggestionApply,
  className = ''
}: LabAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    suggestions,
    hints,
    isAnalyzing,
    error,
    analyzeSyntax,
    requestHint,
    clearSuggestions
  } = useLabAssistant(labId, taskId);

  const handleCommandAnalysis = () => {
    if (currentCommand) {
      analyzeSyntax(currentCommand);
      setIsExpanded(true);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Lab Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <X className="h-4 w-4" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Command Analysis */}
          {currentCommand && (
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCommandAnalysis}
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Command'}
              </Button>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Suggestions</h4>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-blue-900">{suggestion.message}</p>
                      {suggestion.command && (
                        <code className="mt-1 text-sm font-mono bg-blue-100 px-2 py-1 rounded text-blue-800">
                          {suggestion.command}
                        </code>
                      )}
                    </div>
                    {suggestion.command && (
                      <Button
                        size="sm"
                        onClick={() => onSuggestionApply(suggestion.command!)}
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hints */}
          {hints.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Available Hints</h4>
              {hints.map((hint, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-900">{hint.title}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => requestHint(hint.id)}
                      className="mt-2"
                    >
                      Reveal Hint
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Learning Resources */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-gray-600" />
              <h4 className="text-sm font-medium text-gray-900">Learning Goals</h4>
            </div>
            <p className="text-sm text-gray-600">
              Understanding and mastering this task will help you learn:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <span>•</span>
                <span>Command syntax and structure</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>•</span>
                <span>Common usage patterns</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>•</span>
                <span>Best practices and conventions</span>
              </li>
            </ul>
          </div>

          {error && (
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}