<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Rules\Reaction;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //

    public function create(Request $request)
    {
        $request->merge(['manga_id' => $request->route('manga_id')]);
        $request->merge(['chapter_id' => $request->route('chapter_id')]);

        $fields = $this->validate($request, [
            'manga_id' => 'required_without:chapter_id|nullable|integer|min:1',
            'chapter_id' => 'required_without:manga_id|nullable|integer|min:1',
            'parent_id' => 'nullable|integer|min:1',
            'comment' => 'required|string',
        ]);

        // only allow account that has been activated longer than 1 day
        if ($request->user()->activated_at->diffInDays(now()) < 1) {
            return response()->json([
                'success' => 0,
                'message' => 'Bạn phải chờ 1 ngày sau khi kích hoạt tài khoản để có thể comment',
            ], 403);
        }

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'manga_id' => $fields['manga_id'],
            'chapter_id' => $fields['chapter_id'],
            'parent_id' => $fields['parent_id'],
            'comment' => $fields['comment'],
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
        $request->merge(['manga_id' => $request->route('manga_id')]);
        $request->merge(['chapter_id' => $request->route('chapter_id')]);

        $fields = $this->validate($request, [
            'manga_id' => 'required_without:chapter_id|nullable|integer|min:1',
            'chapter_id' => 'required_without:manga_id|nullable|integer|min:1',
        ]);

        $comments = Comment::query()->whereNull('parent_id');

        if ($fields['manga_id']) {
            $comments->where('manga_id', $request->manga_id);
        } elseif ($fields['chapter_id']) {
            $comments->where('chapter_id', $request->chapter_id);
        }

        $data = $comments->with('childs', 'user')->get();

        if ($data->isEmpty()) {
            throw new ModelNotFoundException();
        }

        return response()->json([
            'success' => 1,
            'data' => $data,
            'message' => 'Lấy comment thành công',
        ]);
    }

    public function react(Request $request)
    {
        $request->merge(['comment_id' => $request->id]);
        $user = $request->user();

        $fields = $this->validate($request, [
            'comment_id' => 'required|min:1',
            'reaction' => ['required', 'integer', new Reaction],
        ]);

        $reaction = $fields['reaction'];

        if ($reaction === Comment::NORMAL) {
            $user->reacted_comments()->detach($fields['comment_id']);
        } else {
            $user->reacted_comments()->syncWithoutDetaching([
                $fields['comment_id'] => ['like' => $reaction, 'created_at' => now()],
            ]);
        }

        return response()->json([
            'success' => 1,
            'message' => 'Đã'.($reaction === 0 ? ' hủy' : '').' react thành công',
            'data' => [
                'reaction' => $user->reacted_comments()->where('comment_id', $fields['comment_id'])->value('like'),
            ],
        ], 200);
    }
}
