import React from 'react';
import { Command } from '@/types/lab';
import { Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface QuickReferenceProps {
  commands: Command[];
  onCopy: (command: string) => void;
  className?: string;
}

export function QuickReference({ commands, onCopy, className = '' }: QuickReferenceProps) {
  const [copiedCommand, setCopiedCommand] = React.useState<string | null>(null);

  const handleCopy = (command: string) => {
    onCopy(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">Quick Reference</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {commands.map((command) => (
          <div
            key={command.command}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {command.command}
                </code>
                <p className="mt-1 text-sm text-gray-600">
                  {command.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(command.command)}
              >
                {copiedCommand === command.command ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}