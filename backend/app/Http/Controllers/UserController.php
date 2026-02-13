<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function achievements(): JsonResponse
    {
        $user = User::first();

        return $this->success('Achievements retrieved', UserResource::make($user));
    }
}
