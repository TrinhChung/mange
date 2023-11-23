<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->float('sentiment_score', 12, 9)->nullable()->change();
            $table->float('sentiment_magnitude', 12, 9)->nullable()->change();
            $table->float('toxic', 12, 9)->nullable()->change();
            $table->float('insult', 12, 9)->nullable()->change();
            $table->float('profanity', 12, 9)->nullable()->change();
            $table->float('derogatory', 12, 9)->nullable()->change();
            $table->float('sexual', 12, 9)->nullable()->change();
            $table->float('death_harm_tragedy', 12, 9)->nullable()->change();
            $table->float('violent', 12, 9)->nullable()->change();
            $table->float('firearms_weapons', 12, 9)->nullable()->change();
            $table->float('public_safety', 12, 9)->nullable()->change();
            $table->float('health', 12, 9)->nullable()->change();
            $table->float('religion_belief', 12, 9)->nullable()->change();
            $table->float('illicit_drugs', 12, 9)->nullable()->change();
            $table->float('war_conflict', 12, 9)->nullable()->change();
            $table->float('politics', 12, 9)->nullable()->change();
            $table->float('finance', 12, 9)->nullable()->change();
            $table->float('legal', 12, 9)->nullable()->change();
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
