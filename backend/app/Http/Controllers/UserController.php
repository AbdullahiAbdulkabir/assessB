<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserAchievementResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function achievements(): JsonResponse
    {
        $user = User::first();

        return $this->success('Achievements retrieved', UserAchievementResource::make($user));
    }
}
