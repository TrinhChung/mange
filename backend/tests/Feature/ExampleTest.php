<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_health_check_success(): void
    {
        $response = $this->get('/api/health_check');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'OK',
        ]);
    }
}
