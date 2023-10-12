<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Chapter extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'images' => $this->amount > 0 ? array_map(function ($value) {
                return 'https://bachnguyencoder.id.vn/images/'.$this->folder.$value.'.jpg';
            }, range(0, $this->amount - 1)) : [],
            'manga' => (function () {
                $manga = $this->manga->toArray();
                $manga['thumbnail'] = 'https://bachnguyencoder.id.vn/images/'.$manga['thumbnail'];

                return $manga;
            })(),
        ];
    }
}
