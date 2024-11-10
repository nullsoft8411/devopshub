import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagInput({ tags, onTagsChange }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleAddTag = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    if (!tags.includes(trimmedInput)) {
      onTagsChange([...tags, trimmedInput]);
    }
    setInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Add tags..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          onClick={handleAddTag}
          disabled={!input.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 hover:text-blue-900"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}</content>