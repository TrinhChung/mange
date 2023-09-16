<?php

namespace App\Http\Controllers;

use App\Http\Resources\Manga as MangaResource;
use App\Models\Manga;
use Illuminate\Http\Request;

class MangaController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->get('per_page', 10);
        $page = $request->get('page', 1);
        $category_ids = $request->get('category', []);

        // TODO: tối ưu lấy chapters
        $query = Manga::query()->with(['chapters']);

        if (! empty($category_ids)) {
            $query->whereHas('categories', function ($subQuery) use ($category_ids) {
                $subQuery->whereIn('category_id', $category_ids);
            });
        }

        $mangas = $query->paginate($per_page, ['*'], 'page', $page);

        return MangaResource::collection($mangas);
    }
}
