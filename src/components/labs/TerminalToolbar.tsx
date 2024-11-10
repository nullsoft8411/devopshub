import React from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface TerminalToolbarProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onClose?: () => void;
  title?: string;
}

export function TerminalToolbar({
  isFullscreen,
  onToggleFullscreen,
  onClose,
  title = 'Terminal'
}: TerminalToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <TerminalIcon className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-400">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}