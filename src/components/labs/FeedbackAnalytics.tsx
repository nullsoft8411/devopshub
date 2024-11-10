import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, Brain, ThumbsUp } from 'lucide-react';

interface AnalyticsData {
  totalAttempts: number;
  averageCompletionTime: string;
  successRate: number;
  averageRating: number;
  difficultyDistribution: {
    tooEasy: number;
    justRight: number;
    tooHard: number;
  };
  helpfulnessScore: number;
  conceptsLearned: Array<{
    name: string;
    count: number;
  }>;
}

interface FeedbackAnalyticsProps {
  data: AnalyticsData;
  className?: string;
}

export function FeedbackAnalytics({ data, className = '' }: FeedbackAnalyticsProps) {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const difficultyData = [
    { name: 'Too Easy', value: data.difficultyDistribution.tooEasy },
    { name: 'Just Right', value: data.difficultyDistribution.justRight },
    { name: 'Too Hard', value: data.difficultyDistribution.tooHard }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Users}
          label="Total Attempts"
          value={data.totalAttempts.toString()}
          color="blue"
        />
        <MetricCard
          icon={Clock}
          label="Avg. Completion Time"
          value={data.averageCompletionTime}
          color="green"
        />
        <MetricCard
          icon={Brain}
          label="Success Rate"
          value={`${data.successRate}%`}
          color="yellow"
        />
        <MetricCard
          icon={ThumbsUp}
          label="Helpfulness"
          value={`${data.helpfulnessScore}%`}
          color="indigo"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Difficulty Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Concepts Learned */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Concepts Learned
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.conceptsLearned}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'yellow' | 'indigo';
}

function MetricCard({ icon: Icon, label, value, color }: MetricCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}