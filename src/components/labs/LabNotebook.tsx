import React, { useState } from 'react';
import { Book, Code, Plus, Search, Tag, Clock, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useLabNotebook } from '@/hooks/useLabNotebook';
import { NotebookEntry } from './NotebookEntry';
import { CodeSnippet } from './CodeSnippet';
import { TagSelector } from './TagSelector';

interface LabNotebookProps {
  labId: string;
  taskId?: number;
  className?: string;
}

export function LabNotebook({ labId, taskId, className = '' }: LabNotebookProps) {
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {
    entries,
    isLoading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    addCodeSnippet
  } = useLabNotebook(labId);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.every(tag => entry.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Lab Notebook</h3>
          </div>
          <Button
            size="sm"
            onClick={() => setIsAddingEntry(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <TagSelector
            selectedTags={selectedTags}
            onTagSelect={setSelectedTags}
          />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {isAddingEntry && (
          <div className="p-4">
            <NotebookEntry
              onSave={async (entry) => {
                await addEntry(entry);
                setIsAddingEntry(false);
              }}
              onCancel={() => setIsAddingEntry(false)}
            />
          </div>
        )}

        {filteredEntries.map((entry) => (
          <div key={entry.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{entry.title}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(entry.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                {entry.content}
              </div>

              {entry.codeSnippets?.map((snippet) => (
                <CodeSnippet
                  key={snippet.id}
                  snippet={snippet}
                  onUpdate={(updatedSnippet) =>
                    updateEntry({
                      ...entry,
                      codeSnippets: entry.codeSnippets?.map(s =>
                        s.id === snippet.id ? updatedSnippet : s
                      )
                    })
                  }
                />
              ))}

              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteEntry(entry.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const code = window.getSelection()?.toString();
                    if (code) {
                      addCodeSnippet(entry.id, {
                        code,
                        language: 'bash',
                        description: 'Selected code'
                      });
                    }
                  }}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Add Code
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredEntries.length === 0 && !isLoading && (
          <div className="p-8 text-center text-gray-500">
            No notes found. Start by adding a new note!
          </div>
        )}
      </div>
    </div>
  );
}</content>