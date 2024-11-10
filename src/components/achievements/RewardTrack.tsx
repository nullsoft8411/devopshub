import React from 'react';
import { Star, Gift, Lock } from 'lucide-react';
import { Button } from '../ui/Button';

interface Reward {
  id: string;
  title: string;
  description: string;
  xpRequired: number;
  icon: string;
  claimed: boolean;
}

interface RewardTrackProps {
  rewards: Reward[];
  currentXp: number;
  onClaimReward: (rewardId: string) => void;
  className?: string;
}

export function RewardTrack({
  rewards,
  currentXp,
  onClaimReward,
  className = ''
}: RewardTrackProps) {
  const sortedRewards = [...rewards].sort((a, b) => a.xpRequired - b.xpRequired);
  const nextReward = sortedRewards.find(r => !r.claimed);

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Rewards Track</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-5 w-5 mr-1 fill-current" />
            <span className="font-medium">{currentXp} XP</span>
          </div>
        </div>

        {nextReward && (
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              Next reward at {nextReward.xpRequired} XP ({nextReward.xpRequired - currentXp} XP remaining)
            </p>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all"
                style={{ width: `${(currentXp / nextReward.xpRequired) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="divide-y divide-gray-100">
        {sortedRewards.map((reward) => {
          const isAvailable = currentXp >= reward.xpRequired && !reward.claimed;
          
          return (
            <div
              key={reward.id}
              className={`p-6 ${
                reward.claimed ? 'bg-gray-50' : isAvailable ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    reward.claimed
                      ? 'bg-gray-100'
                      : isAvailable
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}>
                    <Gift className={`h-5 w-5 ${
                      reward.claimed
                        ? 'text-gray-500'
                        : isAvailable
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{reward.title}</h4>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Required: {reward.xpRequired} XP
                    </p>
                  </div>
                </div>
                {reward.claimed ? (
                  <span className="text-sm text-gray-500">Claimed</span>
                ) : isAvailable ? (
                  <Button
                    size="sm"
                    onClick={() => onClaimReward(reward.id)}
                  >
                    Claim Reward
                  </Button>
                ) : (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}