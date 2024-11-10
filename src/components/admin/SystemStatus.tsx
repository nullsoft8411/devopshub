import React from 'react';
import { Server, Database, CheckCircle, AlertTriangle } from 'lucide-react';
import { useSystemStatus } from '@/hooks/useSystemStatus';

export function SystemStatus() {
  const { status, isLoading } = useSystemStatus();

  if (isLoading) {
    return <div>Loading system status...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
      </div>

      <div className="p-6 space-y-6">
        <StatusItem
          title="API Server"
          status={status.api}
          icon={Server}
          metrics={{
            'Response Time': `${status.apiResponseTime}ms`,
            'Uptime': status.apiUptime
          }}
        />

        <StatusItem
          title="Database"
          status={status.database}
          icon={Database}
          metrics={{
            'Connections': status.dbConnections,
            'Query Time': `${status.dbQueryTime}ms`
          }}
        />
      </div>
    </div>
  );
}

interface StatusItemProps {
  title: string;
  status: 'healthy' | 'warning' | 'error';
  icon: React.ElementType;
  metrics: Record<string, string | number>;
}

function StatusItem({ title, status, icon: Icon, metrics }: StatusItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const StatusIcon = status === 'healthy' ? CheckCircle : AlertTriangle;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-gray-400" />
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        <StatusIcon className={`h-5 w-5 ${getStatusColor()}`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">{key}</p>
            <p className="text-lg font-medium text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}