<?php

namespace App\Http\Middleware;

use App\Models\Manga;
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
        $request->merge(['manga_id' => 'manga_id']);
        $fields = $request->validate([
            'manga_id' => 'required|integer|min:1',
            'name' => 'string',
            'number' => 'required|integer',
            'by' => 'required|string',
        ]);

        $manga = Manga::findOrFail($request->manga_id);

        if (! $manga->managed_by()->exist($request->user()->id)) {
            return response()->json([
                'success' => 0,
                'message' => 'Can not access',
            ], 403);
        }
        $request->merge(['manga' => $manga]);

        return $next($request);
    }
}
