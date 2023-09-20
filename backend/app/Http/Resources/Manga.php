<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Manga extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'thumbnail' => $this->thumbnail,
            'vote_score' => $this->vote_score,
            'follow_count' => $this->follow_count,
            'view_count' => $this->view_count,
            'comments_count' => $this->comment_count,
            'last_3_chapters' => $this->chapters->sortByDesc('id')->take(3)->values()->map(function ($chapter) {
                return [
                    'id' => $chapter->id,
                    'name' => $chapter->name,
                    'folder' => $chapter->folder,
                    'amount' => $chapter->amount,
                ];
            }),
            'categories' => $this->categories->pluck('name'),
            'othernames' => $this->othernames,
        ];
    }
}
