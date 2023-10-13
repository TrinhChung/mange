<?php

namespace App\Http\Controllers;

use App\Rules\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    //
    public function create(Request $request)
    {
        $user = $request->user();
        $request->merge(['reportable' => $request->reportable, 'reportable_id' => $request->id]);

        if ($request->reportable === 'manga') {
            $fields = $this->validate($request, [
                'reportable' => ['required', 'string', new Report],
                'reportable_id' => 'required|integer|min:1|exists:mangas,id',
            ]);

            $user->reported_mangas()->attach($fields['reportable_id']);
        }

        if ($request->reportable === 'comment') {
            $fields = $this->validate($request, [
                'reportable' => ['required', 'string', new Report],
                'reportable_id' => 'required|integer|min:1|exists:comments,id',
            ]);

            $user->reported_comments()->attach($fields['reportable_id']);
        }

        return response()->json([
            'success' => 1,
            'message' => 'Báo cáo của bạn đã được gửi đi',
        ], 200);
    }
}
