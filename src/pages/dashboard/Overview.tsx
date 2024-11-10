import React from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { RecommendedPaths } from '@/components/dashboard/RecommendedPaths';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export default function Overview() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecommendedPaths />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}