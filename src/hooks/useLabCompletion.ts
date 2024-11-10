import { useState, useCallback } from 'react';
import { Lab } from '@/types/lab';
import { User } from '@/types/auth';
import { Certificate, CertificateGenerator } from '@/lib/certification/certificateGenerator';
import { PDFGenerator } from '@/lib/certification/pdfGenerator';
import { api } from '@/lib/api';

interface UseLabCompletionProps {
  lab: Lab;
  user: User;
}

export function useLabCompletion({ lab, user }: UseLabCompletionProps) {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completeLab = useCallback(async (startTime: Date, completedTasks: number[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const newCertificate = await CertificateGenerator.generateLabCertificate(
        lab,
        user,
        startTime,
        completedTasks
      );

      // Save certificate to backend
      await api.post('/certificates', newCertificate);
      
      setCertificate(newCertificate);
      return newCertificate;
    } catch (err) {
      setError('Failed to generate certificate');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [lab, user]);

  const downloadCertificate = useCallback(async () => {
    if (!certificate) return;

    try {
      setIsLoading(true);
      const verificationUrl = `${window.location.origin}/verify/${certificate.id}`;
      
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
    } finally {
      setIsLoading(false);
    }
  }, [certificate, lab, user]);

  const shareCertificate = useCallback(async () => {
    if (!certificate) return;

    try {
      const verificationUrl = `${window.location.origin}/verify/${certificate.id}`;
      
      if (navigator.share) {
        await navigator.share({
          title: `${lab.title} Completion Certificate`,
          text: `I just completed the ${lab.title} lab with a score of ${certificate.score}%!`,
          url: verificationUrl
        });
      } else {
        await navigator.clipboard.writeText(verificationUrl);
        // You might want to show a toast notification here
      }
    } catch (err) {
      setError('Failed to share certificate');
    }
  }, [certificate, lab.title]);

  return {
    certificate,
    isLoading,
    error,
    completeLab,
    downloadCertificate,
    shareCertificate
  };
}