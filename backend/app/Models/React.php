<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class React extends Pivot
{
    use HasFactory;

    protected $table = 'reacts';

    protected $fillable = [
        'comment_id',
        'user_id',
        'like',
    ];
}
