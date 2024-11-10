import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, Cloud, Shield, Users } from 'lucide-react';

const recommendedPaths = [
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Master modern software delivery',
    progress: 45,
    icon: Cloud,
    stats: {
      students: '2.4k',
      rating: '4.8',
      duration: '6 months'
    }
  },
  {
    id: 'linux-admin',
    title: 'Linux Administrator',
    description: 'Become a Linux expert',
    progress: 20,
    icon: Server,
    stats: {
      students: '1.8k',
      rating: '4.7',
      duration: '4 months'
    }
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    description: 'Learn cloud security',
    progress: 0,
    icon: Shield,
    stats: {
      students: '1.2k',
      rating: '4.9',
      duration: '5 months'
    }
  }
];

export function RecommendedPaths() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Recommended Learning Paths
        </h2>
        <Link
          to="/dashboard/paths"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all paths
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recommendedPaths.map((path) => {
          const Icon = path.icon;
          return (
            <Link
              key={path.id}
              to={`/dashboard/paths/${path.id}`}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {path.title}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {path.description}
                  </p>
                  
                  <div className="mt-4 flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {path.stats.students} students
                    </div>
                    <div className="text-gray-500">
                      ⭐️ {path.stats.rating}
                    </div>
                    <div className="text-gray-500">
                      {path.stats.duration}
                    </div>
                  </div>

                  {path.progress > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{path.progress}% complete</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${path.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}