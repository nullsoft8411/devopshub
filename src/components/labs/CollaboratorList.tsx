import React from 'react';
import { Crown, Trash2, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';

interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isActive: boolean;
  currentTask?: number;
}

interface CollaboratorListProps {
  collaborators: Collaborator[];
  isHost: boolean;
  onRemove?: (userId: string) => void;
  onViewTerminal?: (userId: string) => void;
}

export function CollaboratorList({
  collaborators,
  isHost,
  onRemove,
  onViewTerminal
}: CollaboratorListProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Participants</h4>
      <div className="space-y-2">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              {collaborator.avatar ? (
                <img
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    {collaborator.name[0]}
                  </span>
                </div>
              )}
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">
                    {collaborator.name}
                  </span>
                  {collaborator.isHost && (
                    <Crown className="h-4 w-4 ml-1 text-yellow-500" />
                  )}
                </div>
                {collaborator.currentTask && (
                  <p className="text-sm text-gray-500">
                    Task {collaborator.currentTask}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                collaborator.isActive ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              {isHost && !collaborator.isHost && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove?.(collaborator.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewTerminal?.(collaborator.id)}
              >
                <Terminal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}