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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('manga_id')->nullable()->constrained('mangas');
            $table->foreignId('chapter_id')->nullable()->constrained('chapters');
            $table->foreignId('user_id')->constrained('users');
            $table->text('comment');
            $table->foreignId('parent_id')->nullable()->constrained('comments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
