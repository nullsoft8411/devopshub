import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface SystemStatus {
  api: 'healthy' | 'warning' | 'error';
  apiResponseTime: number;
  apiUptime: string;
  database: 'healthy' | 'warning' | 'error';
  dbConnections: number;
  dbQueryTime: number;
}

export function useSystemStatus() {
  const [status, setStatus] = useState<SystemStatus>({
    api: 'healthy',
    apiResponseTime: 0,
    apiUptime: '',
    database: 'healthy',
    dbConnections: 0,
    dbQueryTime: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/admin/system/status');
        setStatus(response.data);
      } catch (err) {
        setError('Failed to load system status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { status, isLoading, error };
}