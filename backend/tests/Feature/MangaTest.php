<?php

namespace Tests\Feature;

use App\Models\Manga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MangaTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_return_empty_if_no_mangas(): void
    {
        $response = $this->get('/api/mangas?category[]=1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'status',
                    'thumbnail',
                    'vote_score',
                    'last_3_chapters' => [
                        '*' => [
                            'id',
                            'name',
                            'folder',
                            'amount',
                        ],
                    ],
                ],
            ],
            'links',
            'meta' => [
                'current_page',
                'from',
                'last_page',
                'per_page',
                'total',
            ],
        ]);
    }

    public function test_index_should_have_counts(): void
    {
        $response = $this->get('/api/mangas?category[]=1');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'follow_count',
                    'view_count',
                    'comments_count',
                ],
            ],
        ]);
    }

    public function test_search_query_success(): void
    {
        Manga::factory()->count(10)->create();
        Manga::factory()->create([
            'name' => 'Non collapsable 1',
        ]);
        Manga::factory()->create()->othernames()->create([
            'name' => 'Non collapsable 2',
        ]);

        $response = $this->get('/api/mangas?search=collapsable');

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
    }
}
