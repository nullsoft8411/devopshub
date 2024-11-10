import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Clock, Trophy, CheckCircle } from 'lucide-react';
import { LearningPath, PathProgress } from '@/types/learning-path';
import { Button } from '@/components/ui/Button';

interface PathCardProps {
  path: LearningPath;
  progress?: PathProgress;
  stats: {
    students: string;
    rating: number;
  };
}

export function PathCard({ path, progress, stats }: PathCardProps) {
  const navigate = useNavigate();
  const completedCourses = progress?.completedCourses.length || 0;
  const totalCourses = path.courses.length;
  const progressPercentage = Math.round((completedCourses / totalCourses) * 100);

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="aspect-video w-full relative">
        <img
          src={path.image}
          alt={path.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              {path.level}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              {path.category}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {path.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {path.description}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {path.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {stats.students} students
            </div>
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              {path.courses.length} courses
            </div>
          </div>
        </div>

        {progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                {completedCourses}/{totalCourses} courses completed
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <Button 
          onClick={() => navigate(`/paths/${path.id}`)}
          className="mt-6 w-full"
        >
          {progress ? 'Continue Path' : 'View Path'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}