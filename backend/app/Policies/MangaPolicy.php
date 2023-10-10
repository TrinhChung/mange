<?php

namespace App\Policies;

use App\Models\Manga;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MangaPolicy
{
    public function before(User $user): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    public function updateManga(User $user, Manga $manga): Response
    {
        return $manga->managed_by()->where('user_id', $user->id)->exists()
            ? Response::allow()
            : Response::deny('Không có quyền chỉnh sửa truyện này.');
    }
}
