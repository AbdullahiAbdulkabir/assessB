<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\UserController;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;


Route::get('achievements', [AchievementController::class, 'achievements']);

Route::prefix('users')->group(function (Router $users) {
    $users->get('{user:uuid}/achievements', [UserController::class, 'achievements']);
});
