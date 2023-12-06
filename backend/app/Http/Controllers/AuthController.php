<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
                'token' => null,
            ],
        ], 201);
    }

    public function reset_password(Request $request)
    {
        $fields = $this->validate($request, [
            'email' => 'required|string|email',
        ]);

        $user = User::where('email', $fields['email'])->where('active', 1)->first();
        if (! $user) {
            return response()->json([
                'success' => 0,
                'message' => 'user not found',
            ], 404);
        }
        DB::beginTransaction();
        $user->update([
            'reset_sent_at' => Carbon::now(),
            'reset_token' => hash_hmac('sha256', Str::random(15), config('app.key')),
        ]);
        $user->send_reset_password_email();
        DB::commit();

        return response()->json([
            'success' => 1,
            'message' => 'Yêu cầu tạo mới mật khẩu thành công',
        ], 200);
    }

    public function update_password(Request $request)
    {
        $fields = $this->validate($request, [
            'reset_token' => 'required|string',
            'password' => 'required|string|min:6',
            'password_confirm' => 'required|string|min:6',
        ]);

        $user = User::where('reset_token', $fields['reset_token'])->where('active', 1)->first();
        if (! $user) {
            return response()->json([
                'success' => 0,
                'message' => 'user not found',
            ], 404);
        }
        if ($user->reset_sent_at && Carbon::now()->diffInMinutes(Carbon::parse($user->reset_sent_at)) > 10) {
            return response()->json([
                'success' => 0,
                'message' => 'Token quá hạn',
            ], 503);
        }
        if ($fields['password'] !== $fields['password_confirm']) {
            return response()->json([
                'success' => 0,
                'message' => 'Mật khẩu mới không trùng khớp',
            ], 422);
        }
        $user->update([
            'password' => md5($fields['password']),
        ]);

        return response()->json([
            'success' => 1,
            'message' => 'Mật khẩu đã được tạo mới',
        ], 200);
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
