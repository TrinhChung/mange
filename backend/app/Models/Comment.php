<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Auth;

class Comment extends Pivot
{
    use HasFactory;

    const LIKE = 1;

    const DISLIKE = -1;

    const NORMAL = 0;

    public $incrementing = true;

    protected $fillable = [
        'manga_id',
        'chapter_id',
        'user_id',
        'comment',
        'parent_id',
    ];

    protected $guarded = [];

    protected $hidden = [
        'sentiment_score',
        'sentiment_magnitude',
        'toxic',
        'insult',
        'profanity',
        'derogatory',
        'sexual',
        'death_harm_tragedy',
        'violent',
        'firearms_weapons',
        'public_safety',
        'health',
        'religion_belief',
        'illicit_drugs',
        'war_conflict',
        'politics',
        'finance',
        'legal',
    ];

    protected static function booted()
    {
        $user = Auth::guard('sanctum')->user();
        static::retrieved(function ($comment) use ($user) {
            $reaction = $comment->reacted_by;
            $likeCount = $reaction->where('pivot.like', Comment::LIKE)->count();
            $dislikeCount = $reaction->where('pivot.like', Comment::DISLIKE)->count();
            if ($user) {
                $checkLike = $reaction->where('id', $user->id)->first();
                if ($checkLike) {
                    $comment->is_like = $checkLike->pivot->like;
                }
            }

            $comment->like_count = $likeCount;
            $comment->dislike_count = $dislikeCount;
            unset($comment->reacted_by);
        });

        static::deleting(function ($comment) {
            React::where('comment_id', $comment->id)->delete();
            $comment->childs->each(function ($child) {
                $child->delete();
            });
        });
    }

    public function getCreatedAtAttribute($value)
    {
        return $this->asDateTime($value)->format('j/n/Y');
    }

    public function getUpdatedAtAttribute($value)
    {
        return $this->asDateTime($value)->format('j/n/Y');
    }

    protected $table = 'comments';

    public function reported_by(): MorphToMany
    {
        return $this->morphToMany(User::class, 'reportable');
    }

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

    public function manga()
    {
        return $this->belongsTo(Manga::class, 'manga_id', 'id');
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class, 'chapter_id', 'id');
    }
}
