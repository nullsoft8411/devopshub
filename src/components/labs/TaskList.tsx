import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  command: string;
  hint?: string;
}

interface TaskListProps {
  tasks: Task[];
  activeTaskIndex: number;
  onTaskSelect: (index: number) => void;
}

export function TaskList({ tasks, activeTaskIndex, onTaskSelect }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <button
          key={task.id}
          onClick={() => onTaskSelect(index)}
          className={`w-full text-left flex items-center p-4 rounded-lg transition-colors ${
            activeTaskIndex === index 
              ? 'bg-blue-50 border-2 border-blue-200' 
              : 'hover:bg-gray-50 border-2 border-transparent'
          } ${task.completed ? 'opacity-75' : ''}`}
          disabled={index !== activeTaskIndex && !task.completed}
        >
          <div className="mr-4">
            {task.completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <div className={`w-6 h-6 rounded-full border-2 ${
                activeTaskIndex === index ? 'border-blue-500' : 'border-gray-300'
              }`} />
            )}
          </div>
          <div>
            <h4 className={`font-medium ${
              activeTaskIndex === index ? 'text-blue-700' : 'text-gray-900'
            }`}>
              {task.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}