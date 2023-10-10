<?php

namespace Tests\Feature;

use App\Models\Chapter;
use App\Models\Manga;
use App\Traits\TestHelper;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ChapterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    use TestHelper;
    use WithFaker;

    public function test_get_info_success(): void
    {
        $chapter = Chapter::factory()->create();

        $response = $this->get("/api/chapters/{$chapter->id}");
        //dd($response->json());
        $response->assertStatus(200);
        $response->assertJsonStructure(
            [
                'success',
                'data' => [
                    'id',
                    'name',
                    'updated_at',
                    'created_at',
                    'images',
                    'manga',
                ],
                'message',
            ]
        );
    }

    public function test_get_info_fail_with_not_found(): void
    {
        $id = 20000;
        $response = $this->get("/api/chapters/{$id}");
        //dd($response->json());
        $response->assertStatus(404);
    }

    public function test_get_info_fail_with_invalid_id(): void
    {
        $id = -1;
        $response = $this->get("/api/chapters/{$id}");
        //dd($response->json());
        $response->assertStatus(422);
    }

    public function test_create_chapter_success(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create();

        $response = $this->actingAs($admin)->post("/api/mangas/{$manga->id}/chapter", [
            'name' => $this->faker->name(),
            'number' => 100,
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }

    public function test_create_chapter_fail_because_duplicate_number(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create();
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 101',
            'folder' => 'name-manga/101/',
        ]);

        $response = $this->actingAs($admin)->post("/api/mangas/{$manga->id}/chapter", [
            'name' => $this->faker->name(),
            'number' => 101,
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }

    public function test_update_chapter_success(): void
    {
        $admin = $this->create_admin();
        $chapter = Chapter::factory()->create();

        $response = $this->actingAs($admin)->patch("/api/chapters/{$chapter->id}", [
            'name' => $this->faker->name(),
            'number' => 100,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }

    public function test_update_chapter_fail_because_duplicate_number(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create();
        $chapter1 = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 101',
            'folder' => 'name-manga/101/',
        ]);
        $chapter2 = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 102',
            'folder' => 'name-manga/102/',
        ]);

        $response = $this->actingAs($admin)->patch("/api/chapters/{$chapter1->id}", [
            'name' => $this->faker->name(),
            'number' => 102,
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }
}
