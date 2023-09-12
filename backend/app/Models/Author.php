<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function mangas()
    {
        return $this->belongsToMany(Manga::class, 'author_mangas', 'author_id', 'manga_id')
            ->using(AuthorManga::class)->withPivot('id', 'manga_id', 'author_id')->withTimestamps();
    }
}
