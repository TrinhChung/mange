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
        $user = User::factory()->create([
            'activated_at' => now()->addDays(-2),
        ]);
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
            'data' => ['data' => [
                '*' => [
                    'id',
                    'manga_id',
                    'chapter_id',
                    'user_id',
                    'comment',
                    'like_count',
                    'dislike_count',
                    'parent_id',
                    'childs' => [
                        '*' => [
                            'id',
                            'manga_id',
                            'chapter_id',
                            'user_id',
                            'comment',
                            'like_count',
                            'dislike_count',
                            'parent_id',
                            'childs' => [
                                '*' => [
                                    'id',
                                    'manga_id',
                                    'chapter_id',
                                    'user_id',
                                    'comment',
                                    'like_count',
                                    'dislike_count',
                                    'parent_id',
                                    'childs',
                                    'user',
                                ]],
                            'user']],
                    'user']]]]);
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

    public function test_post_comment_failed_on_manga_with_not_activated_more_than_1_day()
    {
        $user = User::factory()->create([
            'activated_at' => now(),
        ]);
        $manga = Manga::factory()->create();

        $response = $this->actingAs($user)->post("/api/mangas/{$manga->id}/comment", [
            'comment' => 'truyen hay day',
            'parent_id' => null,
        ]);

        $response->assertStatus(403);
    }

    public function test_react_normal_success()
    {
        $user = User::factory()->create([
            'activated_at' => now()->addDays(-2),
        ]);
        $token = $this->login_and_creat_token($user);
        $manga = Manga::factory()->create();
        $this->createNestedComments($manga->id, 'manga');

        $response = $this->actingAs($user)->post('/api/comments/1/react', [
            'reaction' => 0,
        ]);

        $response->assertStatus(200);
        $this->assertEquals(0, $user->reacted_comments()->count());
        $response->assertJsonStructure([
            'success',
            'data',
            'message',
        ]);
    }

    public function test_react_like_or_dislike_success()
    {
        $user = User::factory()->create([
            'activated_at' => now()->addDays(-2),
        ]);
        $token = $this->login_and_creat_token($user);
        $manga = Manga::factory()->create();
        $this->createNestedComments($manga->id, 'manga');

        $response = $this->actingAs($user)->post('/api/comments/1/react', [
            'reaction' => 1,
        ]);

        //dd($user->reacted_comments);

        $response->assertStatus(200);
        $this->assertEquals(1, $user->reacted_comments()->first()->pivot->like);
        $response->assertJsonStructure([
            'success',
            'data',
            'message',
        ]);
    }

    public function test_react_failed_with_not_login()
    {
        $user = User::factory()->create([
            'activated_at' => now()->addDays(-2),
        ]);
        $manga = Manga::factory()->create();
        $this->createNestedComments($manga->id, 'manga');

        $response = $this->post('/api/comments/1/react', [
            'reaction' => 1,
        ]);
        $response->assertStatus(401);
    }

    public function test_react_failed_with_invalid_data()
    {
        $user = User::factory()->create([
            'activated_at' => now()->addDays(-2),
        ]);
        $manga = Manga::factory()->create();
        $this->createNestedComments($manga->id, 'manga');

        $response = $this->actingAs($user)->post('/api/comments/1/react', [
            'reaction' => 2,
        ]);
        $response->assertStatus(422);
    }

    public function test_react_failed_with_notfound_comment()
    {
        $user = User::factory()->create([
            'activated_at' => now()->addDays(-2),
        ]);
        $manga = Manga::factory()->create();
        $this->createNestedComments($manga->id, 'manga');

        $response = $this->actingAs($user)->post('/api/comments/100/react', [
            'reaction' => 1,
        ]);
        $response->assertStatus(500);
    }

    public function test_report_comment_success()
    {
        $manga = Manga::factory()->create();
        $user = User::factory()->create([
            'activated_at' => now(),
            'active' => true,
        ]);
        $this->createNestedComments($manga->id, 'manga');
        $comment = Comment::first();
        $response = $this->actingAs($user)->post("/api/report/comment/$comment->id");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
    }

    public function test_report_comment_failed_not_login()
    {
        $manga = Manga::factory()->create();
        $this->createNestedComments($manga->id, 'manga');
        $comment = Comment::first();
        $response = $this->post("/api/report/comment/$comment->id");
        $response->assertStatus(401);
    }

    public function test_delete_comment_success()
    {
        $manga = Manga::factory()->create();
        $this->createNestedComments($manga->id, 'manga');
        $old = Comment::count();
        $admin = User::factory()->create(['active' => 1, 'activated_at' => now(), 'role' => 'admin']);

        $response = $this->actingAs($admin)->post('/api/comments/delete/'.Comment::first()->id);

        $response->assertStatus(200);
        $this->assertLessThan($old, Comment::count());
    }

    public function test_delete_comment_fail_with_not_admin()
    {
        $user = User::factory()->create(['active' => 1, 'activated_at' => now(), 'role' => 'user']);

        $response = $this->actingAs($user)->post('/api/comments/delete/'.Comment::first()->id);

        $response->assertStatus(403);
    }
}
