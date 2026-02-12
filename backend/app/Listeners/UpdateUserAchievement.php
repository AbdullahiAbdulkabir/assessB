<?php

namespace App\Listeners;

use App\Events\PurchaseEvent;
use App\Models\User;

class UpdateUserAchievement
{
    /**
     * Create the event listener.
     */
    public function __construct(public User $user)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PurchaseEvent $event): void
    {
//        do something here and run the check to trigger an event
    }
}
