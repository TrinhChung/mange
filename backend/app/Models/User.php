<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Jobs\SendResetPasswordMail;
use App\Jobs\SendWelcomeEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'avatar',
        'role',
        'active',
        'activated_at',
        'active_token',
        'reset_token',
        'reset_sent_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function send_activation_email()
    {
        if (SendWelcomeEmail::dispatch($this)->onQueue('sendingMail')->delay(now()->addMinutes(0.05))) {
            error_log('added');
        }
    }

    public function send_reset_password_email()
    {
        if (SendResetPasswordMail::dispatch($this)->onQueue('sendingMail')->delay(now()->addMinutes(0.05))) {
            error_log('added');
        }
    }

    public function voted_mangas()
    {
        return $this->belongsToMany(Manga::class, 'votes', 'user_id', 'manga_id')
            ->using(Vote::class)->withPivot('id', 'user_id', 'manga_id', 'score')->withTimestamps();
    }

    public function bookmarked_mangas()
    {
        return $this->belongsToMany(Manga::class, 'bookmarks', 'user_id', 'manga_id')
            ->using(Bookmark::class)->withPivot('id', 'user_id', 'manga_id')->withTimestamps();
    }

    public function reacted_comments()
    {
        return $this->belongsToMany(Comment::class, 'reacts', 'user_id', 'comment_id')
            ->using(React::class)->withPivot('id', 'user_id', 'comment_id', 'like')->withTimestamps();
    }

    public function commented_mangas()
    {
        return $this->belongsToMany(Manga::class, 'comments', 'user_id', 'manga_id')
            ->using(Comment::class)->withPivot('id', 'user_id', 'manga_id', 'comment', 'parent_id')->withTimestamps();
    }

    public function commented_chapters()
    {
        return $this->belongsToMany(Chapter::class, 'comments', 'user_id', 'chapter_id')
            ->using(Comment::class)->withPivot('id', 'user_id', 'manga_id', 'chapter_id', 'comment', 'parent_id')->withTimestamps();
    }

    public function managing_mangas()
    {
        return $this->belongsToMany(Manga::class, 'manages', 'user_id', 'manga_id')
            ->using(Manage::class)->withPivot('id', 'user_id', 'manga_id', 'role_activated')->withTimestamps();
    }

    public function viewed_chapters()
    {
        return $this->belongsToMany(Chapter::class, 'views', 'user_id', 'chapter_id')
            ->using(View::class)->withPivot('id', 'user_id', 'chapter_id', 'manga_id')->withTimestamps();
    }
}
