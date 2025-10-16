<?php

namespace Database\Seeders;

use App\Models\Price;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    public function run(): void
    {
        $prices = [
            ['type' => 'Regular', 'price' => 45000, 'created_by' => 1],
            ['type' => 'Weekend', 'price' => 55000, 'created_by' => 1],
            ['type' => 'VIP', 'price' => 75000, 'created_by' => 1],
        ];

        foreach ($prices as $price) {
            Price::create($price);
        }
    }
}