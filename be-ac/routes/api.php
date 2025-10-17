<?php

use App\Http\Controllers\FilmController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudioController;
use App\Http\Controllers\PriceController;
use Illuminate\Support\Facades\Route;

// Health check
Route::get('/', function () {
    return response()->json([
        'success' => true,
        'message' => 'Absolute Cinema API is running',
        'data' => [
            'app' => 'Absolute Cinema',
            'version' => '1.0.0',
            'timestamp' => now()->toISOString()
        ]
    ]);
});

// Include route files by role
Route::prefix('auth')->group(base_path('routes/auth.php'));
Route::prefix('admin')->group(base_path('routes/admin.php'));
Route::prefix('owner')->group(base_path('routes/owner.php'));

// Public routes (no authentication required)
Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{film}', [FilmController::class, 'show']);
Route::get('/schedules', [ScheduleController::class, 'index']);
Route::get('/schedules/{schedule}', [ScheduleController::class, 'show']);
Route::get('/studios', [StudioController::class, 'index']);
Route::get('/prices', [PriceController::class, 'index']);

// Customer routes (require auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/bookings', function () {
        return response()->json([
            'success' => true,
            'message' => 'User bookings',
            'data' => [
                ['id' => 1, 'movie' => 'Spider-Man', 'date' => '2024-01-15', 'seats' => 'A1,A2', 'total' => 100000],
                ['id' => 2, 'movie' => 'Batman', 'date' => '2024-01-16', 'seats' => 'B5', 'total' => 55000]
            ]
        ]);
    });
    
    Route::post('/bookings', function () {
        return response()->json([
            'success' => true,
            'message' => 'Booking created successfully',
            'data' => ['id' => 3, 'status' => 'confirmed']
        ]);
    });
});