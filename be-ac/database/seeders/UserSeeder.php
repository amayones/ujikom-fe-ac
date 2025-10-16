<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        User::create([
            'name' => 'Admin Bioskop',
            'email' => 'admin@cinema.com',
            'password' => Hash::make('password123'),
            'role' => 'admin'
        ]);

        // Create Owner
        User::create([
            'name' => 'Pemilik Bioskop',
            'email' => 'owner@cinema.com',
            'password' => Hash::make('password123'),
            'role' => 'owner'
        ]);

        // Create Cashier
        User::create([
            'name' => 'Kasir Bioskop',
            'email' => 'cashier@cinema.com',
            'password' => Hash::make('password123'),
            'role' => 'cashier'
        ]);

        // Create Customer
        User::create([
            'name' => 'Budi Santoso',
            'email' => 'customer@cinema.com',
            'password' => Hash::make('password123'),
            'role' => 'customer'
        ]);
        
        // Create Test User for easy login
        User::create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => Hash::make('password123'),
            'role' => 'customer'
        ]);
    }
}