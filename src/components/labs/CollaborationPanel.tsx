import React, { useState } from 'react';
import { Users, MessageSquare, Share2, UserPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { CollaboratorList } from './CollaboratorList';
import { CollaborationChat } from './CollaborationChat';
import { InviteModal } from './InviteModal';
import { useCollaboration } from '@/hooks/useCollaboration';

interface CollaborationPanelProps {
  labId: string;
  sessionId: string;
  className?: string;
}

export function CollaborationPanel({
  labId,
  sessionId,
  className = ''
}: CollaborationPanelProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const {
    collaborators,
    messages,
    isHost,
    sendMessage,
    inviteUser,
    leaveSession
  } = useCollaboration(labId, sessionId);

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Collaboration</h3>
          </div>
          {isHost && (
            <Button
              size="sm"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Collaborators List */}
        <div className="p-4">
          <CollaboratorList
            collaborators={collaborators}
            isHost={isHost}
          />
        </div>

        {/* Chat Section */}
        <div className="p-4">
          <CollaborationChat
            messages={messages}
            onSendMessage={sendMessage}
          />
        </div>

        {/* Actions */}
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={leaveSession}
          >
            Leave Session
          </Button>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal
          onInvite={inviteUser}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
}