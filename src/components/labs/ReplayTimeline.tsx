import React, { useRef } from 'react';
import { Command } from '@/types/lab';

interface ReplayTimelineProps {
  commands: Command[];
  currentIndex: number;
  onSeek: (index: number) => void;
  className?: string;
}

export function ReplayTimeline({
  commands,
  currentIndex,
  onSeek,
  className = ''
}: ReplayTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    const index = Math.floor((percentage / 100) * commands.length);
    onSeek(index);
  };

  const progress = commands.length > 0
    ? (currentIndex / commands.length) * 100
    : 0;

  return (
    <div className={className}>
      <div
        ref={timelineRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleClick}
      >
        <div
          className="absolute h-full bg-blue-600 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />

        {/* Command Markers */}
        {commands.map((command, index) => (
          <div
            key={index}
            className={`absolute w-1 h-1 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 ${
              index <= currentIndex ? 'bg-blue-600' : 'bg-gray-400'
            }`}
            style={{ left: `${(index / commands.length) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}