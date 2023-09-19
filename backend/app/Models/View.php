<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class View extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'manga_id',
        'chapter_id',
        'user_id',
    ];

    protected $table = 'views';

    public function manga()
    {
        return $this->belongsTo(Manga::class, 'manga_id', 'id');
    }
}
