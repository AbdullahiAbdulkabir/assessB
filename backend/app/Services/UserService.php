<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function achievements(User $user): array
    {
        return [
            'unlocked_achievements' => $user->unlockedAchievements(),
            'next_available_achievements' => $user->nextAvailableAchievements(),
            'current_badge' => $user->currentAchievement?->badge,
            'next_badge' => $user->nextAchievement()?->badge,
            'remaining_to_unlock_next_badge' =>  $user->nextAvailableAchievementsCount()
        ];
    }
}
