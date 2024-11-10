import React, { useState, useEffect } from 'react';
import { Terminal } from './Terminal';
import { useCollaboration } from '@/hooks/useCollaboration';

interface SharedTerminalProps {
  labId: string;
  sessionId: string;
  className?: string;
}

export function SharedTerminal({
  labId,
  sessionId,
  className = ''
}: SharedTerminalProps) {
  const { collaborationManager } = useCollaboration(labId, sessionId);
  const [sharedOutput, setSharedOutput] = useState<string[]>([]);

  useEffect(() => {
    if (!collaborationManager) return;

    const handleTerminalUpdate = (output: string[]) => {
      setSharedOutput(output);
    };

    collaborationManager.socket.on('terminal_update', handleTerminalUpdate);

    return () => {
      collaborationManager.socket.off('terminal_update', handleTerminalUpdate);
    };
  }, [collaborationManager]);

  const handleCommand = (command: string) => {
    if (!collaborationManager) return;
    collaborationManager.executeCommand(command);
  };

  return (
    <Terminal
      output={sharedOutput}
      onCommand={handleCommand}
      className={className}
      isShared
    />
  );
}