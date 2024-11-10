import React from 'react';
import { Bookmark } from 'lucide-react';

interface CheckpointIndicatorProps {
  hasCheckpoint: boolean;
  taskId: number;
  className?: string;
}

export function CheckpointIndicator({
  hasCheckpoint,
  taskId,
  className = ''
}: CheckpointIndicatorProps) {
  if (!hasCheckpoint) return null;

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 ${className}`}
    >
      <Bookmark className="h-3 w-3 mr-1" />
      Checkpoint at Task {taskId}
    </div>
  );
}