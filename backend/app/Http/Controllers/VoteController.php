<?php

namespace App\Http\Controllers;

use App\Rules\VoteScore;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function vote(Request $request): JsonResponse
    {
        $request->merge(['manga_id' => $request->route('manga_id')]);
        $fields = $this->validate($request, [
            'manga_id' => 'required|integer|min:1|exists:mangas,id',
            'score' => ['required', new VoteScore],
        ]);

        $manga_id = $fields['manga_id'];
        $vote_score = (float) $fields['score'];
        $user = $request->user();

        $user->voted_mangas()->syncWithoutDetaching([
            $manga_id => [
                'score' => $vote_score,
                'created_at' => now(),
            ],
        ]);

        return response()->json([
            'success' => 1,
            'message' => 'Đã vote thành công',
            'data' => [
                'score' => $user->voted_mangas()->where('manga_id', $manga_id)->value('score'),
            ],
        ], 200);
    }
}
