<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Exception;


class cart extends Model
{
    use HasFactory;
    protected $table = 'cart';
    protected $primaryKey = 'cart_id';
    protected $fillable = ['user_id', 'product_id', 'quantity', 'price', 'is_deleted'];


    protected static function getcart($id)
    {
        try {
            return self::where('cart.user_id', $id)
                ->join('products', 'cart.product_id', '=', 'products.product_id')
                ->select('products.*', 'cart.*')
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function postcart($user_id, $product_id, $quantity, $price)
    {
        try {
            return self::create([
                'user_id' => $user_id, 'product_id' => $product_id,
                'quantity' => $quantity, 'price' => $price
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deletecart($id)
    {
        try {
            return self::where('cart_id', $id)->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deleteall($id)
    {
        try {
            return self::where('user_id', $id)->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
