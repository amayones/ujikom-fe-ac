<?php

namespace Database\Seeders;

use App\Models\Studio;
use Illuminate\Database\Seeder;

class StudioSeeder extends Seeder
{
    public function run(): void
    {
        $studios = [
            ['name' => 'Studio 1', 'capacity' => 50, 'created_by' => 1],
            ['name' => 'Studio 2', 'capacity' => 60, 'created_by' => 1],
            ['name' => 'Studio 3', 'capacity' => 40, 'created_by' => 1],
        ];

        foreach ($studios as $studio) {
            Studio::create($studio);
        }
    }
}