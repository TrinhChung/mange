<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use PDOException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'success' => 0,
                    'message' => 'Dữ liệu đã nhập không hợp lệ',
                    'errors' => $e->errors(),
                ], 422);
            } elseif ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException
                || $e instanceof NotFoundHttpException) {
                return response()->json([
                    'success' => 0,
                    'message' => 'Không tìm thấy dữ liệu',
                    'errors' => $e->getMessage(),
                ], 404);
            } elseif ($e instanceof \Illuminate\Database\QueryException || $e instanceof PDOException) {
                return response()->json([
                    'success' => 0,
                    'message' => 'Query thất bại',
                    'errors' => $e->getMessage(),
                ], 500);
            } elseif ($e instanceof AccessDeniedHttpException) {
                return response()->json([
                    'success' => 0,
                    'message' => 'Không có quyền truy cập',
                    'errors' => $e->getMessage(),
                ], 403);
            }
        });
    }
}
