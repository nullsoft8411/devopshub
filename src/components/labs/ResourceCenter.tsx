import React, { useState } from 'react';
import { Search, Book, Code, Link as LinkIcon, ExternalLink, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useResources } from '@/hooks/useResources';

interface ResourceCenterProps {
  labId: string;
  currentTask?: number;
  className?: string;
}

export function ResourceCenter({ labId, currentTask, className = '' }: ResourceCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const { resources, isLoading } = useResources(labId, currentTask);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'documentation':
        return Book;
      case 'snippet':
        return Code;
      case 'reference':
        return LinkIcon;
      default:
        return Book;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'documentation':
        return 'bg-blue-50 text-blue-700';
      case 'snippet':
        return 'bg-green-50 text-green-700';
      case 'reference':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex space-x-2">
            {['all', 'documentation', 'snippet', 'reference'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto" />
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {filteredResources.map((resource) => {
            const Icon = getIcon(resource.type);
            return (
              <div
                key={resource.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeStyles(resource.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {resource.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {resource.description}
                    </p>
                    {resource.tags && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        Learn More
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredResources.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No resources found matching your criteria
            </div>
          )}
        </div>
      )}
    </div>
  );
}