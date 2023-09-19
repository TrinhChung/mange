<?php

namespace App\Http\Controllers;

use App\Http\Resources\Manga as MangaResource;
use App\Models\Manga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MangaController extends Controller
{
    public function index(Request $request)
    {
        $fields = $this->validate($request, [
            'per_page' => 'integer|min:1',
            'page' => 'integer|min:1',
            'category' => 'array',
            'search' => 'string',
        ]);

        $per_page = $fields['per_page'] ?? 10;
        $page = $fields['page'] ?? 1;
        $category_ids = $request->get('category', []);
        $search_query = $request->get('search', '');

        $query = Manga::query()->select(['id', 'name', 'thumbnail'])
            ->with(['chapters', 'categories', 'othernames'])
            ->withCount(['bookmarked_by as follow_count', 'views as view_count', 'comments as comment_count']);

        // Tìm kiếm theo `tên` hoặc `tên khác` chứa
        if (! empty($search_query)) {
            $query->where(function ($subQuery) use ($search_query) {
                $subQuery->where('name', 'like', "%{$search_query}%")
                    ->orWhereHas('othernames', function ($subQuery) use ($search_query) {
                        $subQuery->where('name', 'like', "%{$search_query}%");
                    });
            });
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

        // Sắp xếp mặc định theo mới cập nhật
        $query->orderByDesc('updated_at');

        // Phân trang
        $mangas = $query->paginate($per_page, ['*'], 'page', $page);

        return MangaResource::collection($mangas);
    }
}
