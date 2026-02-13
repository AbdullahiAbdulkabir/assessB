<?php

namespace App\Listeners;

use App\Events\BadgeUnlocked;

class Cashback
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(BadgeUnlocked $event): void
    {
        $user = $event->user;

        \Log::info("Paying cashback of #300 to User ID {$event->user->id}");
    }
}
