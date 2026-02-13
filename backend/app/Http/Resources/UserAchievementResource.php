<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserAchievementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'unlocked_achievements' => $this->unlockedAchievements(),
            'next_available_achievements' => $this->nextAvailableAchievements(),
            'current_badge' => $this->currentAchievement?->badge,
            'next_badge' => $this->nextAchievement()?->badge,
            'remaining_to_unlock_next_badge' =>  $this->remainingToUnlockAchievementsCount()
        ];
    }
}
