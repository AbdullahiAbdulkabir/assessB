<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use http\Client\Curl\User;

class UserController extends Controller
{
    public function achievements()
    {
        $user = User::first();

        return $this->success('Achievements', UserResource::make($user));
    }
}
