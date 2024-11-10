import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <DashboardSidebar />
            </div>
          </div>
        )}
      </div>

      <div className="lg:flex">
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
          <DashboardSidebar />
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}