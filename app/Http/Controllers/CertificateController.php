<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\CertificateService;
use Illuminate\Support\Facades\Cache;

class CertificateController extends Controller
{
    protected $certificateService;

    public function __construct(CertificateService $certificateService)
    {
        $this->certificateService = $certificateService;
    }

    public function verify(string $id): JsonResponse
    {
        $certificate = Certificate::with(['user:id,name', 'lab:id,title,description,difficulty'])
            ->findOrFail($id);

        // Cache verification result for 5 minutes
        $cacheKey = "certificate_verification_{$id}";
        $verificationData = Cache::remember($cacheKey, 300, function () use ($certificate) {
            return [
                'certificate' => [
                    'id' => $certificate->id,
                    'userId' => $certificate->user_id,
                    'labId' => $certificate->lab_id,
                    'score' => $certificate->score,
                    'timeTaken' => $certificate->time_taken,
                    'issuedAt' => $certificate->issued_at,
                    'completedTasks' => $certificate->completed_tasks
                ],
                'user' => [
                    'name' => $certificate->user->name
                ],
                'lab' => [
                    'title' => $certificate->lab->title,
                    'description' => $certificate->lab->description,
                    'difficulty' => $certificate->lab->difficulty
                ]
            ];
        });

        return response()->json($verificationData);
    }

    public function generate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'lab_id' => 'required|exists:labs,id',
            'score' => 'required|integer|min:0|max:100',
            'time_taken' => 'required|string',
            'completed_tasks' => 'required|array'
        ]);

        $certificate = $this->certificateService->generateCertificate(
            $request->user(),
            $validated['lab_id'],
            $validated['score'],
            $validated['time_taken'],
            $validated['completed_tasks']
        );

        return response()->json([
            'certificate' => $certificate,
            'verification_url' => $this->certificateService->getVerificationUrl($certificate)
        ], 201);
    }

    public function download(string $id): JsonResponse
    {
        $certificate = Certificate::with(['user', 'lab'])->findOrFail($id);
        
        if ($certificate->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $pdfUrl = $this->certificateService->generatePDF($certificate);

        return response()->json(['pdf_url' => $pdfUrl]);
    }

    public function getUserCertificates(Request $request): JsonResponse
    {
        $certificates = Certificate::with(['lab:id,title,difficulty'])
            ->where('user_id', $request->user()->id)
            ->orderBy('issued_at', 'desc')
            ->get();

        return response()->json($certificates);
    }
}