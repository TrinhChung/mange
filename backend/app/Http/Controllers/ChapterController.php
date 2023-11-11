<?php

namespace App\Http\Controllers;

use App\Http\Resources\Chapter as ChapterResources;
use App\Jobs\UploadImage;
use App\Models\Chapter;
use App\Models\Manga;
use App\Models\View;
use App\Notifications\ChapterNotification;
use App\Rules\ChapterImageSortOderRule;
use App\Rules\ChapterZipRule;
use App\Traits\AuthTrait;
use Exception;
use File;
use Illuminate\Bus\Batch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class ChapterController extends Controller
{
    //
    use AuthTrait;

    public function show(Request $request)
    {
        $user = $this->getUser($request);

        $request->merge(['id' => $request->route('chapter_id')]);
        $fields = $this->validate($request, [
            'id' => 'required|integer|min:1',
        ]);

        $chapter = Chapter::query()
            ->with('images')
            ->with(['manga' => function ($query) {
                $query->with('chapters:manga_id,id,name');
            }])
            ->findOrFail($fields['id']);
        $chapter = new ChapterResources($chapter);
        $checkCounted = false;

        if (! Redis::exists("{$request->ip()}_{$chapter['manga']['id']}")) {
            $checkCounted = true;

            if ($user) {
                View::create([
                    'user_id' => $user->id,
                    'manga_id' => $chapter['manga']['id'],
                    'chapter_id' => $chapter['id'],
                ]);
            }
            Redis::setex($request->ip()."_{$chapter['manga']['id']}", 120, 1);
            Manga::where('id', $chapter['manga']['id'])->update(['view' => $chapter['manga']['view'] + 1]);
        }

        return response()->json([
            'success' => 1,
            'data' => $chapter,
            'is_counted' => $checkCounted,
            'message' => 'Lấy chapter thành công!',
        ], 200);
    }

    public function create(Request $request)
    {
        $request->merge(['manga_id' => $request->route('manga_id')]);
        $fields = $request->validate([
            'manga_id' => 'required|integer|min:1',
            'name' => 'string',
            'number' => 'required|integer',
        ]);

        $manga = Manga::findOrFail($fields['manga_id']);
        $this->authorize('updateManga', $manga);

        $chapter_from_number = Chapter::where('manga_id', $fields['manga_id'])
            ->where('folder', 'like', "%/{$fields['number']}/")->first();

        if ($chapter_from_number) {
            return response()->json([
                'success' => 0,
                'message' => 'Chapter này đã tồn tại',
                'data' => $chapter_from_number,
            ], 422);
        }

        $chapter = Chapter::create([
            'manga_id' => $fields['manga_id'],
            'name' => "Chapter {$fields['number']}: {$fields['name']}",
            'folder' => $manga->slug."/{$fields['number']}/",
            'amount' => 0,
        ]);

        return response()->json([
            'success' => 1,
            'data' => $chapter,
            'message' => 'Tạo chapter thành công',
        ], 201);
    }

    public function update(Request $request)
    {
        $request->merge(['chapter_id' => $request->route('chapter_id')]);
        $fields = $this->validate($request, [
            'chapter_id' => 'required|integer|min:1',
            'name' => 'string',
            'number' => 'integer',
        ]);

        $chapter = Chapter::findOrFail($fields['chapter_id']);
        $manga = $chapter->manga;
        $this->authorize('updateManga', $manga);

        // Validate number does not exist
        $chapter_from_number = $manga->chapters()->where('folder', 'like', "%/{$fields['number']}/")->first();
        if ($chapter_from_number && $chapter_from_number->id !== $chapter->id) {
            return response()->json([
                'success' => 0,
                'message' => 'Chapter number đã tồn tại trong truyện này',
                'data' => $chapter_from_number,
            ], 422);
        }

        $name = $fields['name'] ? "Chapter {$fields['number']}: {$fields['name']}" : $chapter->name;
        $chapter->update([
            'name' => $name,
            'folder' => $manga->slug."/{$fields['number']}/",
        ]);

        return response()->json([
            'success' => 1,
            'message' => 'Sửa chapter thành công',
            'data' => $chapter,
        ]);
    }

    public function uploadImages(Request $request)
    {
        $request->merge(['chapter_id' => $request->route('chapter_id')]);
        $fields = $request->validate([
            'chapter_id' => 'required|integer|min:1',
            'images' => ['array'],
            'images.*' => ['image', 'mimes:jpeg,jpg,png', 'max:10240'],
            'zip' => ['file', 'mimes:zip', 'max:51200', new ChapterZipRule], // 50MB
        ]);

        if (! $request->hasFile('images') && ! $request->hasFile('zip')) {
            return response()->json([
                'success' => 0,
                'message' => 'Không nhận được file zip hoặc ảnh',
            ], 422);
        }

        $chapter = Chapter::findOrFail($fields['chapter_id'])->load('manga');
        $manga = $chapter->manga;
        $this->authorize('updateManga', $manga);

        // Sau khi file đã upload hết lên server Laravel
        $old_amount = $chapter->amount;
        try {
            $batch = [];
            $added_amount = 0;

            if ($request->hasFile('images')) {
                $images = $request->file('images');

                // Natural Sort (8, 9, 10, 11, 12) regardless of padding.
                // Lexical Sort (1, 10, 11, 12, 2).
                $images = collect($images)->sort(function ($a, $b) {
                    return strnatcmp($a->getClientOriginalName(), $b->getClientOriginalName());
                });

                for ($i = $old_amount; $i < count($images) + $old_amount; $i++) {
                    // Không cần tmp vì SSE xong mới xóa
                    $batch[] = new UploadImage($images[$i - $old_amount]->getRealPath(), $manga->slug,
                        $chapter->getNumber(), $i.'.jpg');
                }

                $added_amount += count($images);
            } elseif ($request->hasFile('zip')) {
                $zip = new ZipArchive();
                $zip->open($request->file('zip')->getRealPath());
                $zip->extractTo(storage_path('tmp/'.$manga->slug.'/'.$chapter->getNumber().'/'));
                $file_count = $zip->numFiles;

                // Natural Sort
                $extracted_file_names = [];
                for ($i = 0; $i < $file_count; $i++) {
                    $extracted_file_names[] = $zip->getNameIndex($i);
                }
                natsort($extracted_file_names);

                for ($i = $old_amount; $i < $file_count + $old_amount; $i++) {
                    $batch[] = new UploadImage(storage_path('tmp/'.$manga->slug.'/'.$chapter->getNumber().'/'.$extracted_file_names[$i - $old_amount]),
                        $manga->slug, $chapter->getNumber(), $i.'.jpg');
                }

                $zip->close();
                $added_amount += $file_count;
            }

            $bus = Bus::batch($batch)->catch(function (Batch $batch, Exception $error) {
                return response()->json([
                    'success' => 0,
                    'message' => $error->getMessage(),
                ], 500);
            })->finally(function (Batch $batch) use ($manga, $chapter) {
                // Clean up zip temp files
                File::deleteDirectory(storage_path('tmp/'.$manga->slug.'/'.$chapter->getNumber().'/'));
            })->dispatch();

            // Server Sent Event
            return response()->stream(
                function () use ($bus, $chapter, $added_amount) {
                    while ($bus->finished() === false) {
                        $bus = $bus->fresh();
                        echo 'data: '.$bus->processedJobs().'/'.$bus->totalJobs.' '.$bus->progress()."%\n\n";
                        ob_flush();
                        flush();
                        sleep(1);
                    }

                    if (! $bus->hasFailures()) {
                        echo 'data: Thành công';
                        ob_flush();
                        flush();

                        $chapter->update([
                            'amount' => $chapter->amount + $added_amount,
                        ]);

                        $bookmarkedUsers = $chapter->manga->bookmarked_by;
                        Notification::send($bookmarkedUsers, new ChapterNotification($chapter));
                    }
                }, 200, [
                    'Content-Type' => 'text/event-stream',
                    'Cache-Control' => 'no-cache',
                    'X-Accel-Buffering' => 'no',
                ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => 0,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function sortImages(Request $request)
    {
        $request->merge(['chapter_id' => $request->route('chapter_id')]);
        $fields = $request->validate([
            'chapter_id' => 'required|integer|min:1',
            'order' => ['required', 'array', new ChapterImageSortOderRule($request->route('chapter_id'))],
            'order.*' => 'integer|min:-1',
        ]);

        $chapter = Chapter::findOrFail($fields['chapter_id'])->load('manga');
        $manga = $chapter->manga;
        $order = $fields['order'];
        $this->authorize('updateManga', $manga);

        // -1 là xóa, còn lại là vị trí mới của index ảnh hiện tại
        // [0,1,2,3,4] => [2,3,4,0,1] | [3,-1,0,2,1] | ...
        // TODO: Thêm batch nếu lag

        // Tìm index lệch số đầu tiên
        $first_wrong_index = count($order);
        for ($i = 0; $i < count($order); $i++) {
            if ($order[$i] !== $i) {
                $first_wrong_index = $i;
                break;
            }
        }

        // Chuyển tất cả các file còn lại vào tmp của folder chapter
        $chapter_path = "/{$manga->slug}/{$chapter->getNumber()}/";
        for ($i = $first_wrong_index; $i < count($order); $i++) {
            Storage::disk('ftp')->move("{$chapter_path}{$i}.jpg",
                "{$chapter_path}/tmp/{$i}.jpg");
        }

        // Chuyển lại về folder ảnh theo thứ tự mới
        for ($i = $first_wrong_index; $i < count($fields['order']); $i++) {
            if ($order[$i] !== -1) {
                Storage::disk('ftp')->move("{$chapter_path}/tmp/{$i}.jpg",
                    "{$chapter_path}{$order[$i]}.jpg");
            }
        }

        // Xóa tất cả các file còn lại trong tmp
        if ($first_wrong_index !== count($order)) {
            Storage::disk('ftp')->deleteDirectory("{$chapter_path}/tmp");
        }
        $files = Storage::disk('ftp')->files($chapter_path);

        // Update amount
        $chapter->update([
            'amount' => count($files),
        ]);

        $bookmarkedUsers = $manga->bookmarked_by;
        Notification::send($bookmarkedUsers, new ChapterNotification($chapter));

        return response()->json([
            'success' => 1,
            'message' => 'Sắp xếp ảnh thành công',
            'data' => $files,
        ]);
    }
}
