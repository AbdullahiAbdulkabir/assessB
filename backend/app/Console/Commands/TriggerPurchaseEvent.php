<?php

namespace App\Console\Commands;

use App\Events\PurchaseEvent;
use App\Models\Order;
use App\Models\User;
use Illuminate\Console\Command;

class TriggerPurchaseEvent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:trigger-purchase-event';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Purchae event trigger';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::first();

        Order::factory()->create([
            'user_id' => $user->id,
        ]);

        event(new PurchaseEvent($user));
    }
}
