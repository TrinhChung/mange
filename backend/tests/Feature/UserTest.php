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
}
