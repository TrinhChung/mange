<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;
use Illuminate\Translation\PotentiallyTranslatedString;
use ZipArchive;

class ChapterZipRule implements ValidationRule
{
    /**
     * @param  string  $attribute
     * @param UploadedFile $value
     * @param Closure(string): PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $zip = new ZipArchive();
        if ($zip->open($value->path()) !== true) {
            $fail('File không phải là file zip');
            return;
        }

        for ($i = 0; $i < $zip->numFiles; $i++) {
            if (! $zip->statName("{$i}.jpg")) {
                $fail('Các file phải sắp xếp theo thứ tự 0.jpg -> n.jpg');
                return;
            }
        }
    }
}
