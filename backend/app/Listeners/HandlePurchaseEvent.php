<?php

namespace App\Listeners;

use App\Events\AchievementUnlocked;
use App\Events\PurchaseEvent;
use App\Models\Achievement;

class HandlePurchaseEvent
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
    public function handle(PurchaseEvent $event): void
    {
        $user = $event->user->loadCount('orders')->load('achievements');
        $orderCount = $user->orders_count;

        $eligibleAchievements = Achievement::where(
            'no_of_orders',
            '<=',
            $orderCount
        )->get();

        $alreadyUnlockedIds = $user->achievements()
            ->pluck('achievement_id');

        $newAchievements = $eligibleAchievements
            ->whereNotIn('id', $alreadyUnlockedIds);


        if ($newAchievements->isNotEmpty()) {
            event(new AchievementUnlocked($newAchievements, $user));
        }

    }
}
