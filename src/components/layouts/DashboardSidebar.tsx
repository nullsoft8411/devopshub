import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Award,
  Settings,
  BarChart,
  Terminal,
  HelpCircle
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Learning Paths', href: '/paths', icon: GraduationCap },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Labs', href: '/labs', icon: Terminal },
  { name: 'Progress', href: '/progress', icon: BarChart },
  { name: 'Certifications', href: '/certifications', icon: Award },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/support', icon: HelpCircle },
];

export function DashboardSidebar() {
  return (
    <div className="h-full bg-white border-r border-gray-200">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}