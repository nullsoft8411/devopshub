import { api } from '@/lib/api';
import { Certificate } from '@/lib/certification/certificateGenerator';

export interface VerificationResponse {
  certificate: Certificate;
  lab: {
    title: string;
    description: string;
    difficulty: string;
  };
  user: {
    name: string;
  };
}

export const certificateApi = {
  async verify(id: string): Promise<VerificationResponse> {
    const response = await api.get(`/certificates/${id}/verify`);
    return response.data;
  },

  async getCertificates(userId: string): Promise<Certificate[]> {
    const response = await api.get(`/users/${userId}/certificates`);
    return response.data;
  },

  async generateCertificate(data: Partial<Certificate>): Promise<Certificate> {
    const response = await api.post('/certificates', data);
    return response.data;
  }
};