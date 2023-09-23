<?php

namespace App\Http\Controllers;

use App\Http\Resources\Chapter as ChapterResources;
use App\Models\Chapter;
use App\Models\Manga;
use App\Models\View;
use App\Traits\AuthTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ChapterController extends Controller
{
    //
    use AuthTrait;

    public function show(Request $request)
    {
        $user = $this->getUser($request);

        $request->merge(['id' => $request->route('chapter_id')]);
        $fields = $this->validate($request, [
            'id' => 'required|integer|min:1',
        ]);

        $chapter = Chapter::query()
            ->with('images')
            ->with('manga')
            ->findOrFail($fields['id']);
        $chapter = new ChapterResources($chapter);

        if (! Redis::exists("{$request->ip()}_{$chapter['manga']['id']}")) {
            if ($user) {
                View::create([
                    'user_id' => $user->id,
                    'manga_id' => $chapter['manga']['id'],
                    'chapter_id' => $chapter['id'],
                ]);
            }
            Redis::setex($request->ip()."_{$chapter['manga']['id']}", 120, 1);
            Manga::where('id', $chapter['manga']['id'])->update(['view' => $chapter['manga']['view'] + 1]);
        }

        return response()->json([
            'success' => 1,
            'data' => $chapter,
            'message' => 'get chapter data success',
        ], 200);
    }
}
