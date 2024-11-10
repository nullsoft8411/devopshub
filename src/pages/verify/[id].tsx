import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Trophy, User, ExternalLink } from 'lucide-react';
import { VerificationService, VerificationResult } from '@/lib/certification/verificationService';
import { Button } from '@/components/ui/Button';

export default function CertificateVerification() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyCertificate = async () => {
      if (!id) return;
      setIsLoading(true);
      const verificationResult = await VerificationService.verifyCertificate(id);
      setResult(verificationResult);
      setIsLoading(false);
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

  if (!result?.isValid || !result.certificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Certificate</h2>
          <p className="text-gray-600">{result?.error || 'Certificate not found'}</p>
          <Button
            className="mt-6"
            onClick={() => window.location.href = '/'}
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const { certificate } = result;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Valid Certificate
            </h1>
            <p className="text-center text-gray-600 mb-8">
              This certificate has been verified as authentic
            </p>

            <div className="space-y-6">
              <div className="border-t border-b border-gray-100 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Certificate Holder</p>
                      <p className="font-medium text-gray-900">{certificate.userName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Trophy className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Achievement</p>
                      <p className="font-medium text-gray-900">{certificate.labTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Completion Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(certificate.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 text-gray-400">%</div>
                    <div>
                      <p className="text-sm text-gray-500">Score Achieved</p>
                      <p className="font-medium text-gray-900">{certificate.score}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Certificate ID: {certificate.id}</p>
                <p className="mt-1">Issued by DevOps Training Hub</p>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => window.open('https://devopstraininghub.com', '_blank')}
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit DevOps Training Hub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}