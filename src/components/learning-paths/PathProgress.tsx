import React from 'react';
import { Trophy, Clock, BookOpen, Award } from 'lucide-react';
import { PathProgress as IPathProgress } from '@/types/learning-path';

interface PathProgressProps {
  progress: IPathProgress;
  totalCourses: number;
  totalMilestones: number;
}

export function PathProgress({ progress, totalCourses, totalMilestones }: PathProgressProps) {
  const courseProgress = Math.round((progress.completedCourses.length / totalCourses) * 100);
  const milestoneProgress = Math.round((progress.completedMilestones.length / totalMilestones) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Course Progress</span>
            </div>
            <span className="text-sm font-medium text-blue-600">
              {progress.completedCourses.length}/{totalCourses} courses
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${courseProgress}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm text-gray-600">
              <Trophy className="h-4 w-4 mr-2" />
              <span>Milestones</span>
            </div>
            <span className="text-sm font-medium text-blue-600">
              {progress.completedMilestones.length}/{totalMilestones} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${milestoneProgress}%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <div>
                <p className="font-medium text-gray-900">Time Invested</p>
                <p>{getDuration(progress.startedAt)}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Award className="h-4 w-4 mr-2" />
              <div>
                <p className="font-medium text-gray-900">XP Earned</p>
                <p>{progress.xpEarned} XP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDuration(startDate: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(startDate).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Started today';
  if (days === 1) return '1 day';
  return `${days} days`;
}