<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Manga;
use App\Models\User;
use App\Traits\TestHelper;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MangaTest extends TestCase
{
    use RefreshDatabase;
    use TestHelper;

    public function test_should_return_empty_if_no_mangas(): void
    {
        $response = $this->get('/api/mangas?category[]=1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
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

    public function test_index_should_return_latest_chapters(): void
    {
        $manga = Manga::factory()->create();
        $manga->chapters()->create([
            'name' => 'Chapter 1',
            'folder' => 'folder',
            'amount' => 10,
        ]);

        $response = $this->get('/api/mangas');
        $response->assertJsonStructure([
            'data' => [
                '*' => [
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
        ]);
    }

    public function test_create_manga_success(): void
    {
        $admin = $this->create_admin();
        Storage::fake('ftp');
        Storage::disk('ftp')->deleteDirectory('manga-1');
        $image = UploadedFile::fake()->image('image1.jpg');
        Category::create([
            'name' => 'Category 1',
        ]);

        $response = $this->actingAs($admin)->post('/api/mangas/', [
            'name' => 'Manga 1',
            'description' => 'Description',
            'status' => 0,
            'thumbnail' => $image,
            'categories' => [1],
            'othernames' => ['Other name 1'],
            'authors' => ['Author 1'],
        ]);

        $response->assertStatus(201);
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
        Manga::factory()->create()->authors()->create([
            'name' => 'Non collapsable 3',
        ]);

        $response = $this->get('/api/mangas?search=collapsable');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function test_index_status_query_success(): void
    {
        Manga::factory()->create([
            'status' => 0,
        ]);
        Manga::factory()->create([
            'status' => 1,
        ]);

        $response = $this->get('/api/mangas?status=0');

        $response->assertStatus(200);
        $mangas = $response->json('data');
        foreach ($mangas as $manga) {
            $this->assertEquals(0, $manga['status']);
        }
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
        $manga->chapters()->create([
            'name' => 'Chapter 1',
            'folder' => 'folder',
            'amount' => 10,
        ]);

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

    public function test_get_bookmarked_fail_if_not_login(): void
    {
        $response = $this->get('/api/mangas/bookmarked');

        $response->assertStatus(401);
    }

    public function test_get_bookmarked_success(): void
    {
        $user = User::factory()->create();
        $manga = Manga::factory()->create();
        $user->bookmarked_mangas()->attach($manga->id);

        $response = $this->actingAs($user)->get('/api/mangas/bookmarked?search='.$manga->name);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'current_page',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'thumbnail',
                        'chapters' => [
                            '*' => [
                                'id',
                                'name',
                                'folder',
                                'amount',
                            ],
                        ],
                    ],
                ],
            ],
        ]);
    }
}
