import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Protect admin routes
  React.useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="lg:pl-64 flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}