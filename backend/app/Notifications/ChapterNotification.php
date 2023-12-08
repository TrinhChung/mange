<?php

namespace App\Notifications;

use App\Models\Chapter;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class ChapterNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $chapter;

    public function __construct(Chapter $chapter)
    {
        //
        $this->chapter = $chapter->load('manga');
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    // public function toMail(object $notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //                 ->line('The introduction to the notification.')
    //                 ->action('Notification Action', url('/'))
    //                 ->line('Thank you for using our application!');
    // }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $manga = $this->chapter->manga;

        return [
            //
            'content' => "Bộ truyện {$manga->name} đã cập nhật {$this->chapter->name}. Đến xem ngay!",
            'chapter_id' => $this->chapter->id,
            'thumbnail' => $manga->thumbnail,
            'slug' => $manga->slug,
            'time' => Carbon::now(),
        ];
    }
}
