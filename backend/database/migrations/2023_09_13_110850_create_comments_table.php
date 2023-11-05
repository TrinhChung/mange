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

            $table->float('sentiment_score')->nullable();
            $table->float('sentiment_magnitude')->nullable();
            $table->float('toxic')->nullable();
            $table->float('insult')->nullable();
            $table->float('profanity')->nullable();
            $table->float('derogatory')->nullable();
            $table->float('sexual')->nullable();
            $table->float('death_harm_tragedy')->nullable();
            $table->float('violent')->nullable();
            $table->float('firearms_weapons')->nullable();
            $table->float('public_safety')->nullable();
            $table->float('health')->nullable();
            $table->float('religion_belief')->nullable();
            $table->float('illicit_drugs')->nullable();
            $table->float('war_conflict')->nullable();
            $table->float('politics')->nullable();
            $table->float('finance')->nullable();
            $table->float('legal')->nullable();

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
