<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'access_code',
        'is_admin',
        'tagline',
        'bio',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'access_code',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    /**
     * Find a user by their access code (case-insensitive).
     */
    public static function findByAccessCode(string $code): ?self
    {
        return static::whereRaw('LOWER(access_code) = ?', [strtolower(trim($code))])->first();
    }

    /**
     * Generate a unique access code.
     */
    public static function generateAccessCode(): string
    {
        $prefix = 'GA';
        $year = date('Y');
        
        do {
            $suffix = strtoupper(substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), 0, 6));
            $code = "{$prefix}-{$year}-{$suffix}";
        } while (static::where('access_code', $code)->exists());

        return $code;
    }
}
