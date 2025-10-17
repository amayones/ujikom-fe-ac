<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index()
    {
        $films = Film::all();
        return response()->json([
            'success' => true,
            'message' => 'Films retrieved successfully',
            'data' => $films
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'genre' => 'required|string',
            'duration' => 'required|integer',
            'rating' => 'required|string',
            'poster_url' => 'nullable|url',
            'price' => 'required|numeric'
        ]);
        
        $film = Film::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Film created successfully',
            'data' => $film
        ], 201);
    }

    public function show(Film $film)
    {
        return response()->json([
            'success' => true,
            'message' => 'Film retrieved successfully',
            'data' => $film
        ]);
    }

    public function update(Request $request, Film $film)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'genre' => 'sometimes|string',
            'duration' => 'sometimes|integer',
            'rating' => 'sometimes|string',
            'poster_url' => 'nullable|url',
            'price' => 'sometimes|numeric'
        ]);
        
        $film->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Film updated successfully',
            'data' => $film
        ]);
    }

    public function destroy(Film $film)
    {
        $film->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Film deleted successfully'
        ]);
    }
}