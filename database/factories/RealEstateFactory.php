<?php

namespace Database\Factories;

use App\Enums\StatusEnum;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RealEstate>
 */
class RealEstateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name,
            'price' => fake()->numberBetween(25000000, 50000000) / 100,
            'loan_uuid' => Loan::factory(state: [
                'user_uuid' => User::firstWhere('email', 'supervisor@example.com')->id,
                'financier_uuid' => User::firstWhere('email', 'financier@example.com')->id,
                'status' => fake()->randomElement([
                    StatusEnum::SALE,
                    StatusEnum::CLEARING,
                    StatusEnum::FINANCING_DEPARTMENT,
                    StatusEnum::BANK,
                    StatusEnum::WON,
                ]),
            ])->create(),
        ];
    }
}
