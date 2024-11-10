import React from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { PathPrerequisite } from '@/types/learning-path';
import { Button } from '@/components/ui/Button';

interface PathPrerequisitesProps {
  prerequisites: PathPrerequisite[];
  onStart?: () => void;
}

export function PathPrerequisites({ prerequisites, onStart }: PathPrerequisitesProps) {
  const allCompleted = prerequisites.every(prereq => prereq.completed);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>

      <div className="space-y-4 mb-6">
        {prerequisites.map((prereq) => (
          <div
            key={prereq.id}
            className={`flex items-start p-4 rounded-lg ${
              prereq.completed ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            {prereq.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-gray-400 mt-0.5" />
            )}
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                prereq.completed ? 'text-green-800' : 'text-gray-800'
              }`}>
                {prereq.title}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {prereq.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full"
        disabled={!allCompleted}
        onClick={onStart}
      >
        {allCompleted ? (
          <>
            Start Learning Path
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          'Complete Prerequisites to Start'
        )}
      </Button>
    </div>
  );
}