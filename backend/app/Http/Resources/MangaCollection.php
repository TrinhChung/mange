<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MangaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'success' => 1,
            'message' => 'Lấy danh sách truyện thành công!',
            'links' => [],
            'meta' => [],
            'data' => $this->collection,
        ];
    }
}
