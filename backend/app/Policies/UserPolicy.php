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
        return Response::deny('You must be an administrator.');
    }

    public function view(User $user, User $viewedUser): Response
    {
        return $user->id === $viewedUser->id
            ? Response::allow()
            : Response::deny('You can only view your own profile.');
    }
}
