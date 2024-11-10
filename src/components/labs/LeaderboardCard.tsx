import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface TopPerformer {
  name: string;
  xpEarned: number;
  completionTime: string;
}

interface LeaderboardCardProps {
  labId: string;
  topPerformers: TopPerformer[];
  onViewAll?: () => void;
  className?: string;
}

export function LeaderboardCard({
  labId,
  topPerformers,
  onViewAll,
  className = ''
}: LeaderboardCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Trophy className="h-5 w-5 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Top Performers</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {topPerformers.map((performer, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium text-yellow-500">
                #{index + 1}
              </span>
              <span className="font-medium text-gray-900">
                {performer.name}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {performer.xpEarned} XP • {performer.completionTime}
            </div>
          </div>
        ))}
      </div>

      {topPerformers.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No entries yet. Be the first to complete this lab!
        </div>
      )}
    </div>
  );
}