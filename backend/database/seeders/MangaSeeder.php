<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Category;
use App\Models\Chapter;
use App\Models\Image;
use App\Models\Manga;
use App\Models\Othername;
use App\Models\Vote;
use Illuminate\Database\Seeder;

class MangaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public static function run(): void
    {
        $data = json_decode(file_get_contents(storage_path().'/jsonData/nettromus.json'));
        foreach ($data as $element) {
            $manga = Manga::create([
                'name' => $element->name,
                'slug' => explode('/', $element->folder)[1],
                'status' => $element->status === 'Đang tiến hành' ? 0 : 1,
                'description' => $element->describtion,
                'thumbnail' => explode('/', $element->folder)[1].'/'.'thumbnail.jpg',
            ]);

            $authors = Author::whereIn('name', $element->author)->select('id')->get();
            $categories = Category::whereIn('name', $element->categories)->select('id')->get();
            $othernames = array_map(function ($name) use ($manga) {
                return ['manga_id' => $manga['id'], 'name' => $name];
            }, $element->other_names);

            if (count($othernames) !== 0) {
                Othername::insertOrIgnore($othernames);
                //dd($othernames);
            }

            $manga->authors()->attach($authors);
            $manga->categories()->attach($categories);

            //$images = [];

            foreach (array_reverse($element->chapters) as $chapter) {
                $new_chapter = Chapter::create([
                    'name' => $chapter->name,
                    'manga_id' => $manga->id,
                    'folder' => explode('/', $element->folder)[1].'/'.$chapter->folder.'/',
                    'amount' => $chapter->amount,
                ]);

                // for($i = 0; $i < $chapter->amount; $i++) {
                //     array_push($images, ['chapter_id' => $new_chapter->id,
                //                          'link' => explode('/', $element->folder)[1].'/'.$chapter->folder.'/'.$i.'.jpg']);
                // }
            }

            // Vote
            for ($i = 1; $i <= 100; $i++) {
                Vote::create([
                    'user_id' => $i,
                    'manga_id' => $manga->id,
                    'score' => 0.5 * rand(1, 10),
                ]);
            }

            // if(count($images) !== 0) {
            //     Image::insertOrIgnore($images);
            // } else {
            //     dd('No images');
            // }
        }
    }
}
