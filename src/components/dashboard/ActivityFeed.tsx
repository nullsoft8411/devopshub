import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Trophy, 
  BookOpen, 
  Terminal,
  ArrowRight,
  Star,
  Target,
  Medal,
  Zap,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Activity {
  id: string;
  type: 'completion' | 'achievement' | 'progress' | 'started' | 'certification' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  link?: string;
  meta?: {
    progress?: number;
    rating?: number;
    points?: number;
    xp?: number;
  };
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'completion',
    title: 'Completed Docker Basics Lab',
    description: 'Successfully completed all tasks in Docker container management',
    timestamp: '2 hours ago',
    link: '/dashboard/labs/docker-basics',
    meta: {
      points: 100,
      xp: 250
    }
  },
  {
    id: '2',
    type: 'certification',
    title: 'Earned Certificate',
    description: 'DevOps Fundamentals Certification',
    timestamp: '1 day ago',
    link: '/dashboard/certificates/devops-fundamentals',
    meta: {
      rating: 4.8,
      xp: 1000
    }
  },
  {
    id: '3',
    type: 'progress',
    title: 'Course Progress',
    description: 'Kubernetes Essentials',
    timestamp: '2 days ago',
    link: '/dashboard/courses/kubernetes-essentials',
    meta: {
      progress: 60,
      xp: 150
    }
  },
  {
    id: '4',
    type: 'milestone',
    title: 'Learning Milestone',
    description: 'Completed 10 hands-on labs',
    timestamp: '3 days ago',
    meta: {
      points: 500,
      xp: 750
    }
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'Container Master - Deploy 10 containers successfully',
    timestamp: '4 days ago',
    meta: {
      points: 250,
      xp: 500
    }
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'completion':
      return CheckCircle;
    case 'achievement':
      return Star;
    case 'progress':
      return Target;
    case 'started':
      return BookOpen;
    case 'certification':
      return Trophy;
    case 'milestone':
      return Medal;
    default:
      return Terminal;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'completion':
      return 'text-green-500 bg-green-50';
    case 'achievement':
      return 'text-purple-500 bg-purple-50';
    case 'progress':
      return 'text-blue-500 bg-blue-50';
    case 'started':
      return 'text-indigo-500 bg-indigo-50';
    case 'certification':
      return 'text-yellow-500 bg-yellow-50';
    case 'milestone':
      return 'text-pink-500 bg-pink-50';
    default:
      return 'text-gray-500 bg-gray-50';
  }
};

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
            <p className="text-sm text-gray-500">Track your learning progress</p>
          </div>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);

          return (
            <div
              key={activity.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 p-2 rounded-lg ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {activity.timestamp}
                    </span>
                  </div>

                  {activity.meta?.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{activity.meta.progress}% complete</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full transition-all"
                          style={{ width: `${activity.meta.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-2 flex items-center space-x-4">
                    {activity.meta?.rating && (
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <span className="text-sm">{activity.meta.rating}</span>
                      </div>
                    )}
                    {activity.meta?.points && (
                      <div className="flex items-center text-purple-600 text-sm">
                        <Medal className="h-4 w-4 mr-1" />
                        +{activity.meta.points} points
                      </div>
                    )}
                    {activity.meta?.xp && (
                      <div className="flex items-center text-blue-600 text-sm">
                        <Zap className="h-4 w-4 mr-1" />
                        +{activity.meta.xp} XP
                      </div>
                    )}
                  </div>

                  {activity.link && (
                    <Link
                      to={activity.link}
                      className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                    >
                      View details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-gray-50 rounded-b-xl">
        <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
          Load more activities
        </Button>
      </div>
    </div>
  );
}