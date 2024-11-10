import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface ResourceViewerProps {
  resource: {
    title: string;
    content: string;
    type: string;
  };
  onClose: () => void;
  className?: string;
}

export function ResourceViewer({ resource, onClose, className = '' }: ResourceViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(resource.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">{resource.title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {resource.type === 'snippet' ? (
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{resource.content}</code>
          </pre>
        ) : (
          <div className="prose max-w-none">
            {resource.content}
          </div>
        )}
      </div>
    </div>
  );
}