import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TagInput } from './TagInput';

interface NotebookEntryProps {
  initialData?: {
    title: string;
    content: string;
    tags: string[];
  };
  onSave: (entry: { title: string; content: string; tags: string[] }) => Promise<void>;
  onCancel: () => void;
}

export function NotebookEntry({
  initialData,
  onSave,
  onCancel
}: NotebookEntryProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsSubmitting(true);
    try {
      await onSave({ title, content, tags });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-medium"
        />
      </div>

      <div>
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <TagInput
        tags={tags}
        onTagsChange={setTags}
      />

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!title || !content || isSubmitting}
        >
          Save Note
        </Button>
      </div>
    </form>
  );
}</content>