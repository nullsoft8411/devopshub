import React from 'react';
import { Users, BookOpen, Server, Award } from 'lucide-react';
import { useAdminStats } from '@/hooks/useAdminStats';

export function AdminStats() {
  const { stats, isLoading } = useAdminStats();

  if (isLoading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        change={stats.userGrowth}
        icon={Users}
        color="blue"
      />
      <StatCard
        title="Active Labs"
        value={stats.activeLabs}
        change={stats.labGrowth}
        icon={Server}
        color="green"
      />
      <StatCard
        title="Course Completions"
        value={stats.courseCompletions}
        change={stats.completionGrowth}
        icon={BookOpen}
        color="purple"
      />
      <StatCard
        title="Certificates Issued"
        value={stats.certificatesIssued}
        change={stats.certificateGrowth}
        icon={Award}
        color="yellow"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colors[color]} bg-opacity-10`}>
          <Icon className={`h-6 w-6 ${colors[color]} text-opacity-100`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}% from last month
        </div>
      </div>
    </div>
  );
}