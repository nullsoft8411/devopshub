import { useState, useCallback, useEffect, useRef } from 'react';
import { api } from '@/lib/api';

interface Command {
  input: string;
  output: string;
  status: 'success' | 'error' | 'info';
  timestamp: number;
}

export function useLabReplay(sessionId: string) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const loadSession = useCallback(async () => {
    try {
      const response = await api.get(`/lab-sessions/${sessionId}`);
      setCommands(response.data.commands);
      setDuration(response.data.duration);
    } catch (err) {
      setError('Failed to load session');
    }
  }, [sessionId]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (!isPlaying || currentIndex >= commands.length - 1) {
      clearTimeout(timeoutRef.current);
      return;
    }

    const nextCommand = commands[currentIndex + 1];
    const currentCommand = commands[currentIndex];
    const delay = currentCommand && nextCommand
      ? (nextCommand.timestamp - currentCommand.timestamp) / playbackSpeed
      : 1000 / playbackSpeed;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [isPlaying, currentIndex, commands, playbackSpeed]);

  const play = useCallback(() => {
    if (currentIndex >= commands.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  }, [currentIndex, commands.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback((index = 0) => {
    setIsPlaying(false);
    setCurrentIndex(index);
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
  }, []);

  const exportSession = useCallback(async () => {
    try {
      const response = await api.get(`/lab-sessions/${sessionId}/export`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lab-session-${sessionId}.json`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export session');
    }
  }, [sessionId]);

  return {
    commands,
    currentIndex,
    isPlaying,
    playbackSpeed,
    duration,
    error,
    play,
    pause,
    reset,
    setSpeed,
    exportSession
  };
}