import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WelcomeBanner() {
  const { user } = useAuth();
  const currentTime = new Date();
  const hour = currentTime.getHours();

  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
      <div className="relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="mt-1 text-blue-100">
              Ready to continue your DevOps journey?
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <Button
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Resume Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            View Progress
          </Button>
        </div>
      </div>

      {/* Decorative background pattern */}
      <div className="absolute right-0 top-0 -mt-8 h-48 w-48 rotate-12 transform text-white/10">
        <svg className="h-full w-full" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20 12a8 8 0 0 0-8-8v8h8zm-8 8a8 8 0 0 0 8-8h-8v8zm-2-16a8 8 0 0 0-8 8h8V4zm-8 10a8 8 0 0 0 8 8v-8H2z"
          />
        </svg>
      </div>
    </div>
  );
}