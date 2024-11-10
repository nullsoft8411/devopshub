import React from 'react';
import { Clock, Brain, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface DifficultyLevel {
  id: string;
  name: string;
  description: string;
  timeCommitment: string;
  prerequisites: string[];
  recommendedFor: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface DifficultySelectorProps {
  levels: DifficultyLevel[];
  selectedLevel?: string;
  onSelect: (levelId: string) => void;
  userSkillLevel?: string;
  className?: string;
}

export function DifficultySelector({
  levels,
  selectedLevel,
  onSelect,
  userSkillLevel,
  className = ''
}: DifficultySelectorProps) {
  const getDifficultyColor = (level: DifficultyLevel['skillLevel']) => {
    switch (level) {
      case 'beginner':
        return 'border-green-200 hover:border-green-300 bg-green-50';
      case 'intermediate':
        return 'border-blue-200 hover:border-blue-300 bg-blue-50';
      case 'advanced':
        return 'border-purple-200 hover:border-purple-300 bg-purple-50';
    }
  };

  const getSkillLevelMatch = (level: DifficultyLevel) => {
    if (!userSkillLevel) return null;
    
    const skillLevels = ['beginner', 'intermediate', 'advanced'];
    const userIndex = skillLevels.indexOf(userSkillLevel as DifficultyLevel['skillLevel']);
    const levelIndex = skillLevels.indexOf(level.skillLevel);
    
    if (userIndex === levelIndex) return 'perfect';
    if (Math.abs(userIndex - levelIndex) === 1) return 'moderate';
    return 'challenging';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {levels.map((level) => {
        const isSelected = selectedLevel === level.id;
        const match = getSkillLevelMatch(level);

        return (
          <div
            key={level.id}
            className={`relative rounded-lg border-2 p-6 transition-all cursor-pointer ${
              isSelected
                ? `ring-2 ring-blue-500 ${getDifficultyColor(level.skillLevel)}`
                : `${getDifficultyColor(level.skillLevel)}`
            }`}
            onClick={() => onSelect(level.id)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {level.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {level.description}
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {level.timeCommitment}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Brain className="h-4 w-4 mr-1" />
                    {level.skillLevel.charAt(0).toUpperCase() + level.skillLevel.slice(1)}
                  </div>
                </div>

                {level.prerequisites.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Prerequisites:</p>
                    <div className="flex flex-wrap gap-2">
                      {level.prerequisites.map((prereq) => (
                        <span
                          key={prereq}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {match && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  match === 'perfect'
                    ? 'bg-green-100 text-green-800'
                    : match === 'moderate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {match === 'perfect' ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Perfect Match
                    </div>
                  ) : match === 'moderate' ? (
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Good Match
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Challenging
                    </div>
                  )}
                </div>
              )}
            </div>

            {level.recommendedFor.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Recommended for: {level.recommendedFor.join(', ')}
                </p>
              </div>
            )}

            {isSelected && (
              <div className="mt-4">
                <Button className="w-full">
                  Start with {level.name}
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}