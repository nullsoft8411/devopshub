import React from 'react';
import { Trophy, Clock, BookOpen } from 'lucide-react';

interface CourseProgressProps {
  completedLessons: number;
  totalLessons: number;
  duration: string;
  certificateAvailable?: boolean;
}

export function CourseProgress({
  completedLessons,
  totalLessons,
  duration,
  certificateAvailable = true,
}: CourseProgressProps) {
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
        <span className="text-sm font-medium text-blue-600">
          {completedLessons}/{totalLessons} lessons
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span>Estimated time: {duration}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
          <span>{totalLessons} lessons</span>
        </div>

        {certificateAvailable && (
          <div className="flex items-center text-sm text-gray-600">
            <Trophy className="h-4 w-4 mr-2 text-gray-400" />
            <span>Certificate upon completion</span>
          </div>
        )}
      </div>
    </div>
  );
}