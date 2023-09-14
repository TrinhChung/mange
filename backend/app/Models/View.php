<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use HasFactory;

    protected $fillable = [
        'manga_id',
        'chapter_id',
        'user_id',
    ];

    public function manga()
    {
        return $this->belongsTo(Manga::class, 'manga_id', 'id');
    }
}
