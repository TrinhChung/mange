<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Comment extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'manga_id',
        'chapter_id',
        'user_id',
        'comment',
        'parent_id',
    ];

    protected $table = 'comments';

    public function childs()
    {
        return $this->hasMany(Comment::class, 'parent_id', 'id')->with('childs', 'user');
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function reacted_by()
    {
        return $this->belongsToMany(User::class, 'reacts', 'comment_id', 'user_id')
            ->using(React::class)->withPivot('id', 'user_id', 'comment_id', 'like')->withTimestamps();
    }
}
