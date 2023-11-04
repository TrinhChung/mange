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
            $table->string('slug')->unique();
            $table->boolean('status');
            $table->text('description');
            $table->text('thumbnail', 100);
            $table->integer('view')->default(0);
            $table->timestamps();

            $table->index(['updated_at'], 'mangas_updated_at_index');
            $table->index(['name'], 'mangas_name_index');
            $table->index(['slug'], 'mangas_slug_index');

            //            if (env('DB_CONNECTION') === 'mysql') {
            //                DB::statement('ALTER TABLE mangas ADD FULLTEXT INDEX mangas_name_fulltext_index (name)');
            //            }
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
