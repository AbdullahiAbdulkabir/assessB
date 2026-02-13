<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'unlocked_achievements' => '',
            'next_available_achievements' => '',
            'current_badge' => '',
            'next_badge' => '',
            'remaining_to_unlock_next_badge' => ''
        ];
    }
}
