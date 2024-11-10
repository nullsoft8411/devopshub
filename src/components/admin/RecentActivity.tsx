import React from 'react';
import { Activity, User, BookOpen, Award } from 'lucide-react';
import { useAdminActivity } from '@/hooks/useAdminActivity';

export function RecentActivity() {
  const { activities, isLoading } = useAdminActivity();

  if (isLoading) {
    return <div>Loading activity...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start space-x-3">
              <ActivityIcon type={activity.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'user':
      return <User className="h-5 w-5 text-blue-500" />;
    case 'course':
      return <BookOpen className="h-5 w-5 text-green-500" />;
    case 'certificate':
      return <Award className="h-5 w-5 text-yellow-500" />;
    default:
      return <Activity className="h-5 w-5 text-gray-500" />;
  }
}