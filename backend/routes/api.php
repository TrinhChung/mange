<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/health_check', function () {
    return response()->json(['message' => 'OK'], 200);
});

Route::get('/list-truyen', function () {
    return \Illuminate\Support\Facades\Storage::disk('ftp')->directories();
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->middleware('activated');
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/reset_password', [AuthController::class, 'reset_password']);
    Route::post('/new_password', [AuthController::class, 'update_password']);
    Route::middleware('auth:sanctum')->delete('/logout', [AuthController::class, 'logout']);
});

Route::prefix('mangas')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [MangaController::class, 'create']);
        Route::get('/bookmarked', [MangaController::class, 'getBookmarkedMangas']);
        Route::post('/bookmark/{manga_id}', [MangaController::class, 'bookmarkToggle']);
        Route::post('{manga_id}/comment', [CommentController::class, 'create']);
        Route::post('{id}', [MangaController::class, 'update']);
        Route::post('{manga_id}/vote', [VoteController::class, 'vote']);
        Route::post('{manga_id}/chapter', [ChapterController::class, 'create']);
        Route::get('reported', [MangaController::class, 'getReportedMangas']);
    });

    Route::get('/', [MangaController::class, 'index']);
    Route::get('/{manga_id}', [MangaController::class, 'show']);
    Route::get('{manga_id}/comments', [CommentController::class, 'getAllComment']);
});

Route::prefix('chapters')->group(function () {
    Route::get('/{chapter_id}', [ChapterController::class, 'show']);
    Route::middleware('auth:sanctum')->patch('/{chapter_id}', [ChapterController::class, 'update']);
    Route::middleware('auth:sanctum')->post('/{chapter_id}', [ChapterController::class, 'uploadImages']);
    Route::middleware('auth:sanctum')->post('/{chapter_id}/sort', [ChapterController::class, 'sortImages']);
    Route::middleware('auth:sanctum')->post('{chapter_id}/comment', [CommentController::class, 'create']);
    Route::get('{chapter_id}/comments', [CommentController::class, 'getAllComment']);
});

Route::prefix('forms')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [UserController::class, 'createForm']);
        Route::put('{id}', [UserController::class, 'editForm']);
        Route::put('{id}/accept', [UserController::class, 'acceptForm']);
        Route::put('{id}/refuse', [UserController::class, 'refuseForm']);
    });
});

Route::prefix('comments')->middleware('auth:sanctum')->group(function () {
    Route::post('{id}/react', [CommentController::class, 'react']);
    Route::get('reported', [CommentController::class, 'getReportedComments']);
    Route::post('delete/{id}', [CommentController::class, 'deleteComment']);
});

Route::prefix('report')->middleware('auth:sanctum')->group(function () {
    Route::post('{reportable}/{id}', [ReportController::class, 'create']);
});

Route::prefix('me')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [UserController::class, 'me']);
        Route::patch('/', [UserController::class, 'patchMe']);
        Route::post('/avatar', [UserController::class, 'updateMyAvatar']);
        Route::get('/history', [UserController::class, 'history']);
        Route::get('/notifications', [UserController::class, 'notifications']);
        Route::post('/notifications/read', [UserController::class, 'readNotifications']);
        Route::post('/notifications/readAll', [UserController::class, 'readAllNotifications']);
    });
    Route::get('/recommendation', [MangaController::class, 'getRecommendation']);
});

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{user_id}', [UserController::class, 'show']);
    Route::patch('/{user_id}', [UserController::class, 'patch']);
    Route::post('/{user_id}/avatar', [UserController::class, 'updateUserAvatar']);
});

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
});
