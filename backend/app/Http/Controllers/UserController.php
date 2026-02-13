<?php

namespace App\Http\Controllers;

use App\Events\PurchaseEvent;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{

    public function achievements(User $user, UserService $userService): JsonResponse
    {
        $achievements = $userService->achievements($user);

        return $this->success('Achievements retrieved', $achievements);
    }
}
