import { useState, useCallback } from 'react';
import { Lab } from '@/types/lab';
import { User } from '@/types/auth';
import { Certificate, CertificateService } from '@/lib/certification/CertificateService';
import { PDFGenerator } from '@/lib/certification/PDFGenerator';

export function useCertificate() {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCertificate = useCallback(async (
    lab: Lab,
    user: User,
    score: number,
    completionTime: string
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      const newCertificate = await CertificateService.generateCertificate(
        lab,
        user,
        score,
        completionTime
      );
      setCertificate(newCertificate);
      return newCertificate;
    } catch (err) {
      setError('Failed to generate certificate');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const downloadCertificate = useCallback(async (
    lab: Lab,
    user: User
  ) => {
    if (!certificate) return;

    try {
      const verificationUrl = CertificateService.getVerificationUrl(certificate.id);
      const pdfBlob = await PDFGenerator.generateCertificatePDF(
        certificate,
        lab,
        user,
        verificationUrl
      );
      
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${lab.title}-Certificate.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download certificate');
      throw err;
    }
  }, [certificate]);

  const shareCertificate = useCallback(async () => {
    if (!certificate) return;

    try {
      const verificationUrl = CertificateService.getVerificationUrl(certificate.id);
      
      if (navigator.share) {
        await navigator.share({
          title: 'Lab Completion Certificate',
          text: 'Check out my lab completion certificate!',
          url: verificationUrl
        });
      } else {
        await navigator.clipboard.writeText(verificationUrl);
        // You might want to show a toast notification here
      }
    } catch (err) {
      setError('Failed to share certificate');
      throw err;
    }
  }, [certificate]);

  return {
    certificate,
    isGenerating,
    error,
    generateCertificate,
    downloadCertificate,
    shareCertificate
  };
}