<?php

namespace App\Services;

use App\Http\Resources\AchievementResource;
use App\Http\Resources\UserAchievementResource;
use App\Models\Achievement;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserService
{
    public function achievements(User $user): UserAchievementResource
    {
        return UserAchievementResource::make($user);
    }

//    setting up this temporary to get all achievement from the admin side
    public function allAchievements(): AnonymousResourceCollection
    {
        return AchievementResource::collection(Achievement::all());
    }
}
