<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

trait AuthTrait
{
    public function getUser(Request $request)
    {
        return Auth::guard('sanctum')->user();
    }
}
