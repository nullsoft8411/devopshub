import React from 'react';
import { Download, Share2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Certificate } from '@/lib/certification/CertificateService';

interface CertificateViewProps {
  certificate: Certificate;
  labTitle: string;
  userName: string;
  onDownload: () => void;
  onShare: () => void;
  className?: string;
}

export function CertificateView({
  certificate,
  labTitle,
  userName,
  onDownload,
  onShare,
  className = ''
}: CertificateViewProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-8 text-center border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Certificate of Completion
        </h2>
        <p className="text-lg text-gray-600">{labTitle}</p>
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <p className="text-gray-600">This is to certify that</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{userName}</h3>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Final Score</p>
            <p className="text-2xl font-bold text-gray-900">{certificate.score}%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Completion Time</p>
            <p className="text-2xl font-bold text-gray-900">{certificate.completionTime}</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-8">
          <p>Certificate ID: {certificate.id}</p>
          <p>Issued on {certificate.issuedAt.toLocaleDateString()}</p>
          <p>Verification Code: {certificate.verificationCode}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="p-4 bg-gray-50 text-center">
        <a
          href={`/verify/${certificate.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center"
        >
          Verify this certificate
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </div>
    </div>
  );
}