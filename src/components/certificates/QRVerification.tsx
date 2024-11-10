import React, { useEffect, useState } from 'react';
import { QrCode } from 'lucide-react';
import { VerificationService } from '@/lib/certification/verificationService';

interface QRVerificationProps {
  certificateId: string;
  className?: string;
}

export function QRVerification({ certificateId, className = '' }: QRVerificationProps) {
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      const qrDataUrl = await VerificationService.generateQRCode(certificateId);
      setQrCode(qrDataUrl);
    };

    generateQR();
  }, [certificateId]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {qrCode ? (
        <img
          src={qrCode}
          alt="Certificate verification QR code"
          className="w-32 h-32"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <QrCode className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <p className="mt-2 text-sm text-gray-600 text-center">
        Scan to verify certificate
      </p>
    </div>
  );
}