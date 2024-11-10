import React from 'react';
import { Award, Clock, Target, Brain, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { SkillRadar } from './SkillRadar';
import { PerformanceMetrics } from './PerformanceMetrics';
import { useLabAssessment } from '@/hooks/useLabAssessment';

interface AssessmentReportProps {
  labId: string;
  userId: string;
  onClose: () => void;
  className?: string;
}

export function AssessmentReport({
  labId,
  userId,
  onClose,
  className = ''
}: AssessmentReportProps) {
  const {
    assessment,
    isLoading,
    error
  } = useLabAssessment(labId, userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">{error || 'Failed to load assessment'}</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance Assessment</h3>
          <div className="flex items-center space-x-2">
            <Award className={`h-5 w-5 ${
              assessment.score >= 90 ? 'text-yellow-500' :
              assessment.score >= 75 ? 'text-blue-500' :
              'text-gray-500'
            }`} />
            <span className="text-2xl font-bold text-gray-900">
              {assessment.score}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Completion Time</p>
              <p className="font-medium text-gray-900">{assessment.completionTime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Target className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Accuracy</p>
              <p className="font-medium text-gray-900">{assessment.accuracy}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Brain className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Efficiency</p>
              <p className="font-medium text-gray-900">{assessment.efficiency}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Skill Assessment</h4>
          <SkillRadar skills={assessment.skills} className="h-64" />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Performance Metrics</h4>
          <PerformanceMetrics metrics={assessment.metrics} />
        </div>
      </div>

      <div className="p-6 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Recommendations</h4>
        <div className="space-y-3">
          {assessment.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
            >
              <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">{recommendation.title}</p>
                <p className="text-sm text-blue-800">{recommendation.description}</p>
                {recommendation.resourceUrl && (
                  <a
                    href={recommendation.resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 mt-1 inline-block"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-b-lg">
        <Button onClick={onClose} className="w-full">
          Close Report
        </Button>
      </div>
    </div>
  );
}