import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  progress?: number;
  image: string;
  stats: {
    students: string;
    rating: number;
  };
}

export function CourseCard({
  id,
  title,
  description,
  duration,
  level,
  category,
  progress = 0,
  image,
  stats,
}: CourseCardProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartCourse = () => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: `/courses/${id}/learn` } });
    } else {
      navigate(`/courses/${id}/learn`);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="aspect-video w-full relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              {level}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {stats.students}
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              {stats.rating.toFixed(1)}
            </div>
          </div>
        </div>

        {progress > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                {progress}% complete
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <Button 
          onClick={handleStartCourse}
          className="mt-6 w-full"
        >
          {isAuthenticated ? (progress > 0 ? 'Continue Learning' : 'Start Course') : 'Sign in to Start'}
        </Button>
      </div>
    </div>
  );
}