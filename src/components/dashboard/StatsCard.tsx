import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  name: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'positive' | 'negative';
}

export function StatsCard({ name, value, icon: Icon, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{name}</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="mt-4">
        <span
          className={`inline-flex items-center text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}