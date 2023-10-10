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
     * @param  UploadedFile  $value
     * @param  Closure(string): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $zip = new ZipArchive();
        if ($zip->open($value->path()) !== true) {
            $fail('File không phải là file zip');

            return;
        }

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $mime = mime_content_type('zip://'.$value->path().'#'.$zip->getNameIndex($i));
            if (! in_array($mime, ['image/jpeg', 'image/png'])) {
                $fail('Zip chứa file không phải là ảnh');

                return;
            }
        }
    }
}
