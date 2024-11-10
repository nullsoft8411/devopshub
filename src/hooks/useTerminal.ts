import { useState, useCallback } from 'react';

interface TerminalEntry {
  command: string;
  output: string;
  timestamp: Date;
}

export function useTerminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const executeCommand = useCallback(async (command: string, output: string) => {
    setIsProcessing(true);
    
    try {
      setHistory(prev => [...prev, {
        command,
        output,
        timestamp: new Date()
      }]);
      setCurrentCommand('');
      setHistoryIndex(-1);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (history.length === 0) return;

    if (direction === 'up') {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(history[history.length - 1 - newIndex].command);
      }
    } else {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(history[history.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  }, [history, historyIndex]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  return {
    history,
    currentCommand,
    isProcessing,
    setCurrentCommand,
    executeCommand,
    navigateHistory,
    clearHistory
  };
}