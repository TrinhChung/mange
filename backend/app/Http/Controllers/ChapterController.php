<?php

namespace App\Http\Controllers;

use App\Http\Resources\Chapter as ChapterResources;
use App\Jobs\UploadImage;
use App\Models\Chapter;
use App\Models\Manga;
use App\Models\View;
use App\Traits\AuthTrait;
use Exception;
use Illuminate\Bus\Batch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use phpseclib3\Net\SSH2;
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

        if (! Redis::exists("{$request->ip()}_{$chapter['manga']['id']}")) {
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
            'folder' => explode('/', $manga->thumbnail)[0]."/{$fields['number']}/",
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
            'folder' => explode('/', $manga->thumbnail)[0]."/{$fields['number']}/",
        ]);

        return response()->json([
            'success' => 1,
            'message' => 'Sửa chapter thành công',
            'data' => $chapter,
        ]);
    }

    public function uploadImages(Request $request)
    {
        $manga = $request->manga;
        $mangaFolder = explode('/', $manga->thumbnail)[0];
        $manga_id = $request->manga_id;
        $name = $request->name;
        $number = $request->number;

        if ($request->hasFile('images') && $request->by == 'file') {
            $images = $request->file('images');
            $batches = [];
            $count = count($images);

            for ($i = 0; $i < count($images); $i++) {
                $tmp_path = $images[$i]->getRealPath();
                move_uploaded_file($tmp_path, $tmp_path);
                $imageName = $i.'.jpg';
                $batches[] = new UploadImage($tmp_path, $mangaFolder, $number, $imageName);
            }

            $chapter = Chapter::create([
                'manga_id' => $manga_id,
                'name' => "Chapter {$number}: {$name}",
                'folder' => "{$mangaFolder}/{$number}/",
                'amount' => $count,
            ]);

            Bus::batch($batches)
                ->then(function (Batch $batch) use ($chapter) {
                    return response()->json([
                        'success' => 1,
                        'data' => $chapter,
                        'message' => 'Tạo chapter thành công',
                    ]);
                }
                )->catch(function (Batch $batch, Exception $error) use ($chapter) {
                    $chapter->delete();

                    return response()->json([
                        'success' => 0,
                        'message' => $error->getMessage(),
                    ]);
                })->finally(function (Batch $batch) {
                    print_r('done uploading');
                })->dispatch();
        } elseif ($request->hasFile('zip') && $request->by == 'zip') {
            $zip = new ZipArchive;
            $zip->open($request->zip);

            $chapter = Chapter::create([
                'manga_id' => $manga_id,
                'name' => "Chapter {$number}: {$name}",
                'folder' => "{$mangaFolder}/{$number}/",
                'amount' => $zip->numFiles,
            ]);

            if (! Storage::disk('ftp')->put("/{$mangaFolder}/{$number}/{$number}.zip", file_get_contents($request->zip))) {
                Storage::disk('ftp')->deleteDirectory("/{$mangaFolder}/{$number}/");
                $chapter->delete();

                return response()->json([
                    'success' => 0,
                    'message' => 'Không thể tải ảnh lên server',
                ], 500);
            }

            $ssh = new SSH2(env('FTP_HOST'));

            if (! $ssh->login(env('FTP_USERNAME'), env('FTP_PASSWORD'))) {
                $chapter->delete();
                Storage::disk('ftp')->deleteDirectory("/{$mangaFolder}/{$number}/");

                return response()->json([
                    'success' => 0,
                    'message' => 'Không thể tải ảnh lên server',
                ], 500);
            }

            $manga_path = env('MANGA_PATH');
            $command = "unzip ../..{$manga_path}/{$mangaFolder}/{$number}/{$number}.zip -d ../..{$manga_path}/{$mangaFolder}/{$number}";

            $ssh->exec($command);
            $zip->close();

            return response()->json([
                'success' => 1,
                'data' => $chapter,
                'message' => 'Tạo chapter thành công',
            ]);
        } else {
            return response()->json([
                'success' => 0,
                'message' => 'Không tìm thấy hình ảnh',
            ], 422);
        }
    }
}
