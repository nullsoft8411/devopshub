import React from 'react';
import { Download, FileText, Video, File } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Resource {
  title: string;
  type: string;
  size: string;
}

interface ResourceListProps {
  resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return FileText;
      case 'video':
        return Video;
      default:
        return File;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Resources</h3>
      <div className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = getIcon(resource.type);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                  <p className="text-xs text-gray-500">
                    {resource.type} • {resource.size}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}