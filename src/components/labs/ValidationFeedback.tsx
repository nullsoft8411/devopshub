import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock, Target } from 'lucide-react';
import { ValidationResult } from '@/lib/validation/ValidationEngine';

interface ValidationFeedbackProps {
  result: ValidationResult;
  className?: string;
}

export function ValidationFeedback({ result, className = '' }: ValidationFeedbackProps) {
  return (
    <div className={`p-4 rounded-lg ${
      result.isValid 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-red-50 border border-red-200'
    } ${className}`}>
      <div className="flex items-start space-x-3">
        {result.isValid ? (
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
        )}
        
        <div className="flex-1">
          <p className={`font-medium ${
            result.isValid ? 'text-green-800' : 'text-red-800'
          }`}>
            {result.message}
          </p>

          {result.output && (
            <pre className="mt-2 p-2 bg-black/5 rounded text-sm font-mono overflow-x-auto">
              {result.output}
            </pre>
          )}

          {result.errors && result.errors.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-red-700">
              {result.errors.map((error, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          )}

          {result.suggestions && result.suggestions.length > 0 && (
            <div className="mt-3 bg-white/50 rounded-lg p-3">
              <p className="font-medium text-gray-900 mb-2">Suggestions:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {result.performance && (
            <div className="mt-3 pt-3 border-t border-black/10 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {Math.round(result.performance.timeSpent / 1000)}s
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {result.performance.attempts} attempts
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {result.performance.efficiency}% efficient
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}