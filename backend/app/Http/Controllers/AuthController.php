<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $fields['username'])
            ->where('password', md5($fields['password']))
            ->first();

        if (! $user) {
            return response()->json([
                'message' => 'Incorrect username or password',
            ], 401);
        }

        $user->tokens()->delete();
        $token = $user->createToken($user->username)->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function signup(Request $request): JsonResponse
    {
        $fields = $this->validate($request, [
            'username' => 'required|string|unique:users,username|min:3|max:20',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => md5($fields['password']),
        ]);

        $token = $user->createToken($user->username)->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ], 200);
    }
}
