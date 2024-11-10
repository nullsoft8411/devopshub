import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLabProgress } from '@/contexts/LabProgressContext';
import { Button } from '@/components/ui/Button';
import { Lab } from '@/types/lab';

interface LabCardProps extends Lab {
  stats: {
    students: string;
    rating: number;
  };
}

export function LabCard({
  id,
  title,
  description,
  duration,
  difficulty,
  category,
  tasks,
  stats,
  image,
}: LabCardProps) {
  const { isAuthenticated } = useAuth();
  const { getLabProgress } = useLabProgress();
  const navigate = useNavigate();

  const progress = getLabProgress(id);
  const completedTasks = progress?.completedTasks.length || 0;
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100);

  const handleStartLab = () => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: `/labs/${id}` } });
    } else {
      navigate(`/labs/${id}`);
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
            <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm
              ${difficulty === 'Beginner' ? 'bg-green-400/20 text-green-400' :
                difficulty === 'Intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                'bg-red-400/20 text-red-400'}`}
            >
              {difficulty}
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
              <Terminal className="h-4 w-4 mr-1" />
              {tasks.length} tasks
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {stats.students}
            </div>
            <div className="flex items-center text-gray-500">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              {stats.rating.toFixed(1)}
            </div>
          </div>
        </div>

        {completedTasks > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                {completedTasks}/{tasks.length} tasks completed
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
          onClick={handleStartLab}
          className="mt-6 w-full"
        >
          {isAuthenticated ? (completedTasks > 0 ? 'Continue Lab' : 'Start Lab') : 'Sign in to Start'}
        </Button>
      </div>
    </div>
  );
}