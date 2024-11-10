import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  xpReward: number;
}

interface DailyGoalsProps {
  goals: Goal[];
  onComplete?: (goalId: string) => void;
  className?: string;
}

export function DailyGoals({ goals, onComplete, className = '' }: DailyGoalsProps) {
  const completedCount = goals.filter(goal => goal.completed).length;
  const progress = (completedCount / goals.length) * 100;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Daily Goals</h3>
        <span className="text-sm text-gray-600">
          {completedCount}/{goals.length} completed
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-start space-x-4 p-3 rounded-lg ${
              goal.completed ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <button
              onClick={() => onComplete?.(goal.id)}
              className={`mt-0.5 ${
                goal.completed ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {goal.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1">
              <h4 className={`font-medium ${
                goal.completed ? 'text-green-900' : 'text-gray-900'
              }`}>
                {goal.title}
              </h4>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </div>
            <div className="flex items-center text-yellow-600 text-sm">
              <Star className="h-4 w-4 mr-1 fill-current" />
              {goal.xpReward} XP
            </div>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-center text-green-800 font-medium">
            🎉 All daily goals completed! Come back tomorrow for new challenges.
          </p>
        </div>
      )}
    </div>
  );
}