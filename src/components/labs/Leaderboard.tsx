import React, { useState } from 'react';
import { Trophy, Clock, Target, Medal, Filter, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface LeaderboardEntry {
  id: string;
  rank: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  completionTime: string;
  accuracy: number;
  xpEarned: number;
  completedAt: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  timeFrame?: 'all' | 'weekly' | 'monthly';
  onTimeFrameChange?: (timeFrame: 'all' | 'weekly' | 'monthly') => void;
  className?: string;
}

export function Leaderboard({
  entries,
  timeFrame = 'all',
  onTimeFrameChange,
  className = ''
}: LeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
          <div className="flex items-center space-x-2">
            {['weekly', 'monthly', 'all'].map((frame) => (
              <Button
                key={frame}
                variant={timeFrame === frame ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onTimeFrameChange?.(frame as typeof timeFrame)}
              >
                {frame.charAt(0).toUpperCase() + frame.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-8 text-center ${getRankColor(entry.rank)}`}>
                  {getMedalIcon(entry.rank) || `#${entry.rank}`}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{entry.user.name}</p>
                  <p className="text-sm text-gray-500">
                    Completed {new Date(entry.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{entry.completionTime}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Target className="h-4 w-4 mr-1" />
                  <span className="text-sm">{entry.accuracy}%</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {entry.xpEarned} XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No entries found matching your search
        </div>
      )}
    </div>
  );
}