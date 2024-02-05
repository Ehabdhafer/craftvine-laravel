<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Exception;


class products extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'product_id';
    const CREATED_AT = 'release_date';
    protected $fillable = [
        'product_name', 'category', 'price', 'rating', 'description', 'quantity',
        'discount_percentage', 'is_deleted', 'product_image'
    ];

    protected static function addproduct(
        $product_name,
        $category,
        $price,
        $rating,
        $description,
        $quantity,
        $discount_percentage,
        $imageUrl
    ) {
        try {
            return self::create([
                'product_name' => $product_name,
                'category' => $category,
                'price' => $price,
                'rating' => $rating,
                'description' => $description,
                'quantity' => $quantity,
                'discount_percentage' => $discount_percentage,
                'product_image' => $imageUrl,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getallproduct()
    {
        try {
            return self::where('is_deleted', false)->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getproductid($id)
    {
        try {
            return self::where('is_deleted', false)->find($id);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getdiscount($discount)
    {
        try {
            return self::where('is_deleted', false)
                ->where('discount_percentage', $discount)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getcategory($category)
    {
        try {
            return self::where('is_deleted', false)
                ->where('category', $category)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getbest()
    {
        try {
            return self::where('is_deleted', false)
                ->where('price', '<', 100)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deleteproduct($id)
    {
        try {
            return self::findorfail($id)
                ->update(['is_deleted' => true]);
        } catch (Exception $e) {
            throw $e;
        }
    }
}
