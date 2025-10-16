<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\Film;
use App\Models\Studio;
use App\Models\Price;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $films = Film::all();
        $studios = Studio::all();
        $prices = Price::all();

        if ($films->isEmpty() || $studios->isEmpty() || $prices->isEmpty()) {
            return;
        }

        $schedules = [
            [
                'film_id' => $films->first()->id,
                'studio_id' => $studios->where('name', 'Studio 1')->first()->id,
                'date' => '2024-12-15',
                'time' => '14:00:00',
                'price_id' => $prices->where('type', 'Regular')->first()->id,
                'created_by' => 1,
            ],
            [
                'film_id' => $films->skip(1)->first()->id ?? $films->first()->id,
                'studio_id' => $studios->where('name', 'Studio 2')->first()->id,
                'date' => '2024-12-15',
                'time' => '16:30:00',
                'price_id' => $prices->where('type', 'Weekend')->first()->id,
                'created_by' => 1,
            ],
            [
                'film_id' => $films->first()->id,
                'studio_id' => $studios->where('name', 'Studio 1')->first()->id,
                'date' => '2024-12-15',
                'time' => '19:00:00',
                'price_id' => $prices->where('type', 'VIP')->first()->id,
                'created_by' => 1,
            ],
            [
                'film_id' => $films->skip(2)->first()->id ?? $films->first()->id,
                'studio_id' => $studios->where('name', 'Studio 3')->first()->id,
                'date' => '2024-12-16',
                'time' => '15:00:00',
                'price_id' => $prices->where('type', 'Regular')->first()->id,
                'created_by' => 1,
            ],
        ];

        foreach ($schedules as $schedule) {
            Schedule::create($schedule);
        }
    }
}