<?php

namespace App\Rules;

use App\Models\Comment;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Reaction implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $value = (int) $value;

        if (! in_array($value, [Comment::LIKE, Comment::DISLIKE, Comment::NORMAL])) {
            $fail("$attribute phải nằm trong giá trị quy định");
        }
    }
}
