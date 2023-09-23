<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //

    public function create(Request $request)
    {
        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'manga_id' => $request->manga_id,
            'chapter_id' => $request->chapter_id,
            'parent_id' => $request->parent_id,
            'comment' => $request->comment,
        ]);

        $comment->user;
        $comment->childs;

        return response()->json([
            'success' => 1,
            'data' => $comment,
            'message' => 'commented',
        ]);
    }

    public function getAllComment(Request $request)
    {
        $comments = Comment::query()->whereNull('parent_id');

        if ($request->manga_id) {
            $comments->where('manga_id', $request->manga_id);
        } elseif ($request->chapter_id) {
            $comments->where('chapter_id', $request->chapter_id);
        }

        $data = $comments->with('childs', 'user')->get();

        return response()->json([
            'success' => 1,
            'data' => $data,
            'message' => 'get comments success',
        ]);
    }
}
