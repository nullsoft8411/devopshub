import React from 'react';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDuration } from '@/lib/utils';

interface ReplayControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  className?: string;
}

export function ReplayControls({
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  className = ''
}: ReplayControlsProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => isPlaying ? onPause() : onPlay()}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSpeedChange(playbackSpeed === 2 ? 1 : 2)}
        >
          <FastForward className="h-4 w-4" />
          {playbackSpeed}x
        </Button>
      </div>

      <div className="text-sm text-gray-500">
        {formatDuration(currentTime)} / {formatDuration(duration)}
      </div>
    </div>
  );
}