<?php

use App\Http\Controllers\UserController;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;


Route::prefix('users')->group(function (Router $users) {
    $users->get('{user:uuid}', [UserController::class, 'achievements']);
});
