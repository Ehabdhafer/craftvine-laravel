<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;


class payment extends Model
{
    protected $table = 'payments';
    protected $primaryKey = 'payment_id';
    protected $fillable = [
        'user_id',
        'order_id',
        'payment_amount',
        'payment_status',
        'payment_method',
        'cardname',
        'card_id'
    ];
    const CREATED_AT = 'payment_time';
    use HasFactory;


    protected static function postpayment(
        $user_id,
        $payment_amount,
        $cardname,
        $card_id
    ) {
        try {
            $pay = self::create([
                'user_id' => $user_id,
                'payment_amount' => $payment_amount,
                'payment_status' => 'approved',
                'payment_method' => 'visa',
                'cardname' => $cardname,
                'card_id' => $card_id
            ]);
            return $pay;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
