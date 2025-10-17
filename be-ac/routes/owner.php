<?php

use Illuminate\Support\Facades\Route;

Route::prefix('owner')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json([
            'revenue_today' => 2500000,
            'revenue_month' => 45000000,
            'total_bookings' => 1250,
            'popular_films' => [
                ['title' => 'Avengers', 'bookings' => 85],
                ['title' => 'Spider-Man', 'bookings' => 72]
            ]
        ]);
    });
    
    Route::get('/finance', function () {
        return response()->json([
            'daily_revenue' => [
                ['date' => '2024-01-01', 'amount' => 1500000],
                ['date' => '2024-01-02', 'amount' => 2200000]
            ],
            'expenses' => 5000000,
            'profit' => 40000000
        ]);
    });
    
    Route::get('/reports', function () {
        return response()->json([
            'monthly_report' => ['jan' => 45000000, 'feb' => 52000000],
            'film_performance' => [
                ['film' => 'Avengers', 'revenue' => 15000000],
                ['film' => 'Spider-Man', 'revenue' => 12000000]
            ]
        ]);
    });
});