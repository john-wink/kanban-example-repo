<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\RealEstate;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $financier = User::factory()->create([
            'name' => 'Financier',
            'email' => 'financier@example.com',
        ]);
        $supervisor = User::factory()->create([
            'name' => 'Supervisor',
            'email' => 'supervisor@example.com',
        ]);

        RealEstate::factory(100)
            ->create([
                'user_uuid' => $supervisor,
            ]);

    }
}
