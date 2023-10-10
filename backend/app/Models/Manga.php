<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manga extends Model
{
    use HasFactory;

    const STATUS_ONGOING = 0;
    const STATUS_COMPLETED = 1;

    protected $fillable = [
        'name',
        'status',
        'description',
        'thumbnail',
        'view',
    ];

    public function othernames()
    {
        return $this->hasMany(Othername::class, 'manga_id', 'id');
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class, 'manga_id', 'id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'manga_categories', 'manga_id', 'category_id')
            ->using(MangaCategory::class)->withPivot('id', 'manga_id', 'category_id')->withTimestamps();
    }

    public function views()
    {
        return $this->hasMany(View::class, 'manga_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'manga_id', 'id');
    }

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'author_mangas', 'manga_id', 'author_id')
            ->using(AuthorManga::class)->withPivot('id', 'manga_id', 'author_id')->withTimestamps();
    }

    public function voted_by()
    {
        return $this->belongsToMany(User::class, 'votes', 'manga_id', 'user_id')
            ->using(Vote::class)->withPivot('id', 'user_id', 'manga_id', 'score')->withTimestamps();
    }

    public function bookmarked_by()
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'manga_id', 'user_id')
            ->using(Bookmark::class)->withPivot('id', 'user_id', 'manga_id')->withTimestamps();
    }

    public function commented_by()
    {
        return $this->belongsToMany(User::class, 'comments', 'manga_id', 'user_id')
            ->using(Comment::class)->withPivot('id', 'user_id', 'manga_id', 'comment', 'parent_id')->withTimestamps();
    }

    public function managed_by()
    {
        return $this->belongsToMany(User::class, 'manages', 'manga_id', 'user_id')
            ->using(Manage::class)->withPivot('id', 'user_id', 'manga_id', 'role_activated')->withTimestamps();
    }
}
