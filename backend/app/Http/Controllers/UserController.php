<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Trả về thông tin của user đang đăng nhập.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        return response()->json([
            'success' => 1,
            'user' => $request->user(),
        ], 200);
    }

    public function activate(Request $request)
    {
        $user = User::where('active_token', $request->active_token)->first();
        if ($user && $user->active == false) {
            $user->update([
                'activated_at' => now(),
                'active' => true,
            ]);

            return view('account.verificationDone')->with('user', $user);
        } else {
            return view('account.invalidActiveToken');
        }
    }

    public function requestResetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user && $user->reset_sent_at) {
            $sent_at = Carbon::parse($user->reset_sent_at);
            $now = Carbon::parse(now());
            if ($sent_at->diffInMinutes($now) > 10) {
                return response()->json([
                    'user' => $user,
                    'message' => 'token đã quá hạn 10 phút sử dụng',
                ], 200);
            }
        }
        if ($user && $user->active) {
            DB::beginTransaction();
            $user->update([
                'reset_token' => hash_hmac('sha256', Str::random(10), config('app.key')),
                'reset_sent_at' => now(),
            ]);

            $user->send_reset_password_email();
            DB::commit();

            return response()->json([
                'user' => $user,
            ], 200);
        }
    }
}
