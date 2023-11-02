<?php

namespace App\Http\Controllers;

use App\Http\Resources\MangaCollection;
use App\Models\Manga;
use App\Traits\AuthTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MangaController extends Controller
{
    use AuthTrait;

    const REPORT_LIMIT = 100;

    public function index(Request $request)
    {
        $fields = $this->validate($request, [
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
            'category' => 'array',
            'search' => 'string',
            'status' => 'integer|in:0,1',
            'sort' => [
                'string',
                'regex:/^([+-]?)(updated_at|follow_count|view_count|comment_count|vote_score|status)$/',
            ],
        ], [
            'sort.regex' => 'The sort field must be one of: updated_at, follow_count, view_count, comment_count, vote_score, status',
        ]);

        $per_page = $fields['per_page'] ?? 10;
        $page = $fields['page'] ?? 1;
        $category_ids = $fields['category'] ?? [];
        $search_query = $fields['search'] ?? '';
        $status = $fields['status'] ?? null;
        $sort = $fields['sort'] ?? '-updated_at';

        $query = Manga::query()->select(['id', 'name', 'slug', 'thumbnail', 'view as view_count', 'status'])
            ->with(['chapters', 'categories', 'othernames', 'authors'])
            ->withCount(['bookmarked_by as follow_count', 'comments as comment_count']);

        // Tìm kiếm theo `tên` hoặc `tên khác` hoặc slug chứa
        $words = explode(' ', $search_query);
        if (! empty($search_query)) {
            $query->where(function ($subQuery) use ($search_query, $words) {
                $subQuery->where(function ($subSubQuery) use ($words) {
                    foreach ($words as $word) {
                        $subSubQuery->where('name', 'like', "%{$word}%");
                    }
                })->orWhere(function ($subSubQuery) use ($words) {
                    foreach ($words as $word) {
                        $subSubQuery->where('slug', 'like', "%{$word}%");
                    }
                })->orWhereHas('othernames', function ($subSubQuery) use ($words) {
                    $subSubQuery->where(function ($subSubSubQuery) use ($words) {
                        foreach ($words as $word) {
                            $subSubSubQuery->where('name', 'like', "%{$word}%");
                        }
                    });
                })->orWhereHas('authors', function ($subQuery) use ($search_query) {
                    $subQuery->where('name', 'like', "%{$search_query}%");
                });
            });
        }

        // Filter theo status
        if (isset($status)) {
            $query->where('status', $status);
        }

        // Filter theo category
        if (! empty($category_ids)) {
            $query->whereHas('categories', function ($subQuery) use ($category_ids) {
                $subQuery->select(DB::raw('count(distinct categories.id)'))
                    ->whereIn('category_id', $category_ids);
            }, '=', count($category_ids));
        }

        // Lấy điểm trung bình vote
        $query->withAvg('voted_by as vote_score', 'votes.score');

        // Sắp xếp
        $sort_direction = $sort[0] === '-' ? 'desc' : 'asc';
        $sort_field = $sort[0] === '-' || $sort[0] === '+' ? substr($sort, 1) : $sort;
        $query->orderBy($sort_field, $sort_direction);

        // Phân trang
        $mangas = $query->paginate($per_page, ['*'], 'page', $page);

        return new MangaCollection($mangas);
    }

    public function show(Request $request)
    {
        $request->merge(['id' => $request->route('manga_id')]);
        $fields = $this->validate($request, [
            'id' => 'required|integer|min:1',
        ]);

        $manga = Manga::query()->select(['mangas.*', 'view as view_count'])
            ->with(['othernames', 'authors'])
            ->with(['chapters' => function ($subQuery) {
                $subQuery->orderBy('id', 'desc');
            }])
            ->with(['categories' => function ($subQuery) {
                $subQuery->select(['categories.id', 'name']);
            }])
            ->withCount(['bookmarked_by as follow_count', 'comments as comment_count', 'voted_by as vote_count'])
            ->withAvg('voted_by as vote_score', 'votes.score')
            ->findOrFail($fields['id']);
        $manga->slug = explode('/', $manga->thumbnail)[0];

        // Thêm thông tin nếu user đã đăng nhập
        $user = Auth::guard('sanctum')->user();
        if ($user) {
            $manga->user_bookmarked = $manga->bookmarked_by()->where('user_id', $user->id)->exists();
            $manga->user_vote = $manga->voted_by()->where('user_id', $user->id)->value('score');
            $manga->user_latest_chapter_id = $user->viewed_chapters()
                ->where('views.manga_id', $manga->id)->max('chapter_id');
        }

        $manga->chapters->transform(function ($chapter) {
            $chapter->created_at_formated = $chapter->created_at->format('j/n/Y');
            $chapter->updated_at_formated = $chapter->updated_at->format('j/n/Y');
            unset($chapter->folder);

            return $chapter;
        });

        return response()->json([
            'success' => 1,
            'message' => 'Lấy thông tin truyện thành công',
            'data' => $manga,
        ], 200);
    }

    public function getBookmarkedMangas(Request $request)
    {
        $fields = $this->validate($request, [
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
            'search' => 'string',
        ]);

        $per_page = $fields['per_page'] ?? 10;
        $page = $fields['page'] ?? 1;
        $search_query = $fields['search'] ?? '';

        $query = Manga::query()->select(['mangas.id', 'name', 'thumbnail'])
            ->join('bookmarks', 'mangas.id', '=', 'bookmarks.manga_id')
            ->where('bookmarks.user_id', $request->user()->id);

        // Get latest chapter
        $query->with(['chapters' => function ($subQuery) {
            $subQuery->orderBy('id', 'desc')->limit(1);
        }]);

        // Tìm kiếm theo `tên`
        if (! empty($search_query)) {
            $query->where('name', 'like', "%{$search_query}%");
        }

        $mangas = $query->paginate($per_page, ['*'], 'page', $page);

        return response()->json([
            'success' => 1,
            'message' => 'Lấy danh sách bookmark thành công',
            'data' => $mangas,
        ], 200);
    }

    public function bookmarkToggle(Request $request)
    {
        $user = $request->user();

        $request->merge(['id' => $request->route('manga_id')]);
        $fields = $this->validate($request, [
            'id' => 'required|integer|min:1',
        ]);

        $manga = Manga::findOrFail($request->id);
        $user->bookmarked_mangas()->toggle($manga->id);
        $bookmarked = $manga->bookmarked_by()->where('user_id', $user->id)->exists();

        return response()->json([
            'success' => 1,
            'data' => [
                'bookmarked' => $bookmarked,
            ],
            'message' => ($bookmarked ? 'Thêm' : 'Xóa').' bookmark thành công',
        ], 200);
    }

    public function getReportedMangas(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'success' => 0,
                'message' => 'Can not access',
            ], 403);
        }

        $reportedMangas = Manga::has('reported_by', '>', $this::REPORT_LIMIT)->get();

        return response()->json([
            'success' => 1,
            'data' => new MangaCollection($reportedMangas),
            'message' => 'success',
        ], 200);
    }
}
