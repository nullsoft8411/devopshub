import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Metric {
  name: string;
  value: number;
  trend: number;
  unit: string;
}

interface PerformanceMetricsProps {
  metrics: Metric[];
  className?: string;
}

export function PerformanceMetrics({ metrics, className = '' }: PerformanceMetricsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {metrics.map((metric, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{metric.name}</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900">
                {metric.value}{metric.unit}
              </span>
              <div className={`flex items-center ${
                metric.trend > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.trend > 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span className="text-sm">{Math.abs(metric.trend)}%</span>
              </div>
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all"
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}