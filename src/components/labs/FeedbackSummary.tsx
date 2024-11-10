import React from 'react';
import { Star, Users, Brain, ThumbsUp } from 'lucide-react';

interface FeedbackSummaryProps {
  averageRating: number;
  totalRatings: number;
  difficultyDistribution: {
    too_easy: number;
    just_right: number;
    too_hard: number;
  };
  helpfulPercentage: number;
  className?: string;
}

export function FeedbackSummary({
  averageRating,
  totalRatings,
  difficultyDistribution,
  helpfulPercentage,
  className = ''
}: FeedbackSummaryProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Lab Statistics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Star className="h-5 w-5 text-yellow-600 fill-current" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Ratings</p>
            <p className="text-2xl font-bold text-gray-900">{totalRatings}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Brain className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Just Right</p>
            <p className="text-2xl font-bold text-gray-900">{difficultyDistribution.just_right}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <ThumbsUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Found Helpful</p>
            <p className="text-2xl font-bold text-gray-900">{helpfulPercentage}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Rating Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Rating Distribution</h4>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-500 text-right">
                  {Math.round((rating / 5) * totalRatings)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Difficulty Distribution</h4>
          <div className="space-y-4">
            {Object.entries(difficultyDistribution).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className="w-24 text-sm text-gray-600">
                  {key.replace('_', ' ')}
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-500 text-right">
                  {value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}