<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    protected $fillable = [
        'user_id',
        'lab_id',
        'certificate_hash',
        'score',
        'time_taken',
        'completed_tasks',
        'issued_at',
        'verification_code'
    ];

    protected $casts = [
        'completed_tasks' => 'array',
        'issued_at' => 'datetime',
        'score' => 'integer'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lab(): BelongsTo
    {
        return $this->belongsTo(Lab::class);
    }

    public function generateVerificationCode(): string
    {
        $code = bin2hex(random_bytes(16));
        $this->verification_code = $code;
        $this->save();
        return $code;
    }

    public function verify(string $code): bool
    {
        return $this->verification_code === $code;
    }
}