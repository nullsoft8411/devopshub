import { useState, useCallback } from 'react';
import { ValidationEngine, ValidationResult } from '@/lib/validation/ValidationEngine';
import { useLabProgress } from '@/contexts/LabProgressContext';

interface UseLabValidationProps {
  labId: string;
  taskId: number;
  expectedCommand: string;
  expectedOutput?: string;
  difficulty?: number;
  onSuccess?: () => void;
}

export function useLabValidation({
  labId,
  taskId,
  expectedCommand,
  expectedOutput,
  difficulty = 0,
  onSuccess
}: UseLabValidationProps) {
  const [validationEngine] = useState(() => new ValidationEngine());
  const [lastResult, setLastResult] = useState<ValidationResult | null>(null);
  const { updateProgress } = useLabProgress();

  const validateCommand = useCallback((command: string) => {
    const result = validationEngine.validateCommand(
      command,
      expectedCommand,
      expectedOutput,
      difficulty
    );

    setLastResult(result);

    if (result.isValid) {
      updateProgress(labId, taskId, result.performance!);
      onSuccess?.();
    }

    return result;
  }, [labId, taskId, expectedCommand, expectedOutput, difficulty, onSuccess, updateProgress]);

  const reset = useCallback(() => {
    validationEngine.reset();
    setLastResult(null);
  }, []);

  return {
    validateCommand,
    lastResult,
    reset
  };
}