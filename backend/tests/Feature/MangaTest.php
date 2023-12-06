<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Chapter;
use App\Models\Manga;
use App\Models\User;
use App\Models\View;
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

    public function test_create_fail_with_user_not_admin(): void
    {
        $image = UploadedFile::fake()->image('image1.jpg');
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/api/mangas/', [
            'name' => 'Manga 1',
            'description' => 'Description',
            'status' => 0,
            'thumbnail' => $image,
            'categories' => [1],
            'othernames' => ['Other name 1'],
            'authors' => ['Author 1'],
        ]);
        $response->assertStatus(403);
    }

    public function test_create_fail_with_manga_existed(): void
    {
        $admin = $this->create_admin();
        Storage::fake('ftp');
        Storage::disk('ftp')->deleteDirectory('manga-1');
        $image = UploadedFile::fake()->image('image1.jpg');
        Category::create([
            'name' => 'Category 1',
        ]);

        $image = UploadedFile::fake()->image('image1.jpg');
        $manga = Manga::factory()->create(['name' => 'tham du', 'slug' => 'tham-du']);

        $response = $this->actingAs($admin)->post('/api/mangas/', [
            'name' => 'tham dự',
            'description' => 'Description',
            'status' => 0,
            'thumbnail' => $image,
            'categories' => [1],
            'othernames' => ['Other name 1'],
            'authors' => ['Author 1'],
        ]);
        $response->assertStatus(400);
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

    public function test_report_manga_success()
    {
        $manga = Manga::factory()->create();
        $user = User::factory()->create([
            'activated_at' => now(),
            'active' => true,
        ]);
        $response = $this->actingAs($user)->post("/api/report/manga/$manga->id");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
    }

    public function test_report_manga_failed_not_login(): void
    {
        $manga = Manga::factory()->create();
        $response = $this->post("/api/report/comment/$manga->id");
        $response->assertStatus(401);
    }

    public function test_get_reported_mangas_success(): void
    {
        $mangas = Manga::factory(10)->create();
        $user = User::factory(15)->create(['role' => 'user', 'active' => 1, 'activated_at' => now()]);
        foreach ($mangas as $manga) {
            $manga->reported_by()->attach($user->pluck('id')->toArray());
        }

        $admin = User::factory()->create(['role' => 'admin', 'active' => 1, 'activated_at' => now()]);
        $response = $this->actingAs($admin)->get('/api/mangas/reported');
        $response->assertStatus(200);
        $data = $response->json();
        $this->assertEquals($data['data']['total'], 10);
    }

    public function test_get_reported_mangas_failed_with_not_admin(): void
    {
        $user = User::factory()->create(['role' => 'user', 'active' => 1, 'activated_at' => now()]);
        $response = $this->actingAs($user)->get('/api/mangas/reported');
        $response->assertStatus(403);
    }

    public function test_get_recommendation_success(): void
    {
        $user = User::factory()->create(['role' => 'user', 'active' => 1, 'activated_at' => now()]);
        $response = $this->actingAs($user)->get('/api/me/recommendation');
        $response->assertStatus(200);
        $response->assertJsonCount(15, 'data');
    }

    public function test_get_recommendation_success_with_view(): void
    {
        $user = User::factory()->create(['role' => 'user', 'active' => 1, 'activated_at' => now()]);
        $chapters = Chapter::factory(5)->create();
        foreach ($chapters as $chapter) {
            View::create(['manga_id' => $chapter->manga->id, 'chapter_id' => $chapter->id, 'user_id' => $user->id]);
        }
        $response = $this->actingAs($user)->get('/api/me/recommendation');
        $response->assertStatus(200);
    }
}
