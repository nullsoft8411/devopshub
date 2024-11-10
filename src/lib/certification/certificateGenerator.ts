import { v4 as uuidv4 } from 'uuid';
import { Lab } from '@/types/lab';
import { User } from '@/types/auth';

export interface Certificate {
  id: string;
  userId: string;
  labId: string;
  score: number;
  completionTime: string;
  issuedAt: Date;
  verificationCode: string;
}

export class CertificateGenerator {
  static async generateCertificate(
    lab: Lab,
    user: User,
    startTime: Date,
    completedTasks: number[]
  ): Promise<Certificate> {
    const endTime = new Date();
    const timeTaken = this.calculateTimeTaken(startTime, endTime);
    const score = this.calculateScore(lab, completedTasks, timeTaken);

    return {
      id: uuidv4(),
      userId: user.id,
      labId: lab.id,
      score,
      completionTime: timeTaken,
      issuedAt: endTime,
      verificationCode: this.generateVerificationCode()
    };
  }

  private static calculateScore(lab: Lab, completedTasks: number[], timeTaken: string): number {
    const completionPercentage = (completedTasks.length / lab.tasks.length) * 100;
    const timeBonus = this.calculateTimeBonus(timeTaken, lab.duration);
    return Math.round(completionPercentage * timeBonus);
  }

  private static calculateTimeBonus(timeTaken: string, expectedDuration: string): number {
    const takenMinutes = this.parseTimeToMinutes(timeTaken);
    const expectedMinutes = this.parseTimeToMinutes(expectedDuration);
    
    if (takenMinutes <= expectedMinutes) {
      return 1;
    } else {
      return Math.max(0.8, 1 - ((takenMinutes - expectedMinutes) / expectedMinutes) * 0.2);
    }
  }

  private static calculateTimeTaken(startTime: Date, endTime: Date): string {
    const diff = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  }

  private static parseTimeToMinutes(duration: string): number {
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    
    return (hours ? parseInt(hours[1]) * 60 : 0) + (minutes ? parseInt(minutes[1]) : 0);
  }

  private static generateVerificationCode(): string {
    return uuidv4().replace(/-/g, '').substring(0, 12).toUpperCase();
  }
}