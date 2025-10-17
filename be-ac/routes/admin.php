<?php

use App\Http\Controllers\FilmController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudioController;
use App\Http\Controllers\PriceController;
use Illuminate\Support\Facades\Route;

// Admin routes - no middleware, just endpoints
Route::prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return response()->json([
            'total_films' => 25,
            'total_schedules' => 48,
            'total_users' => 156,
            'total_revenue' => 15750000,
            'recent_bookings' => [
                ['id' => 1, 'user' => 'John Doe', 'film' => 'Avengers', 'date' => '2024-01-15'],
                ['id' => 2, 'user' => 'Jane Smith', 'film' => 'Spider-Man', 'date' => '2024-01-14']
            ]
        ]);
    });
    
    // Films management
    Route::get('/films', [FilmController::class, 'index']);
    Route::post('/films', [FilmController::class, 'store']);
    Route::get('/films/{film}', [FilmController::class, 'show']);
    Route::put('/films/{film}', [FilmController::class, 'update']);
    Route::delete('/films/{film}', [FilmController::class, 'destroy']);
    
    // Schedules management
    Route::get('/schedules', [ScheduleController::class, 'index']);
    Route::post('/schedules', [ScheduleController::class, 'store']);
    Route::get('/schedules/{schedule}', [ScheduleController::class, 'show']);
    Route::put('/schedules/{schedule}', [ScheduleController::class, 'update']);
    Route::delete('/schedules/{schedule}', [ScheduleController::class, 'destroy']);
    
    // Users management
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    
    // Studios and Prices
    Route::get('/studios', [StudioController::class, 'index']);
    Route::get('/prices', [PriceController::class, 'index']);
});