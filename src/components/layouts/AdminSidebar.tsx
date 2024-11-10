import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Server,
  Award,
  Settings,
  Activity,
  Shield
} from 'lucide-react';

export function AdminSidebar() {
  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Labs', href: '/admin/labs', icon: Server },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Analytics', href: '/admin/analytics', icon: Activity },
    { name: 'Settings', href: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-gray-900">
        <div className="flex items-center h-16 px-4 bg-gray-800">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="ml-3 text-xl font-bold text-white">Admin Panel</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}