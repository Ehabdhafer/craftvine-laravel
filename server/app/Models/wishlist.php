<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;

class wishlist extends Model
{
    protected $table = 'wishlist';
    protected $primaryKey = 'wishlist_id';
    protected $fillable = ['user_id', 'product_id', 'is_deleted'];
    const CREATED_AT = 'added_at';


    protected static function postfav($user_id, $product_id)
    {
        try {
            return self::create(['user_id' => $user_id, 'product_id' => $product_id]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getfav($id)
    {
        try {
            return self::where('user_id', $id)
                ->join('products', 'wishlist.product_id', 'products.product_id')
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getid($uid, $pid)
    {
        try {
            $found = self::where('user_id', $uid)
                ->where('product_id', $pid)
                ->first();
            if ($found) {
                return self::where('user_id', $uid)
                    ->where('product_id', $pid)
                    ->delete();
            }
        } catch (Exception $e) {
            throw $e;
        }
    }
}
