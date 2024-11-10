import { v4 as uuidv4 } from 'uuid';
import { Lab } from '@/types/lab';
import { User } from '@/types/auth';
import { api } from '@/lib/api';

export interface Certificate {
  id: string;
  userId: string;
  labId: string;
  score: number;
  completionTime: string;
  issuedAt: Date;
  verificationCode: string;
}

export class CertificateService {
  static async generateCertificate(
    lab: Lab,
    user: User,
    score: number,
    completionTime: string
  ): Promise<Certificate> {
    const certificate: Certificate = {
      id: uuidv4(),
      userId: user.id,
      labId: lab.id,
      score,
      completionTime,
      issuedAt: new Date(),
      verificationCode: this.generateVerificationCode()
    };

    // Save certificate to backend
    await api.post('/certificates', certificate);

    return certificate;
  }

  static async verifyCertificate(id: string): Promise<Certificate | null> {
    try {
      const response = await api.get(`/certificates/${id}/verify`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  private static generateVerificationCode(): string {
    return uuidv4().replace(/-/g, '').substring(0, 12).toUpperCase();
  }

  static getVerificationUrl(certificateId: string): string {
    return `${window.location.origin}/verify/${certificateId}`;
  }
}