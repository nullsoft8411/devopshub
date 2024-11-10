<?php

namespace App\Services;

use App\Models\User;
use App\Models\Certificate;
use Illuminate\Support\Str;
use PDF;

class CertificateService
{
    public function generateCertificate(
        User $user,
        string $labId,
        int $score,
        string $timeTaken,
        array $completedTasks
    ): Certificate {
        $certificate = Certificate::create([
            'user_id' => $user->id,
            'lab_id' => $labId,
            'score' => $score,
            'time_taken' => $timeTaken,
            'completed_tasks' => $completedTasks,
            'issued_at' => now(),
            'certificate_hash' => $this->generateHash($user->id, $labId)
        ]);

        $certificate->generateVerificationCode();

        // Trigger achievement check
        event(new CertificateGenerated($certificate));

        return $certificate;
    }

    public function getVerificationUrl(Certificate $certificate): string
    {
        return config('app.url') . '/verify/' . $certificate->id;
    }

    public function generatePDF(Certificate $certificate): string
    {
        $data = [
            'certificate' => $certificate,
            'user' => $certificate->user,
            'lab' => $certificate->lab,
            'qr_code' => $this->generateQRCode($certificate),
            'verification_url' => $this->getVerificationUrl($certificate)
        ];

        $pdf = PDF::loadView('certificates.template', $data);
        
        $filename = "certificate_{$certificate->id}.pdf";
        $path = "certificates/{$certificate->user_id}/$filename";
        
        Storage::put($path, $pdf->output());
        
        return Storage::url($path);
    }

    protected function generateHash(string $userId, string $labId): string
    {
        return hash('sha256', $userId . $labId . now() . Str::random());
    }

    protected function generateQRCode(Certificate $certificate): string
    {
        return QrCode::format('svg')
            ->size(200)
            ->generate($this->getVerificationUrl($certificate));
    }
}