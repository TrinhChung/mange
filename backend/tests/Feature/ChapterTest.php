<?php

namespace Tests\Feature;

use App\Models\Chapter;
use App\Models\Manage;
use App\Models\Manga;
use App\Traits\TestHelper;
use Illuminate\Bus\Batch;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Storage;
use Mockery\MockInterface;
use Tests\TestCase;

class ChapterTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    use TestHelper;
    use WithFaker;

    public function test_get_info_success(): void
    {
        $chapter = Chapter::factory()->create();
        $user = $this->create_activated_user();

        $response = $this->actingAs($user)->get("/api/chapters/{$chapter->id}");
        //dd($response->json());
        $response->assertStatus(200);
        $response->assertJsonStructure(
            [
                'success',
                'data' => [
                    'id',
                    'name',
                    'updated_at',
                    'created_at',
                    'images',
                    'manga',
                ],
                'message',
            ]
        );
    }

    public function test_get_info_fail_with_not_found(): void
    {
        $id = 20000;
        $response = $this->get("/api/chapters/{$id}");
        //dd($response->json());
        $response->assertStatus(404);
    }

    public function test_get_info_fail_with_invalid_id(): void
    {
        $id = -1;
        $response = $this->get("/api/chapters/{$id}");
        //dd($response->json());
        $response->assertStatus(422);
    }

    public function test_create_chapter_success(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create();

        $response = $this->actingAs($admin)->post("/api/mangas/{$manga->id}/chapter", [
            'name' => $this->faker->name(),
            'number' => 100,
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }

    public function test_create_chapter_fail_because_duplicate_number(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create();
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 101',
            'folder' => 'name-manga/101/',
        ]);

        $response = $this->actingAs($admin)->post("/api/mangas/{$manga->id}/chapter", [
            'name' => $this->faker->name(),
            'number' => 101,
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }

    public function test_update_chapter_success(): void
    {
        $user = $this->create_activated_translator();
        $manga = Manga::factory()->create();
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
        ]);
        Manage::create([
            'user_id' => $user->id,
            'manga_id' => $manga->id,
            'role_activated' => 1,
        ]);

        $response = $this->actingAs($user)->patch("/api/chapters/{$chapter->id}", [
            'name' => $this->faker->name(),
            'number' => 100,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }

    public function test_update_chapter_fail_because_duplicate_number(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create();
        $chapter1 = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 101',
            'folder' => 'name-manga/101/',
        ]);
        $chapter2 = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 102',
            'folder' => 'name-manga/102/',
        ]);

        $response = $this->actingAs($admin)->patch("/api/chapters/{$chapter1->id}", [
            'name' => $this->faker->name(),
            'number' => 102,
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(
            [
                'success',
                'message',
                'data' => [
                    'id',
                    'name',
                    'folder',
                    'amount',
                ],
            ]
        );
    }

    public function test_update_chapter_fail_because_not_authorized(): void
    {
        $user = $this->create_activated_user();
        $chapter = Chapter::factory()->create();

        $response = $this->actingAs($user)->patch("/api/chapters/{$chapter->id}", [
            'name' => $this->faker->name(),
            'number' => 100,
        ]);

        $response->assertStatus(403);
    }

    public function test_sort_image_should_success_if_valid_input(): void
    {
        $imageCount = 5;
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
            'slug' => 'name-manga',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9001',
            'folder' => 'name-manga/9001/',
            'amount' => $imageCount,
        ]);

        Storage::fake('ftp');
        Storage::disk('ftp')->deleteDirectory('name-manga/9001');
        for ($i = 0; $i < $imageCount; $i++) {
            Storage::disk('ftp')->put("name-manga/9001/{$i}.jpg", "$i");
        }

        $order = [2, 3, -1, 0, 1];
        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}/sort", [
            'order' => $order,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);

        $chapter = Chapter::find($chapter->id);
        $this->assertEquals(4, $chapter->amount);

        // assert that images are sorted (content of the first image is 2)
        $content = Storage::disk('ftp')->get('name-manga/9001/0.jpg');
        $this->assertEquals('3', $content);
        Storage::disk('ftp')->deleteDirectory('name-manga/9001');
    }

    public function test_sort_should_fail_with_invalid_order(): void
    {
        $imageCount = 5;
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9002',
            'folder' => 'name-manga/9002/',
            'amount' => $imageCount,
        ]);
        Storage::fake('ftp');
        $order = [2, 4, -1, 0, 1];
        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}/sort", [
            'order' => $order,
        ]);
        $response->assertStatus(422);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
        Storage::disk('ftp')->deleteDirectory('name-manga/9002');
    }

    public function test_sort_should_fail_with_not_enough_order_count(): void
    {
        $imageCount = 5;
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9003',
            'folder' => 'name-manga/9003/',
            'amount' => $imageCount,
        ]);
        Storage::fake('ftp');
        $order = [2, -1, 0, 1];
        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}/sort", [
            'order' => $order,
        ]);
        $response->assertStatus(422);
        $response->assertJsonStructure([
            'success',
            'message',
        ]);
        Storage::disk('ftp')->deleteDirectory('name-manga/9003');
    }

    public function test_upload_images_should_success_with_valid_images(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
            'slug' => 'name-manga',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9004',
            'folder' => 'name-manga/9004/',
            'amount' => 0,
        ]);

        Storage::fake('ftp');
        Storage::disk('ftp')->deleteDirectory('name-manga/9002');
        $image1 = UploadedFile::fake()->image('image1.jpg');
        $image2 = UploadedFile::fake()->image('image2.jpg');

        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}", [
            'images' => [$image1, $image2],
        ]);
        $response->assertStatus(200);

        // assert that images are uploaded
        $this->assertTrue(Storage::disk('ftp')->exists('name-manga/9004/0.jpg'));
        $this->assertTrue(Storage::disk('ftp')->exists('name-manga/9004/1.jpg'));

        Storage::disk('ftp')->deleteDirectory('name-manga/9004');
    }

    public function test_upload_images_should_success_with_valid_zip(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
            'slug' => 'name-manga',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9005',
            'folder' => 'name-manga/9005/',
            'amount' => 0,
        ]);

        Storage::fake('ftp');
        Storage::disk('ftp')->deleteDirectory('name-manga/9002');
        $image1 = UploadedFile::fake()->image('image1.jpg');
        $image2 = UploadedFile::fake()->image('image2.jpg');
        $zipFilePath = storage_path('framework/testing/disks/ftp/testing.zip');
        $zip = new \ZipArchive();
        $zip->open($zipFilePath, \ZipArchive::CREATE);
        $zip->addFile($image1->getPathname(), 'image1.jpg');
        $zip->addFile($image2->getPathname(), 'image2.jpg');
        $zip->close();

        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}", [
            'zip' => new UploadedFile($zipFilePath, 'testing.zip', 'application/zip', null, true),
        ]);
        $response->assertStatus(200);

        // assert that images are uploaded
        $this->assertTrue(Storage::disk('ftp')->exists('name-manga/9005/0.jpg'));
        $this->assertTrue(Storage::disk('ftp')->exists('name-manga/9005/1.jpg'));

        Storage::disk('ftp')->deleteDirectory('name-manga/9005');
        Storage::disk('ftp')->delete('testing.zip');
    }

    public function test_upload_should_fail_if_no_files_are_given(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9005',
            'folder' => 'name-manga/9005/',
            'amount' => 0,
        ]);

        Storage::fake('ftp');
        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}");

        $response->assertStatus(422);
    }

    public function test_upload_should_response_when_server_error_occur(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9005',
            'folder' => 'name-manga/9005/',
            'amount' => 0,
        ]);

        Storage::fake('ftp');
        Bus::fake();
        Bus::shouldReceive('batch')
            ->andReturn(Bus::partialMock(Batch::class, function (MockInterface $mock) {
                $mock->shouldReceive('catch')->andReturnSelf();
            }));

        $image1 = UploadedFile::fake()->image('image1.jpg');
        $image2 = UploadedFile::fake()->image('image2.jpg');

        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}", [
            'images' => [$image1, $image2],
        ]);

        $response->assertStatus(500);
    }

    public function test_upload_file_zip_not_contain_images(): void
    {
        $admin = $this->create_admin();
        $manga = Manga::factory()->create([
            'name' => 'Name Manga',
            'thumbnail' => 'name-manga/thumbnail.jpg',
        ]);
        $chapter = Chapter::factory()->create([
            'manga_id' => $manga->id,
            'name' => 'Chapter 9006',
            'folder' => 'name-manga/9006/',
            'amount' => 0,
        ]);

        Storage::fake('ftp');
        $file1 = UploadedFile::fake()->create('file1.txt');
        $file2 = UploadedFile::fake()->create('file2.txt');
        $zipFilePath = storage_path('framework/testing/disks/ftp/testing2.zip');
        $zip = new \ZipArchive();
        $zip->open($zipFilePath, \ZipArchive::CREATE);
        $zip->addFile($file1->getPathname(), 'file1.txt');
        $zip->addFile($file2->getPathname(), 'file2.txt');
        $zip->close();

        $response = $this->actingAs($admin)->post("/api/chapters/{$chapter->id}", [
            'zip' => new UploadedFile($zipFilePath, 'testing2.zip', 'application/zip', null, true),
        ]);

        $response->assertStatus(422);

        Storage::disk('ftp')->delete('testing2.zip');
    }
}
