import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Lab } from '@/types/lab';

interface LabProgressProps {
  lab: Lab;
  completedTasks: number[];
  currentTaskIndex: number;
}

export function LabProgress({ lab, completedTasks, currentTaskIndex }: LabProgressProps) {
  const progress = Math.round((completedTasks.length / lab.tasks.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lab Progress</h3>
        <span className="text-sm font-medium text-blue-600">
          {completedTasks.length}/{lab.tasks.length} tasks
        </span>
      </div>

      <div className="relative h-2 bg-gray-100 rounded-full mb-4">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{completedTasks.length} completed</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>{lab.duration}</span>
        </div>
      </div>

      {progress === 100 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 font-medium">
            Congratulations! You've completed all tasks in this lab.
          </p>
        </div>
      )}
    </div>
  );
}