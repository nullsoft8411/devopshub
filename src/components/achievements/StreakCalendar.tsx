import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

interface StreakCalendarProps {
  streakDays: Date[];
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export function StreakCalendar({
  streakDays,
  currentStreak,
  longestStreak,
  className = ''
}: StreakCalendarProps) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const days = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1)
  );

  const isStreakDay = (date: Date) =>
    streakDays.some(d => d.toDateString() === date.toDateString());

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Practice Streak</h3>
        </div>
        <div className="text-sm text-gray-500">
          {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        
        {Array.from({ length: startOfMonth.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {days.map((date) => {
          const isToday = date.toDateString() === today.toDateString();
          const hasStreak = isStreakDay(date);
          
          return (
            <div
              key={date.toISOString()}
              className={`aspect-square flex items-center justify-center rounded-lg ${
                isToday
                  ? 'border-2 border-blue-500'
                  : hasStreak
                  ? 'bg-green-100'
                  : 'bg-gray-50'
              }`}
            >
              <div className="relative">
                <span className={`text-sm ${
                  hasStreak ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {date.getDate()}
                </span>
                {hasStreak && (
                  <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">Current Streak</p>
          <p className="text-2xl font-bold text-blue-900">{currentStreak} days</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">Longest Streak</p>
          <p className="text-2xl font-bold text-green-900">{longestStreak} days</p>
        </div>
      </div>
    </div>
  );
}