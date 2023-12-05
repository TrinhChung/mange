<?php

namespace App\Jobs;

use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class GetCommentSentimentAndModeration implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Comment $comment;

    private array $MAP = [
        'Toxic' => 'toxic',
        'Insult' => 'insult',
        'Profanity' => 'profanity',
        'Derogatory' => 'derogatory',
        'Sexual' => 'sexual',
        'Death, Harm & Tragedy' => 'death_harm_tragedy',
        'Violent' => 'violent',
        'Firearms & Weapons' => 'firearms_weapons',
        'Public Safety' => 'public_safety',
        'Health' => 'health',
        'Religion & Belief' => 'religion_belief',
        'Illicit Drugs' => 'illicit_drugs',
        'War & Conflict' => 'war_conflict',
        'Politics' => 'politics',
        'Finance' => 'finance',
        'Legal' => 'legal',
    ];

    public function __construct(int $id)
    {
        $this->comment = Comment::find($id);
    }

    public function handle(): void
    {
        $key = config('google.api_key');
        $sentiment_url = config('google.url_sentiment').'?key='.$key;
        $moderate_url = config('google.url_moderate').'?key='.$key;

        // Tính sentiment (-1 đến 1)
        $sentiment_response = Http::post($sentiment_url, [
            'document' => [
                'type' => 'PLAIN_TEXT',
                'languageCode' => 'vi',
                'content' => $this->comment->comment,
            ],
            'encodingType' => 'UTF8',
        ]);

        $sentiment = $sentiment_response->json()['documentSentiment'];
        $this->comment->sentiment_score = $sentiment['score'];
        $this->comment->sentiment_magnitude = $sentiment['magnitude'];

        // Tính các moderation (0 đến 1)
        $moderate_response = Http::post($moderate_url, [
            'document' => [
                'type' => 'PLAIN_TEXT',
                'languageCode' => 'vi',
                'content' => $this->comment->comment,
            ],
        ]);

        $moderations = $moderate_response->json()['moderationCategories'];
        for ($i = 0; $i < count($moderations); $i++) {
            $this->comment->{$this->MAP[$moderations[$i]['name']]} = $moderations[$i]['confidence'];
        }

        // Tự block nếu sentiment < -0.8 và Toxic > 0.4
        if ($this->comment->sentiment_score < -0.8 && $this->comment->toxic > 0.4) {
            $this->comment->blocked = true;
        }

        // unset $comment->like_count, $comment->dislike_count, $comment->is_like nếu có
        unset($this->comment->like_count);
        unset($this->comment->dislike_count);
        unset($this->comment->is_like);

        $this->comment->save();
    }
}
