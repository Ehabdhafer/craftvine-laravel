<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cardcheck extends Model
{
    protected $table = 'bank_cards';
    protected $primaryKey = 'card_id';
    protected $fillable = [
        'cvc',
        'balance',
        'month',
        'year',
        'number'
    ];

    protected static function cardcheck($n, $cvc, $month, $year, $amount)
    {
        try {
            $card = self::where('number', $n)
                ->where('cvc', $cvc)
                ->where('month', $month)
                ->where('year', $year)
                ->first();

            if ($card && $card->balance > $amount) {
                $card->update(['balance' => self::raw("balance - $amount")]);
                $card->refresh();

                return ['balance' => $card->balance, 'card_id' => $card->card_id, 'message' => 'successfully'];
            } else if ($card && $card->balance < $amount) {
                return [
                    'message' => 'Your balance isn\'t enough to buy', 'balance' => $card->balance, 'card_id' => $card->card_id
                ];
            }
        } catch (Exception $e) {
            throw $e;
        }
    }
}
