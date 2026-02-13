<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'uuid',
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(UserAchievement::class);
    }

    public function currentAchievement(): HasOneThrough
    {
        return $this->hasOneThrough(
            Achievement::class,
            UserAchievement::class,
            'user_id',
            'id',
            'id',
            'achievement_id'
        )->latestOfMany();
    }

    public function unlockedAchievements(): array
    {
        return Achievement::where('no_of_orders', '<=', $this->currentAchievement?->no_of_orders ?? 0)->pluck('name')->toArray() ?? [];
    }

    public function nextAvailableAchievements(): array
    {
        return Achievement::where('no_of_orders', '>=', $this->currentAchievement?->no_of_orders ?? 0)->pluck('name')->toArray() ?? [];
    }

    public function remainingToUnlockAchievementsCount(): int
    {
        $nextAchievement = $this->nextAchievement()?->no_of_orders ?? 0;

        return $nextAchievement - $this->orders()->count();
    }

    public function nextAchievement()
    {
        return Achievement::where('no_of_orders', '>', $this->orders()->count())->first();
    }
}
