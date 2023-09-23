<?php

namespace Tests\Feature;

use App\Models\Chapter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ChapterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    use WithFaker;

    public function test_get_info_success(): void
    {
        $chapter = Chapter::factory()->create();

        $response = $this->get("/api/chapter/{$chapter->id}");
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
        $response = $this->get("/api/chapter/{$id}");
        //dd($response->json());
        $response->assertStatus(404);
    }

    public function test_get_info_fail_with_invalid_id(): void
    {
        $id = -1;
        $response = $this->get("/api/chapter/{$id}");
        //dd($response->json());
        $response->assertStatus(422);
    }
}
