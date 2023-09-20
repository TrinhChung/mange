<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manga>
 */
class MangaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->name(),
            'status' => $this->faker->randomElement(['Đang tiến hành', 'Đã hoàn thành']),
            'description' => $this->faker->text(),
            'thumbnail' => $this->faker->imageUrl(),
        ];
    }
}
