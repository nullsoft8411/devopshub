import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '../ui/Button';

interface CheckpointModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  currentTask: number;
  progress: number;
}

export function CheckpointModal({
  onConfirm,
  onCancel,
  currentTask,
  progress
}: CheckpointModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Save Checkpoint
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600">
              You're about to save a checkpoint at:
            </p>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>• Task {currentTask}</li>
              <li>• Progress: {progress}%</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              You can restore your progress from this point later.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={onConfirm}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Checkpoint
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}