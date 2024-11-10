import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface VerificationBadgeProps {
  certificateId: string;
  verificationUrl: string;
  className?: string;
}

export function VerificationBadge({
  certificateId,
  verificationUrl,
  className = ''
}: VerificationBadgeProps) {
  return (
    <div className={`flex items-center justify-between p-4 bg-green-50 rounded-lg ${className}`}>
      <div className="flex items-center space-x-3">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm font-medium text-green-800">Verified Certificate</p>
          <p className="text-xs text-green-600">ID: {certificateId}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-green-700 hover:text-green-800 hover:bg-green-100"
        onClick={() => window.open(verificationUrl, '_blank')}
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Verify
      </Button>
    </div>
  );
}