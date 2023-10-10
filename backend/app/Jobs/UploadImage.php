<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadImage implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $filePath;

    public $mangaFolder;

    public $number;

    public $imageName;

    public function __construct($filePath, $mangaFolder, $number, $imageName)
    {
        $this->filePath = $filePath;
        $this->mangaFolder = $mangaFolder;
        $this->number = $number;
        $this->imageName = $imageName;
    }

    public function handle(): void
    {
        if (! Storage::disk('ftp')->put("/{$this->mangaFolder}/{$this->number}/{$this->imageName}", file_get_contents($this->filePath))) {
            Storage::disk('ftp')->deleteDirectory("/{$this->mangaFolder}/{$this->number}/");
            throw new Exception('Tải ảnh lên server thất bại');
        }
    }
}
