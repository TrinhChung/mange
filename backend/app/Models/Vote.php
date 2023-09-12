<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Vote extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'manga_id',
        'user_id',
        'score',
    ];
}
