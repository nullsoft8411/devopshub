import React from 'react';
import { Server, Network, Database, Variable } from 'lucide-react';
import { EnvironmentState } from '@/lib/lab/LabEnvironment';

interface EnvironmentStatusProps {
  state: EnvironmentState;
  className?: string;
}

export function EnvironmentStatus({ state, className = '' }: EnvironmentStatusProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      <h3 className="text-sm font-medium text-gray-300 mb-4">Environment Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400">
            <Server className="h-4 w-4 mr-2" />
            <span>Containers</span>
          </div>
          <span className="text-sm text-gray-300">{state.containers.length}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400">
            <Network className="h-4 w-4 mr-2" />
            <span>Networks</span>
          </div>
          <span className="text-sm text-gray-300">{state.networks.length}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400">
            <Database className="h-4 w-4 mr-2" />
            <span>Volumes</span>
          </div>
          <span className="text-sm text-gray-300">{state.volumes.length}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400">
            <Variable className="h-4 w-4 mr-2" />
            <span>Variables</span>
          </div>
          <span className="text-sm text-gray-300">
            {Object.keys(state.variables).length}
          </span>
        </div>
      </div>

      {(state.containers.length > 0 || state.networks.length > 0 || state.volumes.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <details className="text-sm text-gray-400">
            <summary className="cursor-pointer hover:text-gray-300">
              View Details
            </summary>
            <div className="mt-2 space-y-2">
              {state.containers.length > 0 && (
                <div>
                  <p className="text-gray-500">Containers:</p>
                  <ul className="list-disc list-inside">
                    {state.containers.map(container => (
                      <li key={container} className="text-gray-300">{container}</li>
                    ))}
                  </ul>
                </div>
              )}
              {state.networks.length > 0 && (
                <div>
                  <p className="text-gray-500">Networks:</p>
                  <ul className="list-disc list-inside">
                    {state.networks.map(network => (
                      <li key={network} className="text-gray-300">{network}</li>
                    ))}
                  </ul>
                </div>
              )}
              {state.volumes.length > 0 && (
                <div>
                  <p className="text-gray-500">Volumes:</p>
                  <ul className="list-disc list-inside">
                    {state.volumes.map(volume => (
                      <li key={volume} className="text-gray-300">{volume}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}