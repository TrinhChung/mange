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
            'data' => [],
            'links' => [
                'first',
                'last',
                'prev',
                'next',
            ],
            'meta' => [
                'current_page',
                'from',
                'last_page',
                'path',
                'per_page',
                'to',
                'total',
            ],
        ]);
    }
}
