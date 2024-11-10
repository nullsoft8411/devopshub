import React from 'react';
import { Tag } from 'lucide-react';

interface TagSelectorProps {
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
}

export function TagSelector({ selectedTags, onTagSelect }: TagSelectorProps) {
  const commonTags = [
    'command',
    'concept',
    'error',
    'solution',
    'tip',
    'important'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagSelect(selectedTags.filter(t => t !== tag));
    } else {
      onTagSelect([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {commonTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Tag className="h-3 w-3 mr-1" />
          {tag}
        </button>
      ))}
    </div>
  );
}</content>