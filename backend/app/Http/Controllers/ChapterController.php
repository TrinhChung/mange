<?php

namespace App\Http\Controllers;

use App\Http\Resources\Chapter as ChapterResources;
use App\Models\Chapter;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    //
    public function show(Request $request)
    {
        $request->merge(['id' => $request->route('chapter_id')]);
        $fields = $this->validate($request, [
            'id' => 'required|integer|min:1',
        ]);
        $chapter = Chapter::query()->with('images')->with('commented_by')->with('manga')
            ->findOrFail($fields['id']);

        return response()->json([
            'success' => 1,
            'data' => new ChapterResources($chapter),
            'message' => 'get chapter data success',
        ], 200);
    }
}
