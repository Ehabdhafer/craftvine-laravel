<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\Models\cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    function getcart()
    {
        try {
            $user = Auth::user();
            return cart::getcart($user->user_id);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function postcart(Request $req)
    {
        try {
            $user = Auth::user();
            cart::postcart(
                $user->user_id,
                $req->input('product_id'),
                $req->input('quantity'),
                $req->input('price')
            );
            return response()->json(['message' => 'Added to cart Successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deletecart($id)
    {
        try {
            cart::deletecart($id);
            return response()->json(['message' => 'Product deleted Successfully from your cart'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deleteall()
    {
        try {
            $user = Auth::user();
            cart::deleteall($user->user_id);
            return response()->json(['message' => 'all cart deleted successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
