<?php

namespace App\Policies;

use App\Models\TranslateRequireForm;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FormPolicy
{
    /**
     * Create a new policy instance.
     */
    public function updateForm(User $user, TranslateRequireForm $form)
    {
        if ($user->id === $form->user->id || $user->role === 'admin') {
            return Response::allow();
        }

        return Response::deny('Không được phép cập nhật thông tin này');
    }

    public function accessOrRefuseForm(User $user, TranslateRequireForm $form)
    {
        if ($user->role === 'admin') {
            return Response::allow();
        }

        return Response::deny('Không được phép cập nhật thông tin này');
    }
}
