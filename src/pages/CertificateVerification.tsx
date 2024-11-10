import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Trophy, User } from 'lucide-react';
import { Certificate, CertificateService } from '@/lib/certification/CertificateService';

export default function CertificateVerification() {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      if (!id) return;
      
      try {
        const result = await CertificateService.verifyCertificate(id);
        setCertificate(result);
      } catch (err) {
        setError('Certificate verification failed');
      } finally {
        setIsLoading(false);
      }
    };

    verifyCertificate();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Certificate</h2>
          <p className="text-gray-600">{error || 'Certificate not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Valid Certificate
            </h1>
            <p className="text-center text-gray-600 mb-8">
              This certificate has been verified as authentic
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Certificate Holder</p>
                  <p className="font-medium text-gray-900">{certificate.userId}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Trophy className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Score Achieved</p>
                  <p className="font-medium text-gray-900">{certificate.score}%</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Completion Time</p>
                  <p className="font-medium text-gray-900">{certificate.completionTime}</p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Certificate ID: {certificate.id}</p>
              <p>Verification Code: {certificate.verificationCode}</p>
              <p>Issued on {certificate.issuedAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}