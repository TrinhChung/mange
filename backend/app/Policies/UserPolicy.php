<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function before(User $user): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): Response
    {
        return Response::deny('Chỉ admin mới được truy cập chức năng này.');
    }

    public function view(User $user, User $viewedUser): Response
    {
        return $user->id === $viewedUser->id
            ? Response::allow()
            : Response::deny('Không được phép xem thông tin này.');
    }

    public function update(User $user, User $viewedUser): Response
    {
        return Response::deny('Không được phép cập nhật thông tin này.');
    }
}
