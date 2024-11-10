import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface VideoPlayerProps {
  poster?: string;
}

export function VideoPlayer({ poster }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      {poster ? (
        <img
          src={poster}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900" />
      )}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="ghost"
          className="h-16 w-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
        >
          <Play className="h-8 w-8 text-white" />
        </Button>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
              <SkipForward className="h-4 w-4" />
            </Button>
            <span className="text-sm">0:00 / 15:30</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 w-full bg-white/20 rounded-full h-1 cursor-pointer">
          <div className="bg-blue-600 h-1 rounded-full w-1/3" />
        </div>
      </div>
    </div>
  );
}