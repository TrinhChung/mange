<?php

namespace App\Traits;

trait TestHelper
{
    public function login_and_creat_token($user)
    {
        $token = $user->createToken('testuser')->plainTextToken;

        return $token;
    }
}
