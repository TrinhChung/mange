<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\UserController;
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
    return \Illuminate\Support\Facades\Storage::disk('ftp')->directories('/');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::middleware('auth:sanctum')->delete('/logout', [AuthController::class, 'logout']);
});

Route::prefix('mangas')->group(function () {
    Route::get('/', [MangaController::class, 'index']);
});

Route::prefix('user')->group(function () {
    Route::post('/request_reset_password', [UserController::class, 'requestResetPassword']);
});