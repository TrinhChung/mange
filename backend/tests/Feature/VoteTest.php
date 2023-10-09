<?php

namespace Tests\Feature;

use App\Traits\TestHelper;
use Tests\TestCase;

class VoteTest extends TestCase
{
    use TestHelper;

    public function test_vote_should_fail_if_not_authenticated(): void
    {
        $response = $this->postJson('/api/mangas/1/vote', [
            'score' => 5.0,
        ]);

        $response->assertStatus(401);
    }

    public function test_vote_should_fail_if_vote_not_in_valid_range(): void
    {
        $user = $this->create_activated_user();
        $response = $this->actingAs($user)->postJson('/api/mangas/1/vote', [
            'score' => 0.0,
        ]);

        $response->assertStatus(422);
    }

    public function test_vote_should_fail_if_vote_not_multiple_of_half(): void
    {
        $user = $this->create_activated_user();
        $response = $this->actingAs($user)->postJson('/api/mangas/1/vote', [
            'score' => 3.3,
        ]);

        $response->assertStatus(422);
    }

    public function test_vote_should_fail_if_manga_id_not_exists(): void
    {
        $user = $this->create_activated_user();
        $response = $this->actingAs($user)->postJson('/api/mangas/10000/vote', [
            'score' => 3.0,
        ]);

        $response->assertStatus(422);
    }

    public function test_vote_should_success(): void
    {
        $user = $this->create_activated_user();
        $response = $this->actingAs($user)->postJson('/api/mangas/1/vote', [
            'score' => 3.0,
        ]);

        $response->assertStatus(200);
    }
}
