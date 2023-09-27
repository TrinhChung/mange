<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function before(User $user): ?bool
    {
        error_log($user->username);
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): Response
    {
        return $user->isAdmin()
            ? Response::allow()
            : Response::deny('You must be an administrator.');
    }

    public function view(User $user, User $viewedUser): Response
    {
        return $user->id === $viewedUser->id
            ? Response::allow()
            : Response::deny('You are not allowed to see this profile.');
    }
}
