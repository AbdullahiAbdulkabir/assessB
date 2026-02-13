<?php

namespace App\Services;

use App\Http\Resources\UserAchievementResource;
use App\Models\User;

class UserService
{
    public function achievements(User $user): UserAchievementResource
    {
        return UserAchievementResource::make($user);
    }
}
