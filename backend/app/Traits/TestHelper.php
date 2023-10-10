<?php

namespace App\Traits;

trait TestHelper
{
    public function login_and_creat_token($user)
    {
        $token = $user->createToken('testuser')->plainTextToken;

        return $token;
    }

    public function create_activated_user()
    {
        return \App\Models\User::factory()->create([
            'active' => true,
            'activated_at' => now(),
        ]);
    }

    public function create_admin()
    {
        return \App\Models\User::factory()->create([
            'active' => true,
            'activated_at' => now(),
            'role' => 'admin',
        ]);
    }
}
