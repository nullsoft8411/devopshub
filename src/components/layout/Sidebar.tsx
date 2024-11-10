import React from 'react';
import { BookOpen, Terminal, Award, Settings } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: BookOpen, label: 'Courses', href: '/courses' },
    { icon: Terminal, label: 'Labs', href: '/labs' },
    { icon: Award, label: 'Certificates', href: '/certificates' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-700"
          >
            <item.icon className="mr-4 h-6 w-6" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}