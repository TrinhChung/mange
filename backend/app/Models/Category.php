<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function mangas()
    {
        return $this->belongsToMany(Category::class, 'manga_categories', 'category_id', 'manga_id')
            ->using(MangaCategory::class)->withPivot('id', 'manga_id', 'category_id')->withTimestamps();
    }
}
