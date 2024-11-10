<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->string('certificate_hash')->unique()->after('id');
            $table->string('verification_code')->unique()->after('certificate_hash');
            $table->integer('score');
            $table->string('time_taken');
            $table->json('completed_tasks');
            $table->timestamp('issued_at');
            $table->boolean('revoked')->default(false);
            $table->timestamp('revoked_at')->nullable();
            $table->string('revocation_reason')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn([
                'certificate_hash',
                'verification_code',
                'score',
                'time_taken',
                'completed_tasks',
                'issued_at',
                'revoked',
                'revoked_at',
                'revocation_reason'
            ]);
        });
    }
};