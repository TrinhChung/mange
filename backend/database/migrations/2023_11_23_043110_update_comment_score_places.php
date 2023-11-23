<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->double('sentiment_score', 15, 8)->nullable()->change();
            $table->double('sentiment_magnitude', 15, 8)->nullable()->change();
            $table->double('toxic', 15, 8)->nullable()->change();
            $table->double('insult', 15, 8)->nullable()->change();
            $table->double('profanity', 15, 8)->nullable()->change();
            $table->double('derogatory', 15, 8)->nullable()->change();
            $table->double('sexual', 15, 8)->nullable()->change();
            $table->double('death_harm_tragedy', 15, 8)->nullable()->change();
            $table->double('violent', 15, 8)->nullable()->change();
            $table->double('firearms_weapons', 15, 8)->nullable()->change();
            $table->double('public_safety', 15, 8)->nullable()->change();
            $table->double('health', 15, 8)->nullable()->change();
            $table->double('religion_belief', 15, 8)->nullable()->change();
            $table->double('illicit_drugs', 15, 8)->nullable()->change();
            $table->double('war_conflict', 15, 8)->nullable()->change();
            $table->double('politics', 15, 8)->nullable()->change();
            $table->double('finance', 15, 8)->nullable()->change();
            $table->double('legal', 15, 8)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->float('sentiment_score')->nullable()->change();
            $table->float('sentiment_magnitude')->nullable()->change();
            $table->float('toxic')->nullable()->change();
            $table->float('insult')->nullable()->change();
            $table->float('profanity')->nullable()->change();
            $table->float('derogatory')->nullable()->change();
            $table->float('sexual')->nullable()->change();
            $table->float('death_harm_tragedy')->nullable()->change();
            $table->float('violent')->nullable()->change();
            $table->float('firearms_weapons')->nullable()->change();
            $table->float('public_safety')->nullable()->change();
            $table->float('health')->nullable()->change();
            $table->float('religion_belief')->nullable()->change();
            $table->float('illicit_drugs')->nullable()->change();
            $table->float('war_conflict')->nullable()->change();
            $table->float('politics')->nullable()->change();
            $table->float('finance')->nullable()->change();
            $table->float('legal')->nullable()->change();
        });
    }
};
