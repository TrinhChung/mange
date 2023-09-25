<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
            'user' => [
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
            'user' => [
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
            'user' => [
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
}
