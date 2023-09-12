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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('avatar')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->comment('md5');
            $table->enum('role', ['admin', 'user', 'translator']);
            $table->boolean('active')->default(false);
            $table->dateTime('activated_at')->nullable();
            $table->string('active_token', 20);
            $table->string('reset_token', 20)->nullable();
            $table->dateTime('reset_sent_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->index(['username', 'password']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
