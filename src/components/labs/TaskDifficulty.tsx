import React from 'react';
import { Brain, TrendingUp, AlertCircle, HelpCircle, Target } from 'lucide-react';
import { Button } from '../ui/Button';

interface TaskDifficultyProps {
  complexity: number; // 0-100
  attempts: number;
  timeSpent: number;
  expectedTime: number;
  performanceScore: number;
  onRequestHelp: () => void;
  className?: string;
}

export function TaskDifficulty({
  complexity,
  attempts,
  timeSpent,
  expectedTime,
  performanceScore,
  onRequestHelp,
  className = ''
}: TaskDifficultyProps) {
  const getDifficultyLevel = () => {
    if (complexity < 30) return { label: 'Basic', color: 'text-green-600' };
    if (complexity < 60) return { label: 'Intermediate', color: 'text-blue-600' };
    return { label: 'Advanced', color: 'text-purple-600' };
  };

  const getPerformanceStatus = () => {
    if (performanceScore >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (performanceScore >= 60) return { label: 'Good', color: 'text-blue-600' };
    return { label: 'Needs Improvement', color: 'text-yellow-600' };
  };

  const isStruggling = attempts > 3 || timeSpent > expectedTime * 1.5;
  const difficultyInfo = getDifficultyLevel();
  const performanceInfo = getPerformanceStatus();

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-gray-900">Task Complexity Analysis</h3>
        </div>
        <span className={`text-sm font-medium ${difficultyInfo.color}`}>
          {difficultyInfo.label}
        </span>
      </div>

      <div className="space-y-4">
        {/* Complexity Meter */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Complexity Level</span>
            <span className="font-medium text-gray-900">{complexity}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                complexity < 30 ? 'bg-green-500' :
                complexity < 60 ? 'bg-blue-500' :
                'bg-purple-500'
              }`}
              style={{ width: `${complexity}%` }}
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Attempts</span>
              <span className={`text-sm font-medium ${
                attempts > 3 ? 'text-yellow-600' : 'text-gray-900'
              }`}>
                {attempts}
              </span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Time</span>
              <span className={`text-sm font-medium ${
                timeSpent > expectedTime ? 'text-yellow-600' : 'text-gray-900'
              }`}>
                {Math.round((timeSpent / expectedTime) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Performance</span>
          </div>
          <span className={`text-sm font-medium ${performanceInfo.color}`}>
            {performanceInfo.label}
          </span>
        </div>

        {/* Adaptive Assistance */}
        {isStruggling && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Need some guidance?
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  It looks like this task might be challenging. Would you like some additional help?
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRequestHelp}
                  className="mt-3"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Get Assistance
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Skill Level Recommendation */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Recommended Skill Level</span>
          </div>
          <span className="font-medium">
            {complexity < 30 ? 'Beginner' : 
             complexity < 60 ? 'Intermediate' : 
             'Advanced'}
          </span>
        </div>
      </div>
    </div>
  );
}