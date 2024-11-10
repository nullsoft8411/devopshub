import React from 'react';
import { useParams } from 'react-router-dom';
import { AnalyticsDashboard } from '@/components/labs/AnalyticsDashboard';

export default function LabAnalytics() {
  const { labId } = useParams<{ labId: string }>();

  if (!labId) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No lab selected</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnalyticsDashboard labId={labId} />
    </div>
  );
}