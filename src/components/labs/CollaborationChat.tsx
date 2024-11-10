import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system' | 'error';
}

interface CollaborationChatProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  className?: string;
}

export function CollaborationChat({
  messages,
  onSendMessage,
  className = ''
}: CollaborationChatProps) {
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSendMessage(input);
    setInput('');
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex flex-col h-96 ${className}`}>
      <div className="flex-1 overflow-y-auto p-4" ref={chatRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${
                message.type === 'system' ? 'justify-center' : ''
              }`}
            >
              {message.type === 'message' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    {message.userName[0]}
                  </span>
                </div>
              )}
              <div className={`flex-1 ${
                message.type === 'system' ? 'text-center' : ''
              }`}>
                {message.type === 'message' && (
                  <div className="flex items-baseline space-x-2">
                    <span className="font-medium text-gray-900">
                      {message.userName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                )}
                <div className={`mt-1 ${
                  message.type === 'system'
                    ? 'text-sm text-gray-500'
                    : message.type === 'error'
                    ? 'text-sm text-red-600'
                    : 'text-gray-800'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 p-4"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}