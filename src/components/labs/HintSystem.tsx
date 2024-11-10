import React, { useState } from 'react';
import { Lightbulb, HelpCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface HintLevel {
  id: number;
  type: 'basic' | 'detailed' | 'solution';
  content: string;
  cost: number;
}

interface HintSystemProps {
  hints: HintLevel[];
  availablePoints: number;
  onUsePoints: (points: number) => void;
  className?: string;
}

export function HintSystem({
  hints,
  availablePoints,
  onUsePoints,
  className = ''
}: HintSystemProps) {
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);
  const [showSolutionWarning, setShowSolutionWarning] = useState(false);

  const handleUnlockHint = (hint: HintLevel) => {
    if (unlockedHints.includes(hint.id)) return;
    if (availablePoints < hint.cost) return;

    if (hint.type === 'solution' && !showSolutionWarning) {
      setShowSolutionWarning(true);
      return;
    }

    onUsePoints(hint.cost);
    setUnlockedHints(prev => [...prev, hint.id]);
    setShowSolutionWarning(false);
  };

  const getHintTypeStyles = (type: HintLevel['type']) => {
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
            <h3 className="font-medium text-gray-900">Need Help?</h3>
          </div>
          <div className="text-sm text-gray-600">
            {availablePoints} points available
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {hints.map((hint) => (
          <div
            key={hint.id}
            className={`border rounded-lg ${
              unlockedHints.includes(hint.id)
                ? 'border-gray-200'
                : 'border-dashed border-gray-300'
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getHintTypeStyles(hint.type)
                }`}>
                  {hint.type.charAt(0).toUpperCase() + hint.type.slice(1)} Hint
                </span>
                <span className="text-sm text-gray-500">
                  Cost: {hint.cost} points
                </span>
              </div>

              {unlockedHints.includes(hint.id) ? (
                <div className="mt-2 text-gray-800 bg-gray-50 rounded-lg p-3">
                  {hint.content}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnlockHint(hint)}
                  disabled={availablePoints < hint.cost}
                  className="w-full mt-2"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Unlock Hint
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
              )}

              {!unlockedHints.includes(hint.id) && availablePoints < hint.cost && (
                <p className="text-xs text-red-600 mt-2">
                  Not enough points to unlock this hint
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showSolutionWarning && (
        <div className="p-4 bg-yellow-50 border-t border-yellow-100">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800 font-medium">
                Warning: Viewing the solution will reduce XP earned
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Are you sure you want to continue?
              </p>
              <div className="mt-3 flex space-x-3">
                <Button
                  size="sm"
                  onClick={() => {
                    const solutionHint = hints.find(h => h.type === 'solution');
                    if (solutionHint) handleUnlockHint(solutionHint);
                  }}
                >
                  View Solution
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSolutionWarning(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}