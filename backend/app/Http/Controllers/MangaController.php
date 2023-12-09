<?php

namespace App\Http\Controllers;

use App\Http\Resources\MangaCollection;
use App\Models\Manga;
use App\Models\Othername;
use App\Traits\AuthTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MangaController extends Controller
{
    use AuthTrait;

    const REPORT_LIMIT = 10;

    private function roundUpToNextFive(float $number)
    {
        $decimalPart = $number - floor($number);
        $result = $number;
        if ($decimalPart > 0.5) {
            $result = $decimalPart - 0.50 > 0.20 ? ceil($decimalPart) + floor($number) : (ceil($decimalPart) / 2) + floor($number);
        } elseif ($decimalPart < 0.5) {
            $result = $decimalPart - 0.50 < -0.20 ? floor($decimalPart) + floor($number) : (ceil($decimalPart) / 2) + floor($number);
        }

        return $result;
    }

    public function index(Request $request)
    {
        $fields = $this->validate($request, [
            'per_page' => 'integer|min:1|nullable',
            'page' => 'integer|min:1|nullable',
            'category' => 'array',
            'search' => 'string|nullable',
            'time' => 'string|in:day,month,week',
            'status' => 'integer|in:0,1|nullable',
            'sort' => [
                'string',
                'regex:/^([+-]?)(updated_at|follow_count|view_count|comment_count|vote_score|status|top_view_count)$/',
                'nullable',
            ],
        ], [
            'sort.regex' => 'The sort field must be one of: updated_at, follow_count, view_count, comment_count, vote_score, status',
        ]);

        $per_page = $fields['per_page'] ?? 10;
        $page = $fields['page'] ?? 1;
        $category_ids = isset($fields['category']) ? array_filter($fields['category'], function ($category_id) {
            return $category_id !== null;
        }) : [];
        $search_query = $fields['search'] ?? '';
        $status = $fields['status'] ?? null;
        $sort = $fields['sort'] ?? '-updated_at';
        $time = $fields['time'] ?? null;

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

        if (substr($sort, 1) === 'top_view_count' && $time) {
            if ($time === 'day') {
                $query->withCount(['views as top_view_count' => function ($subQuery) {
                    $subQuery->whereDate('created_at', '>=', Carbon::now()->subDay());
                }]);
            } elseif ($time === 'month') {
                $query->withCount(['views as top_view_count' => function ($subQuery) {
                    $subQuery->whereMonth('created_at', '>=', Carbon::now()->subMonth());
                }]);
            } elseif ($time === 'week') {
                $query->withCount(['views as top_view_count' => function ($subQuery) {
                    $subQuery->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                }]);
            }
            $query->having('top_view_count', '>', 0);
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

        $manga = Manga::query()->select(['mangas.*', 'view as view_count', 'slug'])
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

    public function create(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'success' => 0,
                'message' => 'Can not access',
            ], 403);
        }

        $fields = $this->validate($request, [
            'name' => 'required|string',
            'othernames' => 'array',
            'othernames.*' => 'string',
            'description' => 'required|string',
            'thumbnail' => ['required', 'image', 'mimes:jpeg,jpg,png', 'max:10240'],
            'status' => 'required|integer|in:0,1',
            'categories' => 'required|array',
            'categories.*' => 'integer',
            'authors' => 'required|array',
            'authors.*' => 'string',
        ]);

        $slug = Str::slug($fields['name'], '-');

        $manga = Manga::where('slug', $slug)->first();

        if ($manga) {
            return response()->json([
                'success' => 0,
                'message' => 'Truyện đã tồn tại',
            ], 400);
        }

        DB::beginTransaction();
        $manga = Manga::create([
            'name' => $fields['name'],
            'description' => $fields['description'],
            'status' => $fields['status'],
            'thumbnail' => $slug.'/thumbnail.jpg',
            'slug' => $slug,
        ]);

        $authors = $fields['authors'];
        $categories = $fields['categories'];
        $othernames = $fields['othernames'];

        // create authors if not exists by name
        $authors = array_map(function ($author) {
            return ['name' => $author];
        }, $authors);
        $authors = array_map(function ($author) {
            return \App\Models\Author::firstOrCreate($author)->id;
        }, $authors);

        if (count($othernames) > 0) {
            Othername::insert(array_map(function ($othername) use ($manga) {
                return [
                    'name' => $othername,
                    'manga_id' => $manga->id,
                ];
            }, $othernames));
        }

        $manga->categories()->sync($categories);
        $manga->authors()->sync($authors);

        // Upload thumbnail
        $thumbnail = $request->file('thumbnail');
        if (! Storage::disk('ftp')->put("/{$slug}/thumbnail.jpg", file_get_contents($thumbnail->path()))) {
            DB::rollBack();
        }

        DB::commit();

        return response()->json([
            'success' => 1,
            'message' => 'Thêm truyện thành công',
            'data' => $manga,
        ], 201);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json([
                'success' => 0,
                'message' => 'Can not access',
            ], 403);
        }

        $fields = $this->validate($request, [
            'name' => 'required|string',
            'othernames' => 'array',
            'description' => 'required|string',
            'thumbnail' => ['image', 'mimes:jpeg,jpg,png', 'max:10240'],
            'status' => 'required|integer|in:0,1',
            'categories' => 'required|array',
            'authors' => 'required|array',
        ]);

        $slug = Str::slug($fields['name'], '-');

        $manga = Manga::findOrFail($request->id);
        $oldSlug = $manga->slug;

        DB::beginTransaction();
        $manga = $manga->update([
            'name' => $fields['name'],
            'description' => $fields['description'],
            'status' => $fields['status'],
            'thumbnail' => $slug.'/thumbnail.jpg',
            'slug' => $slug,
        ]);

        $authors = $fields['authors'];
        $categories = $fields['categories'];
        $othernames = $fields['othernames'];

        // create authors if not exists by name
        $authors = array_map(function ($author) {
            return ['name' => $author];
        }, $authors);
        $authors = array_map(function ($author) {
            return \App\Models\Author::firstOrCreate($author)->id;
        }, $authors);
        $manga->authors()->sync($authors);

        if (count($othernames) > 0) {
            Othername::upsert(array_map(function ($othername) use ($manga) {
                return [
                    'name' => $othername,
                    'manga_id' => $manga->id,
                ];
            }, $othernames), ['name']);
        }

        $manga->categories()->sync($categories);

        if (! Storage::disk('ftp')->move($oldSlug, $slug)) {
            DB::rollBack();
        }

        // Upload thumbnail
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            if (! Storage::disk('ftp')->put("/{$slug}/thumbnail.jpg", file_get_contents($thumbnail->path()))) {
                DB::rollBack();
            }
        }

        DB::commit();

        return response()->json([
            'success' => 1,
            'message' => 'Cập nhật truyện thành công',
            'data' => $manga,
        ], 201);
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

        $query = Manga::query()->select(['mangas.id', 'name', 'thumbnail', 'slug'])
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

        $reportedMangas = Manga::has('reported_by', '>', $this::REPORT_LIMIT)->withCount('reported_by as report_count')->paginate(10);

        return response()->json([
            'success' => 1,
            'data' => $reportedMangas,
            'message' => 'success',
        ], 200);
    }

    public function getRecommendation(Request $request)
    {
        $user = Auth::guard('sanctum')->user();
        $mangas = Manga::orderBy('view', 'DESC')->orderBy('created_at', 'DESC')->get();
        if ($user) {
            $votedMangas = $user->voted_mangas;
            $viewedMangas = $user->viewed_mangas()->selectRaw('views.manga_id, count(*) as views')->groupBy('views.manga_id')->get();
            $totalView = $user->viewed_mangas()->count();

            if (count($viewedMangas) === 0 && count($votedMangas) === 0) {
                return new MangaCollection(Manga::orderBy('view', 'desc')->orderBy('updated_at', 'desc')->limit(15)->get());
            }

            if (count($viewedMangas) > 0) {
                $avgView = $this->roundUpToNextFive($totalView / count($viewedMangas));
                $viewedMangas = $viewedMangas->map(function ($manga) use ($avgView) {
                    return [
                        'id' => $manga->manga_id - 1,
                        'rate' => ($manga->views / $avgView) * 2.5,
                    ];
                });
            }

            $items = [];
            $ratings = [];
            foreach ($votedMangas as $manga) {
                $items[] = $manga->id - 1;
                $ratings[] = ['id' => $manga->id - 1, 'rate' => $manga->pivot->score];
            }
            foreach ($viewedMangas as $manga) {
                if (! in_array($manga['id'], $items)) {
                    $items[] = $manga['id'];
                    $ratings[] = ['id' => $manga['id'], 'rate' => $manga['rate']];
                }
            }
            $recommendation = Http::post('https://manga_recommend.bachnguyencoder.id.vn/api/predict', ['items' => $items, 'ratings' => $ratings])['data'];
            $mangas = Manga::whereIn('id', $recommendation)->get();
        }

        return new MangaCollection($mangas);
    }
}
