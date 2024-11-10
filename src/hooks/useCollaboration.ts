import { useState, useEffect, useCallback } from 'react';
import { CollaborationManager, CollaborationUser } from '@/lib/collaboration/CollaborationManager';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system' | 'error';
}

export function useCollaboration(labId: string, sessionId: string) {
  const [collaborationManager, setCollaborationManager] = useState<CollaborationManager | null>(null);
  const [collaborators, setCollaborators] = useState<CollaborationUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const manager = new CollaborationManager(sessionId, userId);
    setCollaborationManager(manager);

    return () => {
      manager.destroy();
    };
  }, [sessionId]);

  const sendMessage = useCallback((content: string) => {
    if (!collaborationManager) return;

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      userId: localStorage.getItem('userId') || '',
      userName: localStorage.getItem('userName') || 'Anonymous',
      content,
      timestamp: new Date(),
      type: 'message'
    };

    collaborationManager.socket.emit('chat_message', message);
  }, [collaborationManager]);

  const inviteUser = useCallback(async (email: string) => {
    if (!collaborationManager) return;
    await collaborationManager.inviteUser(email);
  }, [collaborationManager]);

  const leaveSession = useCallback(() => {
    if (!collaborationManager) return;
    collaborationManager.leaveSession();
    window.location.href = '/labs';
  }, [collaborationManager]);

  useEffect(() => {
    if (!collaborationManager) return;

    const handleUserJoined = (user: CollaborationUser) => {
      setCollaborators(prev => [...prev, user]);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        userId: 'system',
        userName: 'System',
        content: `${user.name} joined the session`,
        timestamp: new Date(),
        type: 'system'
      }]);
    };

    const handleUserLeft = (userId: string) => {
      setCollaborators(prev => prev.filter(c => c.id !== userId));
      const user = collaborators.find(c => c.id === userId);
      if (user) {
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          userId: 'system',
          userName: 'System',
          content: `${user.name} left the session`,
          timestamp: new Date(),
          type: 'system'
        }]);
      }
    };

    const handleChatMessage = (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    };

    collaborationManager.socket.on('user_joined', handleUserJoined);
    collaborationManager.socket.on('user_left', handleUserLeft);
    collaborationManager.socket.on('chat_message', handleChatMessage);
    collaborationManager.socket.on('host_status', setIsHost);

    return () => {
      collaborationManager.socket.off('user_joined', handleUserJoined);
      collaborationManager.socket.off('user_left', handleUserLeft);
      collaborationManager.socket.off('chat_message', handleChatMessage);
      collaborationManager.socket.off('host_status', setIsHost);
    };
  }, [collaborationManager, collaborators]);

  return {
    collaborators,
    messages,
    isHost,
    error,
    sendMessage,
    inviteUser,
    leaveSession
  };
}