import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Share2, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { TerminalOutput } from './TerminalOutput';
import { useLabReplay } from '@/hooks/useLabReplay';
import { formatDuration } from '@/lib/utils';

interface LabReplayProps {
  sessionId: string;
  onShare?: () => void;
  className?: string;
}

export function LabReplay({ sessionId, onShare, className = '' }: LabReplayProps) {
  const {
    commands,
    currentIndex,
    isPlaying,
    playbackSpeed,
    duration,
    play,
    pause,
    reset,
    setSpeed,
    exportSession
  } = useLabReplay(sessionId);

  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commands.length > 0) {
      setProgress((currentIndex / commands.length) * 100);
    }
  }, [currentIndex, commands.length]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    const newIndex = Math.floor((percentage / 100) * commands.length);
    reset(newIndex);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Session Replay</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportSession}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Terminal Output */}
        <div className="bg-gray-900 rounded-lg p-4 h-80 overflow-y-auto font-mono">
          {commands.slice(0, currentIndex + 1).map((command, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center text-gray-400">
                <span className="mr-2">$</span>
                <span>{command.input}</span>
              </div>
              <TerminalOutput
                content={command.output}
                type={command.status}
              />
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="absolute h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isPlaying ? pause() : play()}
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
              onClick={() => reset()}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSpeed(playbackSpeed === 2 ? 1 : 2)}
            >
              <FastForward className="h-4 w-4" />
              {playbackSpeed}x
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>
              {formatDuration(currentIndex > 0 ? commands[currentIndex].timestamp : 0)}
            </span>
            <span>/</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}