<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'username' => 'user',
            'role' => 'admin',
            'active' => true,
            'activated_at' => now(),
        ]);
        \App\Models\User::factory(100)->create();

        DB::beginTransaction();

        AuthorSeeder::run();
        CategorySeeder::run();
        MangaSeeder::run();

        DB::commit();
    }
}
