<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstWhere('email', 'test@example.com');
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Test User',
                'uuid' => '95ce96b7-64f6-3c12-b330-50b081d72c11',
                'email' => 'test@example.com',
            ]);
        }

//        sample achievement each has a batch attached to it
        $achievements = [
            ['name' => "Baby Shopper", 'no_of_orders' => 5, 'badge' => "https://template.canva.com/EAGpJXD4VvY/1/5/1131w-U8uYaQbecAM.jpg"],
            ['name' => "Pro Shopper", 'no_of_orders' => 10, 'badge' => "https://www.svgrepo.com/show/452101/silver-medal.svg"],
            ['name' => "Elite Shopper", 'no_of_orders' => 20, 'badge' => "https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/achievement-award-medal-icon.png"],
        ];

        collect($achievements)->each(function ($achievement) {
            Achievement::updateorCreate(['slug' => Str::slug($achievement['name'])], [...$achievement, 'description' => $achievement['name']]);
        });

    }
}
