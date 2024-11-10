import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { ValidationResult } from '@/lib/validation/labValidator';

interface LabValidationProps {
  result: ValidationResult | null;
  className?: string;
}

export function LabValidation({ result, className = '' }: LabValidationProps) {
  if (!result) return null;

  return (
    <div
      className={`p-4 rounded-lg ${
        result.isValid
          ? 'bg-green-50 border border-green-200'
          : 'bg-red-50 border border-red-200'
      } ${className}`}
    >
      <div className="flex items-start">
        {result.isValid ? (
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
        )}
        <div className="ml-3">
          <p className={`text-sm font-medium ${
            result.isValid ? 'text-green-800' : 'text-red-800'
          }`}>
            {result.message}
          </p>
          {result.suggestion && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <AlertTriangle className="w-4 h-4 mr-1.5 text-gray-500" />
              {result.suggestion}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}