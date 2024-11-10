import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { LabValidation } from './LabValidation';
import { useLabValidation } from '@/hooks/useLabValidation';
import { Lab } from '@/types/lab';

interface LabTerminalProps {
  lab: Lab;
  onTaskComplete?: (taskId: number) => void;
  onLabComplete?: () => void;
  className?: string;
}

export function LabTerminal({
  lab,
  onTaskComplete,
  onLabComplete,
  className = ''
}: LabTerminalProps) {
  const {
    currentTask,
    lastValidation,
    validateCommand
  } = useLabValidation({
    lab,
    onTaskComplete,
    onLabComplete
  });

  const handleCommand = (command: string) => {
    validateCommand(command);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Terminal
        onCommand={handleCommand}
        initialCommand={currentTask.command}
        showHints={true}
      />
      {lastValidation && (
        <LabValidation result={lastValidation} />
      )}
      {currentTask.hint && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Hint:</span> {currentTask.hint}
          </p>
        </div>
      )}
    </div>
  );
}