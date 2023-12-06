<?php

namespace Tests\Feature;

use App\Models\Chapter;
use App\Models\Manga;
use App\Models\User;
use App\Models\View;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    use WithFaker;

    protected function inactive_user_generate()
    {
        $user = User::factory()->create([
            'username' => 'randomuser',
            'email' => $this->faker->email,
            'password' => '111111',
            'active_token' => $this->faker->unique()->regexify('[A-Za-z0-9]{20}'),
        ]);

        return $user;
    }

    public function test_activate_success(): void
    {
        $user = $this->inactive_user_generate();

        $token = $user->active_token;

        //dd('/activate'.'/'.$token);

        $responseView = $this->get('/activate'.'/'.$token);
        $responseView->assertViewIs('account.verificationDone');

        $user = User::find($user->id);
        $this->assertEquals($user->active, 1);
        $this->assertNotNull($user->activated_at);
    }

    public function test_activate_failed_with_wrong_token(): void
    {
        $token = '1234abcdefgh';

        //dd('/activate'.'/'.$token);

        $responseView = $this->get('/activate'.'/'.$token);
        $responseView->assertViewIs('account.invalidActiveToken');
    }

    public function test_activate_failed_with_used_token(): void
    {
        $user = $this->inactive_user_generate();

        $user->activated_at = now();
        $user->active = true;
        $user->save();

        //dd('/activate'.'/'.$token);
        $token = $user->active_token;

        $responseView = $this->get('/activate'.'/'.$token);
        $responseView->assertViewIs('account.invalidActiveToken');
    }

    public function test_me_should_return_user_info(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/api/me');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'username',
                'email',
                'avatar',
                'active',
                'activated_at',
                'role',
                'created_at',
                'updated_at',
            ],
        ]);

        $response->assertJson([
            'success' => 1,
            'data' => [
                'id' => $user->id,
            ],
        ]);
    }

    public function test_me_should_return_error_when_not_login(): void
    {
        $response = $this->get('/api/me');
        $response->assertStatus(401);
    }

    public function test_patch_me_should_update_user_info_with_valid_data(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->patch('/api/me', [
            'email' => 'test@example.com',
            'password' => '111111',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'username',
                'email',
                'avatar',
                'active',
                'activated_at',
                'role',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_patch_me_should_return_error_with_invalid_email(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->patch('/api/me', [
            'email' => '123456',
        ]);

        $response->assertStatus(422);
    }

    public function test_patch_user_should_return_error_when_not_admin(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $user2 = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->patch('/api/users/'.$user2->id, [
            'email' => 'test123@gmail.com',
        ]);

        $response->assertStatus(403);
    }

    public function test_patch_user_should_return_error_with_invalid_email(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
            'role' => 'admin',
        ]);

        $user2 = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->patch('/api/users/'.$user2->id, [
            'email' => '123456',
        ]);

        $response->assertStatus(422);
    }

    public function test_patch_user_should_success_with_valid_data(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
            'role' => 'admin',
        ]);

        $user2 = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->patch('/api/users/'.$user2->id, [
            'email' => 'testing@gmail.com',
            'role' => 'translator',
            'active' => 0,
            'password' => '19921229',
        ]);

        $response->assertStatus(200);

        $user2 = User::find($user2->id);
        $this->assertTrue(md5('19921229') === $user2->password);
    }

    public function test_index_should_block_guest(): void
    {
        $response = $this->get('/api/users');
        $response->assertStatus(401);
    }

    public function test_index_should_block_non_admin_user(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/api/users');
        $response->assertStatus(403);
    }

    public function test_index_should_return_list_of_users(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
            'role' => 'admin',
        ]);

        $response = $this->actingAs($user)->get('/api/users');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'data' => [
                    '*' => [
                        'id',
                        'username',
                        'email',
                        'role',
                        'active',
                        'updated_at',
                    ],
                ],
                'current_page',
                'last_page',
                'per_page',
            ],
        ]);
    }

    public function test_show_should_block_guest(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $response = $this->get('/api/users/'.$user->id);
        $response->assertStatus(401);
    }

    public function test_show_should_success_if_get_current_user(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $response = $this->actingAs($user)->get('/api/users/'.$user->id);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'username',
                'email',
                'role',
                'active',
                'updated_at',
            ],
        ]);
    }

    public function test_show_should_success_if_admin_get_other_user(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
            'role' => 'admin',
        ]);
        $user2 = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $response = $this->actingAs($user)->get('/api/users/'.$user2->id);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'username',
                'email',
                'role',
                'active',
                'updated_at',
            ],
        ]);
    }

    public function test_show_should_fail_when_user_get_another_user(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $user2 = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $response = $this->actingAs($user)->get('/api/users/'.$user2->id);
        $response->assertStatus(403);
    }

    public function test_update_my_avatar_should_fail_if_no_images(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $response = $this->actingAs($user)->post('/api/me/avatar');
        $response->assertStatus(422);
    }

    public function test_update_my_avatar_should_fail_if_wrong_mime_type(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $file = UploadedFile::fake()->create('avatar.pdf', 100, 'application/pdf');
        $response = $this->actingAs($user)->post('/api/me/avatar', [
            'avatar' => $file,
        ]);
        $response->assertStatus(422);
    }

    public function test_update_my_avatar_should_success_if_valid_image(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);
        $file = UploadedFile::fake()->image('test.jpg');
        $response = $this->actingAs($user)->post('/api/me/avatar', [
            'avatar' => $file,
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'username',
                'email',
                'avatar',
                'active',
                'activated_at',
                'role',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_update_my_avatar_should_delete_old_avatar_if_exists(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
            'avatar' => 'avatar153269.jpg',
        ]);
        Storage::put('public/avatars/avatar153269.jpg', 'fake image');

        $response = $this->actingAs($user)->post('/api/me/avatar', [
            'avatar' => UploadedFile::fake()->image('test.jpg'),
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'username',
                'email',
                'avatar',
                'active',
                'activated_at',
                'role',
                'created_at',
                'updated_at',
            ],
        ]);
        Storage::assertMissing('public/avatars/avatar153269.jpg');
        Storage::delete('public/avatars/'.$user->avatar);
    }

    public function test_update_user_avatar_should_error_when_not_admin(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $user2 = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
        ]);

        $response = $this->actingAs($user)->post('/api/users/'.$user2->id.'/avatar');
        $response->assertStatus(403);
    }

    public function test_update_user_avatar_should_delete_old_avatar_if_exists(): void
    {
        $user = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
            'role' => 'admin',
        ]);
        Storage::put('public/avatars/avatar1532691.jpg', 'fake image');

        $user2 = User::factory()->create([
            'active' => 1,
            'activated_at' => now(),
            'avatar' => 'avatar1532691.jpg',
        ]);

        $response = $this->actingAs($user)->post('/api/users/'.$user2->id.'/avatar', [
            'avatar' => UploadedFile::fake()->image('test.jpg'),
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'id',
                'username',
                'email',
                'avatar',
                'active',
                'activated_at',
                'role',
                'created_at',
                'updated_at',
            ],
        ]);
        Storage::assertMissing('public/avatars/avatar153269.jpg');
        Storage::delete('public/avatars/'.$user->avatar);
    }

    public function test_get_history_success()
    {
        $user = User::factory()->create([
            'activated_at' => now(),
            'active' => true,
        ]);
        for ($i = 1; $i <= 10; $i++) {
            $manga = Manga::factory()->create();
            for ($k = 1; $k <= 10; $k++) {
                $chapter = Chapter::factory()->create(['manga_id' => $manga->id, 'folder' => '/folder/'.$manga->name.$k]);
                View::create(['manga_id' => $manga->id, 'chapter_id' => $chapter->id, 'user_id' => $user->id]);
            }
        }
        $response = $this->actingAs($user)->get('/api/me/history');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'manga_id',
                    'name',
                    'amount',
                    'pivot' => [
                        'user_id',
                        'manga_id',
                        'chapter_id',
                    ],
                    'manga' => [
                        'id',
                        'name',
                        'slug',
                        'status',
                        'description',
                        'thumbnail',
                        'view',
                    ],
                ],
            ],
        ]);
    }
}
