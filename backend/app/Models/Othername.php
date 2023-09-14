<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Othername extends Model
{
    use HasFactory;

    protected $fillable = [
        'manga_id',
        'name',
    ];

    public function Manga()
    {
        return $this->belongsTo(Manga::class, 'manga_id', 'id');
    }
}
