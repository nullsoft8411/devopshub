import React from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { AdminStats } from '@/components/admin/AdminStats';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { SystemStatus } from '@/components/admin/SystemStatus';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            System overview and management
          </p>
        </div>

        <AdminStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <SystemStatus />
        </div>
      </div>
    </AdminLayout>
  );
}