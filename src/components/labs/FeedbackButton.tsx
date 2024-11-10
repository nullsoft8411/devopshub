import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

interface FeedbackButtonProps {
  onClick: () => void;
  className?: string;
}

export function FeedbackButton({ onClick, className = '' }: FeedbackButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center space-x-2 ${className}`}
    >
      <MessageSquare className="h-4 w-4" />
      <span>Provide Feedback</span>
    </Button>
  );
}