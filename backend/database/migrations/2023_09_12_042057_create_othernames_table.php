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
        Schema::create('othernames', function (Blueprint $table) {
            $table->id();
            $table->foreignId('manga_id')->constrained('mangas');
            $table->string('name', 100);
            $table->timestamps();

            $table->index(['name'], 'othernames_name_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('othernames');
    }
};
