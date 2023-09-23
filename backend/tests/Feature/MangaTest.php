<?php

namespace Tests\Feature;

use App\Models\Manga;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MangaTest extends TestCase
{
    use RefreshDatabase;

    private function login_and_creat_token($user)
    {
        $token = $user->createToken('testuser')->plainTextToken;

        return $token;
    }

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

    public function test_show_should_return_404_if_not_found(): void
    {
        $response = $this->get('/api/mangas/99');

        $response->assertStatus(404);
    }

    public function test_show_should_return_422_if_invalid_id(): void
    {
        $response = $this->get('/api/mangas/invalid_id_123');

        $response->assertStatus(422);
    }

    public function test_show_should_return_correct_json_structure(): void
    {
        $manga = Manga::factory()->create();

        $response = $this->get("/api/mangas/{$manga->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'id',
                'name',
                'status',
                'description',
                'thumbnail',
                'view_count',
                'follow_count',
                'comment_count',
                'vote_count',
                'vote_score',
                'chapters' => [
                    '*' => [
                        'id',
                        'name',
                    ],
                ],
                'categories' => [
                    '*' => [
                        'id',
                        'name',
                    ],
                ],
                'othernames' => [
                    '*' => [
                        'id',
                        'name',
                    ],
                ],
                'authors' => [
                    '*' => [
                        'id',
                        'name',
                    ],
                ],
            ],
        ]);
    }

    public function test_show_structure_when_authenticated(): void
    {
        $manga = Manga::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get("/api/mangas/{$manga->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'user_bookmarked',
                'user_vote',
                'user_latest_chapter_id',
            ],
        ]);
    }

    public function test_bookmark_success(): void
    {
        $manga = Manga::factory()->create();
        $user = User::factory()->create();

        $token = $this->login_and_creat_token($user);

        $response = $this->actingAs($user)->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->post("/api/mangas/bookmark/{$manga->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
    }

    public function test_bookmark_failed_invalid(): void
    {
        $user = User::factory()->create();

        $token = $this->login_and_creat_token($user);

        $response = $this->actingAs($user)->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->post('/api/mangas/bookmark/{-1}');

        $response->assertStatus(422);
    }

    public function test_bookmark_failed_with_not_found(): void
    {
        $user = User::factory()->create();

        $token = $this->login_and_creat_token($user);

        $id = 100;

        $response = $this->actingAs($user)->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->post('/api/mangas/bookmark/'.$id);

        $response->assertStatus(404);
    }
}
