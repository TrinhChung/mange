<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $user = $request->user;
        $user->tokens()->delete();
        $token = $user->createToken($user->username)->plainTextToken;

        return response()->json([
            'success' => 1,
            'message' => 'Đăng nhập thành công!',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ], 200);
    }

    public function signup(Request $request): JsonResponse
    {
        $fields = $this->validate($request, [
            'username' => 'required|string|unique:users,username|min:3|max:20',
            'email' => 'required|string|unique:users,email|email',
            'password' => 'required|string|min:6',
        ]);

        DB::beginTransaction();
        $user = User::create([
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => md5($fields['password']),
            'role' => 'user',
            'active_token' => hash_hmac('sha256', Str::random(10), config('app.key')),
        ]);

        $user->send_activation_email();

        $token = $user->createToken($user->username)->plainTextToken;
        DB::commit();

        return response()->json([
            'success' => 1,
            'message' => 'Đăng ký tài khoản thành công!',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'success' => 1,
            'message' => 'Đăng xuất thành công!',
        ], 200);
    }
}
