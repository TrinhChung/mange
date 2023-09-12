<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'username' => 'testuser',
        //     'email' => 'test@example.com',
        //     'password' => md5('111111'),
        // ]);

        // \App\Models\User::factory()->create([
        //     'username' => 'admin',
        //     'email' => 'admin@example.com',
        //     'password' => md5('111111'),
        // ]);

        AuthorSeeder::run();
        CategorySeeder::run();
        MangaSeeder::run();
    }
}
