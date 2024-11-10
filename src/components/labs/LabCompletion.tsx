import React from 'react';
import { Trophy, Download, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Certificate } from '@/lib/certification/certificateGenerator';

interface LabCompletionProps {
  certificate: Certificate;
  labTitle: string;
  onDownloadCertificate: () => void;
  onShare: () => void;
  onRate: (rating: number) => void;
}

export function LabCompletion({
  certificate,
  labTitle,
  onDownloadCertificate,
  onShare,
  onRate
}: LabCompletionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-yellow-100 rounded-full">
          <Trophy className="h-12 w-12 text-yellow-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Congratulations!
      </h2>
      <p className="text-gray-600 mb-6">
        You've successfully completed {labTitle}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">{certificate.score}%</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">{certificate.timeTaken}</div>
          <div className="text-sm text-gray-600">Time</div>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={onDownloadCertificate}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Certificate
        </Button>
        
        <Button
          variant="outline"
          onClick={onShare}
          className="w-full"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Achievement
        </Button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-600">Rate this lab:</span>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
              onClick={() => onRate(rating)}
            >
              <Star className={`w-5 h-5 ${rating <= certificate.score / 20 ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}