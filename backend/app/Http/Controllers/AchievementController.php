<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class AchievementController extends Controller
{

    public function achievements(User $user, UserService $userService): JsonResponse
    {
        $achievements = $userService->allAchievements();

        return $this->success('All Achievements retrieved', $achievements);
    }
}
