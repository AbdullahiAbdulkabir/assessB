<?php

namespace App\Listeners;

use App\Events\AchievementUnlocked;
use App\Events\BadgeUnlocked;
use App\Models\UserAchievement;

class HandleAchievementEvent
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
    public function handle(AchievementUnlocked $event): void
    {
        $user = $event->user;
        $achievements = $event->newAchievements;

        $achievements->each(function ($achievement) use ($user) {
            UserAchievement::updateOrCreate([
                'user_id' => $user->id,
                'achievement_id' => $achievement->id
            ]);
        });

        event(new BadgeUnlocked($user));
    }
}
