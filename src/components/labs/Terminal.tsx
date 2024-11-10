import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, AlertCircle, RefreshCw, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { CommandSuggestions } from './CommandSuggestions';
import { ProgressIndicator } from './ProgressIndicator';
import { ValidationFeedback } from './ValidationFeedback';
import { useTerminal } from '@/hooks/useTerminal';
import { TaskValidationResult } from '@/lib/validation/taskValidator';

interface TerminalProps {
  onCommand: (command: string) => TaskValidationResult;
  readOnly?: boolean;
  initialCommand?: string;
  showHints?: boolean;
  className?: string;
}

export function Terminal({
  onCommand,
  readOnly = false,
  initialCommand = '',
  showHints = true,
  className = ''
}: TerminalProps) {
  const {
    history,
    currentCommand,
    isProcessing,
    setCurrentCommand,
    executeCommand,
    navigateHistory,
    clearHistory
  } = useTerminal();

  const [validationResult, setValidationResult] = useState<TaskValidationResult | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async () => {
    if (!currentCommand.trim() || isProcessing) return;

    const result = onCommand(currentCommand);
    setValidationResult(result);
    await executeCommand(currentCommand, result.output);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleCommand();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(e.key === 'ArrowUp' ? 'up' : 'down');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearHistory();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (validationResult?.similarCommands?.length === 1) {
        setCurrentCommand(validationResult.similarCommands[0]);
      }
    }
  };

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Terminal</span>
        </div>
        <div className="flex items-center space-x-2">
          {showHints && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => {
                executeCommand('help', 'Available commands:\n- help: Show this help message\n- clear: Clear terminal\n- ctrl+l: Clear terminal');
              }}
            >
              <AlertCircle className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={clearHistory}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto font-mono text-sm text-gray-300 space-y-2"
        >
          {history.map((entry, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">$</span>
                <span>{entry.command}</span>
              </div>
              {entry.output && (
                <div className="ml-4 whitespace-pre-wrap">{entry.output}</div>
              )}
            </div>
          ))}
        </div>

        {validationResult && (
          <ValidationFeedback result={validationResult} />
        )}

        {validationResult?.similarCommands && (
          <CommandSuggestions
            suggestions={validationResult.similarCommands}
            onSelectSuggestion={setCurrentCommand}
          />
        )}

        {validationResult && (
          <ProgressIndicator
            progress={validationResult.progress}
            timeSpent={validationResult.timeSpent}
            attempts={history.length}
            showWarning={true}
          />
        )}
      </div>

      {!readOnly && (
        <div className="flex items-center space-x-2 p-4 bg-gray-800">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-gray-300"
            placeholder="Type a command..."
            disabled={isProcessing}
            autoFocus
          />
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={handleCommand}
            disabled={!currentCommand.trim() || isProcessing}
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}