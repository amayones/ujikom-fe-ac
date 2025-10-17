<?php

use App\Http\Controllers\FilmController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Admin routes (require auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    
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
    
});