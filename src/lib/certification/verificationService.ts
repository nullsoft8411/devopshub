import { api } from '@/lib/api';
import { Certificate } from './certificateGenerator';

export interface VerificationResult {
  isValid: boolean;
  certificate?: Certificate;
  error?: string;
}

export class VerificationService {
  static async verifyCertificate(id: string): Promise<VerificationResult> {
    try {
      const response = await api.get(`/certificates/${id}/verify`);
      return {
        isValid: true,
        certificate: response.data
      };
    } catch (err) {
      return {
        isValid: false,
        error: 'Certificate could not be verified'
      };
    }
  }

  static generateVerificationUrl(certificateId: string): string {
    return `${window.location.origin}/verify/${certificateId}`;
  }

  static async generateQRCode(certificateId: string): Promise<string> {
    const verificationUrl = this.generateVerificationUrl(certificateId);
    const QRCode = (await import('qrcode')).default;
    return QRCode.toDataURL(verificationUrl);
  }
}