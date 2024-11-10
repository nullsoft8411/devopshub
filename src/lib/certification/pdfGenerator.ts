import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Certificate } from './certificateGenerator';
import { Lab } from '@/types/lab';
import { User } from '@/types/auth';

export class PDFGenerator {
  static async generateCertificatePDF(
    certificate: Certificate,
    lab: Lab,
    user: User,
    verificationUrl: string
  ): Promise<Blob> {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add background and styling
    this.addBackground(doc);
    this.addBorder(doc);
    
    // Add header
    this.addHeader(doc, lab.title);
    
    // Add content
    await this.addContent(doc, certificate, lab, user);
    
    // Add verification QR code
    await this.addVerification(doc, certificate, verificationUrl);

    return doc.output('blob');
  }

  private static addBackground(doc: jsPDF): void {
    doc.setFillColor(249, 250, 251);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
  }

  private static addBorder(doc: jsPDF): void {
    const margin = 10;
    const width = doc.internal.pageSize.getWidth() - 2 * margin;
    const height = doc.internal.pageSize.getHeight() - 2 * margin;
    
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, width, height);
  }

  private static addHeader(doc: jsPDF, labTitle: string): void {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(17, 24, 39);
    doc.text('Certificate of Completion', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
    
    doc.setFontSize(24);
    doc.text(labTitle, doc.internal.pageSize.getWidth() / 2, 60, { align: 'center' });
  }

  private static async addContent(
    doc: jsPDF,
    certificate: Certificate,
    lab: Lab,
    user: User
  ): Promise<void> {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(55, 65, 81);

    const centerX = doc.internal.pageSize.getWidth() / 2;
    let y = 90;

    doc.text('This is to certify that', centerX, y, { align: 'center' });
    
    y += 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(user.name, centerX, y, { align: 'center' });

    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('has successfully completed this lab with the following achievements:', centerX, y, { align: 'center' });

    y += 30;
    const achievements = [
      `Score: ${certificate.score}%`,
      `Completion Time: ${certificate.completionTime}`,
      `Date Issued: ${certificate.issuedAt.toLocaleDateString()}`
    ];

    achievements.forEach(achievement => {
      doc.text(achievement, centerX, y, { align: 'center' });
      y += 10;
    });
  }

  private static async addVerification(
    doc: jsPDF,
    certificate: Certificate,
    verificationUrl: string
  ): Promise<void> {
    const qrCode = await QRCode.toDataURL(verificationUrl);
    const qrSize = 30;
    const x = doc.internal.pageSize.getWidth() - 50;
    const y = doc.internal.pageSize.getHeight() - 50;

    doc.addImage(qrCode, 'PNG', x, y, qrSize, qrSize);

    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(
      'Verify this certificate at:',
      x + qrSize / 2,
      y + qrSize + 10,
      { align: 'center' }
    );
    doc.text(
      verificationUrl,
      x + qrSize / 2,
      y + qrSize + 15,
      { align: 'center' }
    );

    // Add verification code
    doc.text(
      `Verification Code: ${certificate.verificationCode}`,
      20,
      doc.internal.pageSize.getHeight() - 15
    );
  }
}