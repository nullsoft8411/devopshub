import React from 'react';
import { RefreshCw, Download, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { FeedbackAnalytics } from './FeedbackAnalytics';
import { useLabAnalytics } from '@/hooks/useLabAnalytics';

interface AnalyticsDashboardProps {
  labId: string;
  className?: string;
}

export function AnalyticsDashboard({ labId, className = '' }: AnalyticsDashboardProps) {
  const { data, isLoading, error, refreshAnalytics } = useLabAnalytics(labId);

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshAnalytics}
          className="mt-2"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Lab Analytics</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAnalytics}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <FeedbackAnalytics data={data} />
    </div>
  );
}