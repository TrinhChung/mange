<?php

namespace Database\Factories;

use App\Models\Manga;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chapter>
 */
class ChapterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $manga = Manga::factory()->create();

        return [
            'manga_id' => $manga->id,
            'name' => $this->faker->name(),
            'folder' => $this->faker->text(10),
            'amount' => 18,
        ];
    }
}
