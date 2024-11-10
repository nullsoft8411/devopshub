import React, { useState } from 'react';
import { Lightbulb, ChevronRight, Eye, EyeOff, AlertCircle, Star } from 'lucide-react';
import { Button } from '../ui/Button';

interface Hint {
  id: number;
  type: 'basic' | 'detailed' | 'solution';
  content: string;
  cost: number;
}

interface TaskHintsProps {
  hints: Hint[];
  availablePoints: number;
  onUsePoints: (points: number) => void;
  taskCompleted?: boolean;
  className?: string;
}

export function TaskHints({
  hints,
  availablePoints,
  onUsePoints,
  taskCompleted = false,
  className = ''
}: TaskHintsProps) {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const handleRevealHint = (hint: Hint) => {
    if (revealedHints.includes(hint.id)) return;
    if (availablePoints < hint.cost) return;

    onUsePoints(hint.cost);
    setRevealedHints(prev => [...prev, hint.id]);
  };

  const getHintTypeColor = (type: Hint['type']) => {
    switch (type) {
      case 'basic':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'detailed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'solution':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Available Hints</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">
              {availablePoints} points
            </span>
          </div>
        </div>
      </div>

      {taskCompleted ? (
        <div className="p-4 bg-green-50 flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-green-500" />
          <p className="text-sm text-green-700">
            Great job! You've completed this task without using all the hints.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {hints.map((hint) => (
            <div key={hint.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getHintTypeColor(hint.type)
                  }`}>
                    {hint.type.charAt(0).toUpperCase() + hint.type.slice(1)} Hint
                  </span>
                  <span className="text-sm text-gray-500">
                    Cost: {hint.cost} points
                  </span>
                </div>
                {hint.type === 'solution' && (
                  <div className="text-xs text-yellow-600">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    Using this will reduce XP earned
                  </div>
                )}
              </div>

              {revealedHints.includes(hint.id) ? (
                <div className="mt-2 text-gray-800 bg-gray-50 rounded-lg p-3">
                  {hint.content}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevealHint(hint)}
                  disabled={availablePoints < hint.cost}
                  className="w-full mt-2"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Reveal Hint
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
              )}

              {!revealedHints.includes(hint.id) && availablePoints < hint.cost && (
                <p className="text-xs text-red-600 mt-2">
                  Not enough points to reveal this hint
                </p>
              )}
            </div>
          ))}

          {hints.some(h => h.type === 'solution') && (
            <div className="p-4 bg-gray-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                className="w-full"
              >
                {showSolution ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Solution
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Solution
                  </>
                )}
              </Button>
              {showSolution && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 mb-2">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    Using the solution will reduce the XP earned for this task
                  </p>
                  {hints.find(h => h.type === 'solution')?.content}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}