<?php

namespace Tests\Feature;

use Tests\TestCase;

class MangaTest extends TestCase
{
    public function test_should_return_empty_if_no_mangas(): void
    {
        $response = $this->get('/api/mangas?category[]=1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
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
}
