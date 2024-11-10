import React from 'react';
import { Book } from 'lucide-react';

export function TaskGuideSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm animate-pulse">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Book className="h-5 w-5 text-gray-300" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
        <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded" />
      </div>

      <div className="divide-y divide-gray-100">
        {[1, 2, 3].map((index) => (
          <div key={index} className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}