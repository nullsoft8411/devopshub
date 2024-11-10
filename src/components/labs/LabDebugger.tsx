import React, { useState } from 'react';
import { Bug, AlertCircle, CheckCircle, Terminal, ArrowRight, Code } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCommandAnalysis } from '@/hooks/useCommandAnalysis';

interface LabDebuggerProps {
  command: string;
  expectedOutput?: string;
  actualOutput: string;
  onSuggestionApply: (command: string) => void;
  className?: string;
}

export function LabDebugger({
  command,
  expectedOutput,
  actualOutput,
  onSuggestionApply,
  className = ''
}: LabDebuggerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { analysis, suggestions } = useCommandAnalysis(command, actualOutput);

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 bg-red-50 border-b border-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bug className="h-5 w-5 text-red-600" />
            <h3 className="font-medium text-gray-900">Command Analysis</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Debug Issue'}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Command Analysis */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Issue Details</h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">{analysis.error}</p>
                  {analysis.explanation && (
                    <p className="mt-1 text-sm text-gray-600">
                      {analysis.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Command Comparison */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Command Comparison</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Terminal className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Your command:</span>
                <code className="px-2 py-1 bg-gray-100 rounded text-red-600">
                  {command}
                </code>
              </div>
              {analysis.differences.map((diff, index) => (
                <div key={index} className="ml-6 text-sm text-gray-600">
                  • {diff}
                </div>
              ))}
            </div>
          </div>

          {/* Output Analysis */}
          {expectedOutput && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Output Analysis</h4>
              <div className="space-y-2">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">Expected:</p>
                  <pre className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">
                    {expectedOutput}
                  </pre>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">Actual:</p>
                  <pre className="mt-1 text-sm text-red-600 whitespace-pre-wrap">
                    {actualOutput}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Suggested Fixes</h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {suggestion.description}
                        </p>
                        <code className="text-sm text-green-600">
                          {suggestion.command}
                        </code>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onSuggestionApply(suggestion.command)}
                    >
                      Apply
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Common Mistakes</h4>
            <div className="bg-blue-50 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-blue-900">
                {analysis.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Code className="h-4 w-4 mt-0.5" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}