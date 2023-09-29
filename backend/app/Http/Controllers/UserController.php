<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | CHỈ DÀNH CHO ADMIN
    |--------------------------------------------------------------------------
    */
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', User::class);

        $fields = $this->validate($request, [
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
        ]);

        $per_page = $fields['per_page'] ?? 10;
        $page = $fields['page'] ?? 1;

        $users = User::query()->select(['id', 'username', 'email', 'role', 'active', 'updated_at'])
            ->paginate($per_page, ['*'], 'page', $page);

        return response()->json([
            'success' => 1,
            'data' => $users,
        ], 200);
    }

    public function show($user_id, Request $request): JsonResponse
    {
        $user = User::findOrFail($user_id);
        $this->authorize('view', $user);

        return response()->json([
            'success' => 1,
            'data' => $user,
        ], 200);
    }

    public function patch($user_id, Request $request): JsonResponse
    {
        $user = User::findOrFail($user_id);
        $this->authorize('update', $user);

        $fields = $this->validate($request, [
            'username' => 'string|unique:users,username,'.$user->id,
            'email' => 'string|email|unique:users,email,'.$user->id,
            'password' => 'string|min:6',
            'role' => 'string|in:admin,translator,user',
            'active' => 'boolean',
        ]);

        if (isset($fields['password'])) {
            $fields['password'] = md5($fields['password']);
        }
        $user->update($fields);

        return response()->json([
            'success' => 1,
            'data' => $user,
        ], 200);
    }

    public function updateUserAvatar($user_id, Request $request): JsonResponse
    {
        $user = User::findOrFail($user_id);
        $this->authorize('update', $user);

        $fields = $this->validate($request, [
            'avatar' => 'required|image|max:10240',
        ]);

        $user = $this->handleUpdateAvatar($user, $fields['avatar']);

        return response()->json([
            'success' => 1,
            'data' => $user,
        ], 200);

    }

    /*
    |--------------------------------------------------------------------------
    | CHO MỌI USER
    |--------------------------------------------------------------------------
    */
    public function me(Request $request)
    {
        return response()->json([
            'success' => 1,
            'data' => $request->user(),
        ], 200);
    }

    /**
     * Cập nhật thông tin của user đang đăng nhập.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function patchMe(Request $request)
    {
        // Có thể gửi trùng email lại của mình
        // nhưng không được trùng với email của user khác
        $fields = $this->validate($request, [
            'email' => [
                'string',
                'unique:users,email,'.$request->user()->id,
                'email',
            ],
            'password' => 'string|min:6',
        ]);

        if (isset($fields['password'])) {
            $fields['password'] = md5($fields['password']);
        }

        $user = $request->user();
        $user->update($fields);

        return response()->json([
            'success' => 1,
            'data' => $user,
        ], 200);
    }

    public function updateMyAvatar(Request $request)
    {
        $fields = $this->validate($request, [
            'avatar' => 'required|image|max:10240',
        ]);

        $user = $this->handleUpdateAvatar($request->user(), $fields['avatar']);

        return response()->json([
            'success' => 1,
            'data' => $user,
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

    /*
    |--------------------------------------------------------------------------
    | HELPER
    |--------------------------------------------------------------------------
    */
    private function handleUpdateAvatar(User $user, $avatar): User
    {
        // Xóa ảnh cũ trong storage nếu có
        if ($user->avatar) {
            $path = 'public/avatars/'.$user->avatar;
            if (Storage::exists($path)) {
                Storage::delete($path);
            }
        }

        DB::beginTransaction();
        $fileName = $user->id.'_'.time().'.'.$avatar->extension();
        $avatar->storeAs('public/avatars', $fileName);
        $user->update([
            'avatar' => $fileName,
        ]);
        DB::commit();

        return $user;
    }
}
