<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class orders extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $primaryKey = 'order_id';
    protected $fillable = [
        'user_id', 'product_id', 'total_amount', 'shipping_address', 'status', 'is_deleted', 'quantity'
    ];


    protected static function postorder($user_id, $total_amount, $shipping_address, $product_id, $quantity)
    {
        try {
            $order = self::create([
                'status' => 'approved',
                'user_id' => $user_id,
                'total_amount' => $total_amount,
                'shipping_address' => $shipping_address,
                ['product_id' => $product_id],
                ['quantity' => $quantity]
            ]);

            return $order;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getorder($id)
    {
        try {
            return self::where('user_id', $id)->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function allorders()
    {
        try {
            return self::where('is_deleted', false)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
