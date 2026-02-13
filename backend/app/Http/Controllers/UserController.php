<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function achievements(UserService $userService): JsonResponse
    {
        //picking the first user for test purpose only
        $user = User::first();

        $achievements = $userService->achievements($user);

        return $this->success('Achievements retrieved', $achievements);
    }
}
