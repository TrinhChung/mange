<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Activation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $fields['username'])->where('password', md5($fields['password']))->first();
        if (! $user) {
            return response()->json([
                'success' => 0,
                'message' => 'Incorrect username or password',
            ], 401);
        }

        if ($user->active != 1) {
            return response()->json([
                'success' => 0,
                'message' => 'User not active',
            ], 401);
        }
        $request->merge(['user' => $user]);

        return $next($request);
    }
}
