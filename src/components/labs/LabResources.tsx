import React, { useState } from 'react';
import { Book, Link as LinkIcon, FileText, Search, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'documentation' | 'cheatsheet' | 'guide';
  description: string;
  tags: string[];
}

interface LabResourcesProps {
  resources: Resource[];
  className?: string;
}

export function LabResources({ resources, className = '' }: LabResourcesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<Resource['type'] | 'all'>('all');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'documentation':
        return Book;
      case 'cheatsheet':
        return FileText;
      case 'guide':
        return LinkIcon;
    }
  };

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'documentation':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cheatsheet':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'guide':
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lab Resources</h3>
        
        <div className="space-y-4">
          {/* Search */}
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

          {/* Type Filter */}
          <div className="flex space-x-2">
            {['all', 'documentation', 'cheatsheet', 'guide'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type as Resource['type'] | 'all')}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredResources.map((resource) => {
          const Icon = getIcon(resource.type);
          return (
            <div
              key={resource.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {resource.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {resource.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="shrink-0 ml-4"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  {resource.tags.length > 0 && (
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

      <div className="p-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open('https://devopstraininghub.com/resources', '_blank')}
        >
          View All Resources
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}