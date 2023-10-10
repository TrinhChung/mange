<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'manga_id',
        'name',
        'folder',
        'amount',
    ];

    public function manga()
    {
        return $this->belongsTo(Manga::class, 'manga_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(Image::class, 'chapter_id', 'id');
    }

    public function commented_by()
    {
        return $this->belongsToMany(User::class, 'comments', 'chapter_id', 'user_id')
            ->using(Comment::class)->withPivot('id', 'user_id', 'manga_id', 'chapter_id', 'comment', 'parent_id')->withTimestamps();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'chapter_id', 'id');
    }

    public function viewed_by()
    {
        return $this->belongsToMany(User::class, 'views', 'chapter_id', 'user_id')
            ->using(View::class)->withPivot('id', 'user_id', 'chapter_id', 'manga_id')->withTimestamps();
    }

    public function getNumber()
    {
        return (int) explode('/', $this->folder)[1];
    }
}
