import React from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';

interface CommandExample {
  command: string;
  description: string;
}

interface CommandHelpProps {
  command: string;
  description: string;
  examples: CommandExample[];
}

export function CommandHelp({ command, description, examples }: CommandHelpProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-gray-300">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-blue-400" />
        <h3 className="font-medium">Command Help</h3>
      </div>

      <div className="space-y-4">
        <div>
          <code className="text-blue-400">{command}</code>
          <p className="mt-1 text-sm">{description}</p>
        </div>

        {examples.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Examples:</h4>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <code className="text-green-400">{example.command}</code>
                    <p className="text-sm text-gray-400">{example.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}