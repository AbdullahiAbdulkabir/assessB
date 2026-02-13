<?php

namespace App\Listeners;

use App\Events\AchievementUnlocked;
use App\Events\BadgeUnlocked;
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
        event(new AchievementUnlocked());

        event(new BadgeUnlocked());
    }
}
