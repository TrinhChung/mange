<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait FullTextSearch
{
    /**
     * Replaces spaces with full text search wildcards
     */
    protected function fullTextWildcards(string $queryString): string
    {
        // removing symbols used by MySQL
        $reservedSymbols = ['-', '+', '<', '>', '@', '(', ')', '~'];
        $queryString = str_replace($reservedSymbols, '', $queryString);

        $words = explode(' ', $queryString);

        foreach ($words as $key => $word) {
            /*
             * applying + operator (required word) only big words
             * because smaller ones are not indexed by mysql
             */
            if (strlen($word) >= 2) {
                $words[$key] = '+'.$word.'*';
            }
        }

        return implode(' ', $words);
    }

    /**
     * Scope a query that matches a full text search of term.
     */
    public function scopeSearch(Builder $query, string $queryString): Builder
    {
        $columns = implode(',', $this->searchable);

        $query->whereRaw("MATCH ({$columns}) AGAINST (? IN BOOLEAN MODE)", $this->fullTextWildcards($queryString));

        return $query;
    }
}
