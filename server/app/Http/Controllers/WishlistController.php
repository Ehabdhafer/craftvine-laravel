<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Models\wishlist;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    function postfav(Request $req)
    {
        try {
            $user = Auth::user();
            $found = wishlist::getid(
                $user->user_id,
                $req->input('product_id')
            );
            if (!$found) {
                wishlist::postfav(
                    $user->user_id,
                    $req->input('product_id')
                );
            }
            return response()->json(['message' => 'Added to fav successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getfav()
    {
        try {
            $user = Auth::user();
            return wishlist::getfav($user->user_id);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
