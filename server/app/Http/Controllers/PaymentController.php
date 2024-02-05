<?php

namespace App\Http\Controllers;

use App\Models\payment;
use App\Models\cardcheck;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    function postpayment(Request $req)
    {
        try {
            $check = cardcheck::cardcheck(
                $req->input('number'),
                $req->input('cvc'),
                $req->input('month'),
                $req->input('year'),
                $req->input('payment_amount')
            );
            if (!$check) {
                return response()->json(['message' => 'Invalid Card Data'], 400);
            }
            if ($check['message'] === 'Your balance isn\'t enough to buy') {
                return response()->json(['message' => 'Your balance isn\'t enough to buy'], 400);
            }

            $user = Auth::user();

            payment::postpayment(
                $user->user_id,
                $req->input('payment_amount'),
                $req->input('cardname'),
                $check['card_id']
            );
            return response()->json($check, 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
