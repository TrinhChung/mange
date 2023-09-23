<?php

namespace Tests\Feature;

use App\Models\Chapter;
use App\Models\Comment;
use App\Models\Manga;
use App\Models\User;
use App\Traits\AuthTrait;
use App\Traits\TestHelper;
use Tests\TestCase;

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use AuthTrait;

    use TestHelper;

    private function createNestedComments($id, $type)
    {
        $user = User::factory()->create();
        for ($i = 0; $i < 4; $i++) {
            Comment::factory()->create(
                ['user_id' => $user->id,
                    "{$type}_id" => $id,
                    'parent_id' => $i == 0 ? null : $i,
                ]);
        }
    }

    private function post_comment_success($type)
    {
        $user = User::factory()->create();
        $token = $this->login_and_creat_token($user);

        if ($type === 'manga') {
            $manga = Manga::factory()->create();
            $response = $this->actingAs($user)->withHeaders([
                'Authorization' => 'Bearer '.$token,
            ])->post("/api/mangas/{$manga->id}/comment", [
                'comment' => 'truyen hay day',
                'parent_id' => null,
            ]);
        } else {
            $chapter = Chapter::factory()->create();
            $response = $this->actingAs($user)->withHeaders([
                'Authorization' => 'Bearer '.$token,
            ])->post("/api/chapters/{$chapter->id}/comment", [
                'comment' => 'truyen hay day',
                'parent_id' => null,
            ]);
        }

        $response->assertStatus(200);
        $response->assertJsonStructure(
            [
                'success',
                'data' => [
                    'id',
                    'user_id',
                    'manga_id',
                    'chapter_id',
                    'parent_id',
                    'comment',
                    'user' => [
                        'id',
                        'username',
                        'email',
                        'avatar',
                        'active',
                        'role',
                    ],
                ],
            ]
        );
    }

    public function comment_list_success($type): void
    {
        $manga = Manga::factory()->create();
        $chapter = Chapter::factory()->create();
        $response = null;
        if ($type === 'manga') {
            $this->createNestedComments($manga->id, $type);
            $response = $this->get("/api/mangas/{$manga->id}/comments");
        } else {
            $this->createNestedComments($chapter->id, $type);
            $response = $this->get("/api/chapters/{$chapter->id}/comments");
        }

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                '*' => [
                    'id',
                    'manga_id',
                    'chapter_id',
                    'user_id',
                    'comment',
                    'parent_id',
                    'childs' => [
                        '*' => [
                            'id',
                            'manga_id',
                            'chapter_id',
                            'user_id',
                            'comment',
                            'parent_id',
                            'childs' => [
                                '*' => [
                                    'id',
                                    'manga_id',
                                    'chapter_id',
                                    'user_id',
                                    'comment',
                                    'parent_id',
                                    'childs',
                                    'user',
                                ]],
                            'user']],
                    'user']]]);
    }

    public function test_get_comments_success_on_manga()
    {
        $this->comment_list_success('manga');
    }

    public function test_get_comments_success_on_chapter()
    {
        $this->comment_list_success('chapter');
    }

    public function test_get_comments_on_invalid_chapter()
    {
        $response = $this->get('/api/chapters/{-1}/comments');
        $response->assertStatus(422);
    }

    public function test_get_comments_on_invalid_manga()
    {
        $response = $this->get('/api/mangas/{-1}/comments');
        $response->assertStatus(422);
    }

    public function test_get_comments_on_notfound_manga()
    {
        $response = $this->get('/api/mangas/90/comments');
        $response->assertStatus(404);
    }

    public function test_get_comments_on_notfound_chapter()
    {
        $response = $this->get('/api/chapters/18200/comments');
        $response->assertStatus(404);
    }

    public function test_post_comment_success_on_manga()
    {
        $this->post_comment_success('manga');
    }

    public function test_post_comment_success_on_chapter()
    {
        $this->post_comment_success('chapter');
    }

    public function test_post_comment_failed_on_chapter_with_not_exist_id()
    {
        $user = User::factory()->create();
        $token = $this->login_and_creat_token($user);

        $response = $this->actingAs($user)->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->post('/api/chapters/19000/comment', [
            'comment' => 'truyen hay day',
            'parent_id' => null,
        ]);

        $response->assertStatus(500);
    }

    public function test_post_comment_failed_on_manga_with_not_exist_id()
    {
        $user = User::factory()->create();
        $token = $this->login_and_creat_token($user);

        $response = $this->actingAs($user)->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->post('/api/mangas/90/comment', [
            'comment' => 'truyen hay day',
            'parent_id' => null,
        ]);

        $response->assertStatus(500);
    }

    public function test_post_comment_failed_on_manga_with_not_exist_parent_id()
    {
        $user = User::factory()->create();
        $token = $this->login_and_creat_token($user);
        $manga = Manga::factory()->create();

        $response = $this->actingAs($user)->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->post("/api/mangas/{$manga->id}/comment", [
            'comment' => 'truyen hay day',
            'parent_id' => 20,
        ]);

        $response->assertStatus(500);
    }

    public function test_post_comment_failed_on_chapter_with_not_exist_parent_id()
    {
        $user = User::factory()->create();
        $token = $this->login_and_creat_token($user);
        $chapter = Chapter::factory()->create();

        $response = $this->actingAs($user)->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->post("/api/chapters/{$chapter->id}/comment", [
            'comment' => 'truyen hay day',
            'parent_id' => 20,
        ]);

        $response->assertStatus(500);
    }
}
