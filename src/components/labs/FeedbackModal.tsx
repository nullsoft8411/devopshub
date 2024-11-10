import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { FeedbackForm, LabFeedback } from './LabFeedback';

interface FeedbackModalProps {
  labId: string;
  onSubmit: (feedback: LabFeedback) => Promise<void>;
  onClose: () => void;
}

export function FeedbackModal({ labId, onSubmit, onClose }: FeedbackModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 relative">
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <LabFeedback
            labId={labId}
            onSubmit={async (feedback) => {
              await onSubmit(feedback);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}