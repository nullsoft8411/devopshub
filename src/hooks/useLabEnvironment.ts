import { useState, useCallback } from 'react';
import { LabEnvironment, EnvironmentState } from '@/lib/lab/LabEnvironment';
import { useLabValidation } from './useLabValidation';

export function useLabEnvironment() {
  const [environment] = useState(() => new LabEnvironment());
  const [state, setState] = useState<EnvironmentState>(environment.getState());
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCommand = useCallback(async (command: string) => {
    setIsExecuting(true);
    setError(null);

    try {
      const result = await environment.executeCommand(command);
      setState(result.state);
      return result;
    } catch (err) {
      setError('Failed to execute command');
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, [environment]);

  const resetEnvironment = useCallback(() => {
    environment.reset();
    setState(environment.getState());
  }, [environment]);

  return {
    state,
    isExecuting,
    error,
    executeCommand,
    resetEnvironment,
    getHistory: () => environment.getHistory(),
    getSessionDuration: () => environment.getSessionDuration()
  };
}