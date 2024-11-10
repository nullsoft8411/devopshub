<?php

use App\Http\Controllers\CertificateController;

// Certificate routes
Route::prefix('certificates')->group(function () {
    Route::get('/{id}/verify', [CertificateController::class, 'verify']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [CertificateController::class, 'generate']);
        Route::get('/{id}/download', [CertificateController::class, 'download']);
        Route::get('/user', [CertificateController::class, 'getUserCertificates']);
    });
});