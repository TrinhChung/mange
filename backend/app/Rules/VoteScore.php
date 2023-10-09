<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class VoteScore implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = (float) $value;

        if ($value < 0.5 || $value > 5.0) {
            $fail("$attribute phải nằm trong khoảng từ 0.5 đến 5.0");
        }

        if (($value * 10) % 5 !== 0) {
            $fail("$attribute phải là bội số của 0.5");
        }
    }
}
