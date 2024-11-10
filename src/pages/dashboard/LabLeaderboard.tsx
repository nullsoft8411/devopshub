import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Leaderboard } from '@/components/labs/Leaderboard';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export default function LabLeaderboard() {
  const { labId } = useParams<{ labId: string }>();
  const [timeFrame, setTimeFrame] = useState<'all' | 'weekly' | 'monthly'>('all');
  
  const { entries, isLoading, error, refreshLeaderboard } = useLeaderboard({
    labId: labId!,
    timeFrame
  });

  if (!labId) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No lab selected</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Lab Leaderboard</h2>
        <Leaderboard
          entries={entries}
          timeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
        />
      </div>
    </div>
  );
}