<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

trait AuthTrait
{
    public function getUser(Request $request)
    {
        $user = null;
        if ($request->bearerToken()) {
            $user = Auth::guard('sanctum')->user();
        }

        return $user;
    }
}
