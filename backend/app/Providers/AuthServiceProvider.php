<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Manga;
use App\Models\TranslateRequireForm;
use App\Models\User;
use App\Policies\FormPolicy;
use App\Policies\MangaPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Manga::class => MangaPolicy::class,
        TranslateRequireForm::class => FormPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
