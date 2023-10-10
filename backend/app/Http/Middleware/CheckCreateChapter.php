<?php

namespace App\Http\Middleware;

use App\Models\Manga;
use App\Rules\ChapterZipRule;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckCreateChapter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $request->merge(['manga_id' => $request->route('manga_id')]);
        $fields = $request->validate([
            'manga_id' => 'required|integer|min:1',
            'name' => 'string',
            'number' => 'required|integer',
            'by' => 'required|string',
            'images' => ['array'],
            'images.*' => ['image', 'mimes:jpeg,jpg', 'max:10240'],
            'zip' => ['file', 'mimes:zip', 'max:51200', new ChapterZipRule], // 50MB
        ]);

        $manga = Manga::findOrFail($fields['manga_id']);
        $user = $request->user();
        if (! ($manga->managed_by()->where('user_id', $user->id)->exists() || $user->isAdmin())) {
            return response()->json([
                'success' => 0,
                'message' => 'Không có quyền thêm chapter cho truyện này',
            ], 403);
        }
        $request->merge(['manga' => $manga]);

        return $next($request);
    }
}
