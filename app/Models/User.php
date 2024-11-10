<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function enrolledCourses()
    {
        return $this->belongsToMany(Course::class, 'course_user')
            ->withTimestamps();
    }

    public function completedLessons()
    {
        return $this->belongsToMany(Lesson::class, 'lesson_user')
            ->withTimestamps();
    }

    public function labProgress()
    {
        return $this->hasMany(LabProgress::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}