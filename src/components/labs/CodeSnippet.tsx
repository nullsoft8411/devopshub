import React, { useState } from 'react';
import { Copy, Check, Code, Pencil } from 'lucide-react';
import { Button } from '../ui/Button';

interface CodeSnippetProps {
  snippet: {
    id: string;
    code: string;
    language: string;
    description: string;
  };
  onUpdate: (snippet: {
    id: string;
    code: string;
    language: string;
    description: string;
  }) => void;
}

export function CodeSnippet({ snippet, onUpdate }: CodeSnippetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(snippet.description);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdate = () => {
    onUpdate({
      ...snippet,
      description
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-gray-500" />
          {isEditing ? (
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-2 py-1 border rounded"
              autoFocus
            />
          ) : (
            <span className="text-sm text-gray-700">{description}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
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
        </div>
      </div>

      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code>{snippet.code}</code>
      </pre>

      {isEditing && (
        <div className="mt-2 flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleUpdate}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}</content>