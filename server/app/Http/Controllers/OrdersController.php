<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\orders;
use Illuminate\Support\Facades\Auth;

class OrdersController extends Controller
{
    function postorder(Request $req)
    {
        try {
            $user = Auth::user();
            $product_id = $req->input('product_id');
            $quantity = $req->input('quantity');

            orders::postorder(
                $user->user_id,
                $req->input('payment_amount'),
                $req->input('shipping_address'),
                $product_id,
                $quantity
            );
            return response()->json(['message' => 'Order confirmed successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getorder()
    {
        try {
            $user = Auth::user();
            return orders::getorder($user->user_id);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function allorders()
    {
        try {
            return orders::allorders();
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
