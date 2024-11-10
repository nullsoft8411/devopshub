import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">DevOps Hub</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md text-gray-500 hover:bg-gray-100">
              <User className="h-5 w-5" />
              <span className="hidden md:inline-block">{user?.name}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-100 invisible group-hover:visible">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}