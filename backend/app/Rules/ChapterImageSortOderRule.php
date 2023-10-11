<?php

namespace App\Rules;

use App\Models\Chapter;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ChapterImageSortOderRule implements ValidationRule
{
    private int $chapter_id;

    public function __construct(int $chapter_id)
    {
        $this->chapter_id = $chapter_id;
    }

    /**
     * @param  array<int>  $value
     * @param  Closure(string): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $order = $value;

        $chapter = Chapter::findOrFail($this->chapter_id);
        if ($chapter->amount !== count($order)) {
            $fail('Số lượng ảnh không hợp lệ, chương truyện hiện tại có '.$chapter->amount.' ảnh');
        }

        // Số lượng -1 có thể nhiều hơn 1, còn lại phải unique
        $order = array_filter($order, fn ($item) => $item !== -1);
        $count = count($order);
        for ($i = 0; $i < $count; $i++) {
            if (! in_array($i, $order)) {
                $fail('Thứ tự ảnh không hợp lệ');
            }
        }
    }
}
