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
        Schema::create('mangas', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->boolean('status');
            $table->text('description');
            $table->text('thumbnail', 100);
            $table->integer('view')->default(0);
            $table->timestamps();

            $table->index(['updated_at'], 'mangas_updated_at_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mangas');
    }
};
