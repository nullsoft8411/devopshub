import React from 'react';
import { BookOpen, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'documentation' | 'guide' | 'reference';
}

interface HelpResourcesProps {
  resources: Resource[];
  className?: string;
}

export function HelpResources({ resources, className = '' }: HelpResourcesProps) {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'documentation':
        return BookOpen;
      case 'guide':
      case 'reference':
        return LinkIcon;
    }
  };

  const getTypeStyles = (type: Resource['type']) => {
    switch (type) {
      case 'documentation':
        return 'bg-blue-50 text-blue-700';
      case 'guide':
        return 'bg-green-50 text-green-700';
      case 'reference':
        return 'bg-purple-50 text-purple-700';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">Helpful Resources</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {resources.map((resource) => {
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
                  <p className="mt-1 text-sm text-gray-500">
                    {resource.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-blue-600 hover:text-blue-700"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    Learn More
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {resources.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No resources available for this task
        </div>
      )}
    </div>
  );
}