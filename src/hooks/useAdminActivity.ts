import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export function useAdminActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/admin/activities');
        setActivities(response.data);
      } catch (err) {
        setError('Failed to load activities');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();

    // Set up real-time updates
    const ws = new WebSocket(process.env.VITE_WS_URL || 'ws://localhost:3000');
    ws.onmessage = (event) => {
      const newActivity = JSON.parse(event.data);
      setActivities(prev => [newActivity, ...prev].slice(0, 50));
    };

    return () => ws.close();
  }, []);

  return { activities, isLoading, error };
}