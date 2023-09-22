<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
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
                    'message' => 'The given data was invalid.',
                    'errors' => $e->errors(),
                ], 422);
            } elseif ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException
                || $e instanceof NotFoundHttpException) {
                return response()->json([
                    'success' => 0,
                    'message' => 'Record Not Found',
                    'errors' => $e->getMessage(),
                ], 404);
            } elseif ($e instanceof \Illuminate\Database\QueryException) {
                return response()->json([
                    'success' => 0,
                    'message' => 'Query failed',
                    'errors' => $e->getMessage(),
                ], 500);
            }
        });
    }
}
