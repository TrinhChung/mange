<?php

namespace Tests\Feature;

use App\Mail\activeAccount;
use App\Mail\resetPassword;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function test_register_success(): void
    {
        Mail::fake();

        $user = [
            'username' => 'randomuser',
            'email' => $this->faker->email,
            'password' => '111111',
        ];
        $response = $this->post('/api/auth/signup', $user);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'user' => [
                    'username',
                    'email',
                    'role',
                    'active_token',
                ],
                'token',
            ],
        ]);

        Mail::assertSent(activeAccount::class, function ($mail) use ($user) {
            return $mail->hasTo($user['email']);
        });
    }

    public function test_register_validation_error(): void
    {
        $response = $this->post('/api/auth/signup', [
            'username' => '',
            'email' => '',
            'password' => '',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors' => [
                'username',
                'email',
                'password',
            ],
        ]);
    }

    public function test_register_invalid_email_format(): void
    {
        $response = $this->post('/api/auth/signup', [
            'username' => 'testuser',
            'email' => 'testuser',
            'password' => '111111',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors' => [
                'email',
            ],
        ]);
    }

    public function test_login_success(): void
    {
        User::factory()->create([
            'username' => 'testuser',
            'email' => 'testuser@example.com',
            'password' => md5('111111'),
            'role' => 'user',
            'active_token' => $this->faker->unique()->regexify('[A-Za-z0-9]{20}'),
            'active' => 1,
        ]);
        $response = $this->post('/api/auth/login', [
            'username' => 'testuser',
            'password' => '111111',
        ]);

        $response->assertStatus(200);
    }

    public function test_login_validation_error(): void
    {
        $response = $this->post('/api/auth/login', [
            'username' => '',
            'password' => '',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors' => [
                'username',
                'password',
            ],
        ]);
    }

    public function test_login_wrong_credentials(): void
    {
        $response = $this->post('/api/auth/login', [
            'username' => 'NON_EXISTENT',
            'password' => 'NON_EXISTENT',
        ]);

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message',
        ]);
    }

    public function test_login_not_activated_yet(): void
    {
        $user = User::factory()->create([
            'username' => 'testuser',
            'password' => md5('111111'),
        ]);

        $response = $this->post('/api/auth/login', [
            'username' => 'testuser',
            'password' => '111111',
        ]);

        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message',
        ]);
    }

    public function test_logout_success(): void
    {
        $user = User::factory()->create([
            'username' => 'testuser',
            'email' => 'testuser@example.com',
            'password' => md5('111111'),
            'role' => 'user',
            'active_token' => $this->faker->unique()->regexify('[A-Za-z0-9]{20}'),
        ]);
        $token = $user->createToken('testuser')->plainTextToken;
        $response = $this->withHeaders([
            'Authorization' => 'Bearer '.$token,
        ])->delete('/api/auth/logout');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
    }

    public function test_logout_unauthenticated(): void
    {
        $response = $this->delete('/api/auth/logout');

        // Sanctum sẽ tự động check không có token thì trả về 401
        $response->assertStatus(401);
        $response->assertJsonStructure([
            'message',
        ]);
    }

    public function test_reset_password_success(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'email' => 'test_random_user@gmail.com',
            'active' => true,
            'activated_at' => now(),
        ]);
        $response = $this->post('/api/auth/reset_password', ['email' => $user->email]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);

        $user->refresh();

        $this->assertNotNull($user->reset_token);
        $this->assertNotNull($user->reset_sent_at);

        Mail::assertSent(resetPassword::class, function ($mail) use ($user) {
            return $mail->hasTo($user['email']);
        });
    }

    public function test_reset_password_fail_with_notfound_user(): void
    {
        Mail::fake();

        $response = $this->post('/api/auth/reset_password', ['email' => 'abcd@gmail.com']);

        $response->assertStatus(404);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
    }

    public function test_update_pass_success(): void
    {
        $user = User::factory()->create([
            'email' => 'test_random_user@gmail.com',
            'active' => true,
            'activated_at' => now(),
        ]);
        $this->post('/api/auth/reset_password', ['email' => $user->email]);

        $user->refresh();

        $response = $this->post('/api/auth/new_password', ['reset_token' => $user->reset_token, 'password' => 'new_password', 'password_confirm' => 'new_password']);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);

        $user->refresh();
        $this->assertEquals($user->password, md5('new_password'));
    }

    public function test_update_pass_fail_with_notfound_user(): void
    {
        $response = $this->post('/api/auth/new_password', ['reset_token' => 'abcasdasdasdasd', 'password' => 'new_password', 'password_confirm' => 'new_password']);

        $response->assertStatus(404);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
    }

    public function test_update_pass_fail_with_password_not_confirm(): void
    {
        $user = User::factory()->create([
            'email' => 'test_random_user@gmail.com',
            'active' => true,
            'activated_at' => now(),
        ]);
        $this->post('/api/auth/reset_password', ['email' => $user->email]);

        $user->refresh();

        $response = $this->post('/api/auth/new_password', ['reset_token' => $user->reset_token, 'password' => 'new_password', 'password_confirm' => 'new_password_123']);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
    }

    public function test_update_fail_with_token_outdated(): void
    {
        $user = User::factory()->create([
            'email' => 'test_random_user@gmail.com',
            'active' => true,
            'activated_at' => now(),
        ]);
        $this->post('/api/auth/reset_password', ['email' => $user->email]);

        $user->refresh();
        Carbon::setTestNow(now()->addMinutes(20));

        $response = $this->post('/api/auth/new_password', ['reset_token' => $user->reset_token, 'password' => 'new_password_123', 'password_confirm' => 'new_password_123']);

        $response->assertStatus(503);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
        parent::tearDown();
    }
}
