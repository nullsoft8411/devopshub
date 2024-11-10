import React from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { PathMilestone } from '@/types/learning-path';

interface PathMilestonesProps {
  milestones: PathMilestone[];
}

export function PathMilestones({ milestones }: PathMilestonesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Path Milestones</h3>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`relative flex items-start p-4 rounded-lg ${
              milestone.completed
                ? 'bg-blue-50 border border-blue-100'
                : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              milestone.completed ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Trophy className={`w-5 h-5 ${
                milestone.completed ? 'text-blue-600' : 'text-gray-500'
              }`} />
            </div>

            <div className="ml-4 flex-1">
              <h4 className={`text-sm font-medium ${
                milestone.completed ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {milestone.title}
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                {milestone.description}
              </p>

              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center text-sm">
                  <Zap className={`w-4 h-4 mr-1 ${
                    milestone.completed ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className={milestone.completed ? 'text-blue-600' : 'text-gray-500'}>
                    {milestone.xpReward} XP
                  </span>
                </div>
              </div>
            </div>

            {milestone.completed && (
              <div className="absolute top-4 right-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}