import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReplayShareProps {
  sessionId: string;
  onClose: () => void;
}

export function ReplayShare({ sessionId, onClose }: ReplayShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/lab-replay/${sessionId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lab Session Replay',
          text: 'Check out my lab session replay!',
          url: shareUrl
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Share Lab Replay
        </h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-2 bg-gray-50 rounded-lg font-mono text-sm truncate">
              {shareUrl}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex space-x-3">
            {navigator.share && (
              <Button
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}