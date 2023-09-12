<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class AuthorManga extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'manga_id',
    ];
}
