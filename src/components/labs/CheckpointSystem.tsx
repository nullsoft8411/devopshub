import React from 'react';
import { Bookmark, Clock, RotateCcw, Play, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface Checkpoint {
  id: string;
  taskId: number;
  timestamp: Date;
  environmentState: {
    containers: string[];
    networks: string[];
    volumes: string[];
    variables: Record<string, string>;
  };
  progress: number;
}

interface CheckpointSystemProps {
  checkpoints: Checkpoint[];
  currentTaskId: number;
  onCreateCheckpoint: () => void;
  onRestoreCheckpoint: (checkpoint: Checkpoint) => void;
  onDeleteCheckpoint: (checkpointId: string) => void;
  className?: string;
}

export function CheckpointSystem({
  checkpoints,
  currentTaskId,
  onCreateCheckpoint,
  onRestoreCheckpoint,
  onDeleteCheckpoint,
  className = ''
}: CheckpointSystemProps) {
  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Checkpoints</h3>
          </div>
          <Button
            size="sm"
            onClick={onCreateCheckpoint}
          >
            Save Checkpoint
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {checkpoints.map((checkpoint) => (
          <div
            key={checkpoint.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-gray-900">
                    Task {checkpoint.taskId}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTimestamp(checkpoint.timestamp)}
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{checkpoint.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${checkpoint.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRestoreCheckpoint(checkpoint)}
                  disabled={checkpoint.taskId === currentTaskId}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Restore
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteCheckpoint(checkpoint.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="mt-3 text-sm">
              <details className="text-gray-600">
                <summary className="cursor-pointer hover:text-gray-900">
                  Environment Details
                </summary>
                <div className="mt-2 space-y-2 pl-4">
                  <p>Containers: {checkpoint.environmentState.containers.length}</p>
                  <p>Networks: {checkpoint.environmentState.networks.length}</p>
                  <p>Volumes: {checkpoint.environmentState.volumes.length}</p>
                </div>
              </details>
            </div>
          </div>
        ))}

        {checkpoints.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No checkpoints saved yet
          </div>
        )}
      </div>
    </div>
  );
}