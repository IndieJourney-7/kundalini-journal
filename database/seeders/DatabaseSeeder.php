<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->admin()->create([
            'password' => Hash::make('admin123'),
        ]);

        // Create test practitioner
        User::factory()->create([
            'name' => 'Maya Devi',
            'email' => 'maya@example.com',
            'access_code' => 'GA-2026-A72',
            'tagline' => 'Awakening since 2023',
            'bio' => 'On a profound journey of self-discovery through kundalini meditation and daily journaling.',
        ]);

        User::factory()->create([
            'name' => 'Arjun Patel',
            'email' => 'arjun@example.com',
            'access_code' => 'GA-2026-B34',
            'tagline' => 'Seeker of Truth',
            'bio' => 'Exploring the depths of consciousness through ancient practices and modern reflection.',
        ]);

        User::factory()->create([
            'name' => 'Priya Sharma',
            'email' => 'priya@example.com',
            'access_code' => 'GA-2026-C91',
            'tagline' => 'Light Worker',
            'bio' => 'Dedicated to raising collective consciousness through awakened living.',
        ]);

        // Create a few more random practitioners
        User::factory(3)->create();
    }
}
