import React from 'react';
import { Book, Clock, Target, AlertCircle } from 'lucide-react';

interface DifficultyGuideProps {
  className?: string;
}

export function DifficultyGuide({ className = '' }: DifficultyGuideProps) {
  const difficultyLevels = [
    {
      level: 'Beginner',
      description: 'Perfect for those new to DevOps and cloud technologies',
      timeRange: '30-45 minutes',
      expectations: [
        'Basic command line knowledge',
        'Understanding of web technologies',
        'No prior DevOps experience needed'
      ]
    },
    {
      level: 'Intermediate',
      description: 'For users with some DevOps experience',
      timeRange: '45-90 minutes',
      expectations: [
        'Familiar with basic DevOps tools',
        'Understanding of containerization',
        'Basic scripting knowledge'
      ]
    },
    {
      level: 'Advanced',
      description: 'Challenging labs for experienced DevOps engineers',
      timeRange: '90+ minutes',
      expectations: [
        'Strong DevOps background',
        'Experience with multiple tools and platforms',
        'Advanced troubleshooting skills'
      ]
    }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Book className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Difficulty Guide</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {difficultyLevels.map((level) => (
          <div key={level.level} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{level.level}</h4>
                <p className="mt-1 text-sm text-gray-600">
                  {level.description}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {level.timeRange}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {level.expectations.map((expectation, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-sm text-gray-600"
                >
                  <Target className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{expectation}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-50">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Not sure which level to choose?</p>
            <p className="mt-1">
              Start with a beginner lab to familiarize yourself with our platform,
              or take our skill assessment to get a personalized recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}