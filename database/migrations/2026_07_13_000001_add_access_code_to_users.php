<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('access_code', 20)->unique()->nullable()->after('email');
            $table->boolean('is_admin')->default(false)->after('password');
            $table->string('tagline')->nullable()->after('name');
            $table->text('bio')->nullable()->after('tagline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['access_code', 'is_admin', 'tagline', 'bio']);
        });
    }
};
